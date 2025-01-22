import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { AppDataSource } from '../data-source';
import { Brand } from '../entity/brand.entities';
import { Product } from '../entity/product.entities';
import { Image } from '../entity/image.entities';
import { Characteristic } from '../entity/characteristic.entities';
import { ProductCharacteristic } from '../entity/productCharacteristic.entities';

export class DataImportService {
  async importData() {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      console.info(`Starting import in development mode`);

      // Créer la table temporaire
      await queryRunner.query(`
        DROP TABLE IF EXISTS temp_import;
        CREATE TEMPORARY TABLE temp_import (
          ref VARCHAR(255),
          short_description TEXT,
          description TEXT,
          image_1_src VARCHAR(255),
          image_1_alt VARCHAR(255),
          image_2_src VARCHAR(255),
          image_2_alt VARCHAR(255),
          image_3_src VARCHAR(255),
          image_3_alt VARCHAR(255),
          price DECIMAL(10, 2),
          brand_name VARCHAR(255),
          brand_logo VARCHAR(255),
          name VARCHAR(255),
          supplier_country VARCHAR(255),
          supplier_phone TEXT,
          supplier_email VARCHAR(255),
          brand_description TEXT,
          property_1_label VARCHAR(255),
          property_1_text TEXT,
          property_2_label VARCHAR(255),
          property_2_text TEXT,
          property_3_label VARCHAR(255),
          property_3_text TEXT,
          property_4_label VARCHAR(255),
          property_4_text TEXT,
          property_5_label VARCHAR(255),
          property_5_text TEXT
        );
      `);

      const columns = await queryRunner.query(`
        SELECT column_name FROM information_schema.columns WHERE table_name = 'temp_import';
      `);
      console.info(
        'Columns in temp_import:',
        columns.map((col: { column_name: string }) => col.column_name)
      );
      // Lire et parser le fichier CSV
      const csvFilePath = path.resolve(__dirname, '../db/products.csv'); // Chemin du fichier CSV

      const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
      const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        delimiter: ',',
        trim: true
      });

      console.info(`Processing ${records.length} records from CSV`);

      const cleanValue = (value: string | number | null | undefined) =>
        value === undefined || value === null ? '' : value;
      // Insérer les données dans la table temporaire
      for (const record of records) {
        const data = [
          cleanValue(record.ref),
          cleanValue(record.short_description),
          cleanValue(record.description),
          cleanValue(record.image_1_src),
          cleanValue(record.image_1_alt),
          cleanValue(record.image_2_src),
          cleanValue(record.image_2_alt),
          cleanValue(record.image_3_src),
          cleanValue(record.image_3_alt),
          cleanValue(record.price),
          cleanValue(record.brand_name),
          cleanValue(record.brand_logo),
          cleanValue(record.name),
          cleanValue(record.supplier_country),
          cleanValue(record.supplier_phone),
          cleanValue(record.supplier_email),
          cleanValue(record.brand_description),
          cleanValue(record.property_1_label),
          cleanValue(record.property_1_text),
          cleanValue(record.property_2_label),
          cleanValue(record.property_2_text),
          cleanValue(record.property_3_label),
          cleanValue(record.property_3_text),
          cleanValue(record.property_4_label),
          cleanValue(record.property_4_text),
          cleanValue(record.property_5_label),
          cleanValue(record.property_5_text)
        ];

        await queryRunner.query(
          `
  INSERT INTO temp_import (
    ref, short_description, description, image_1_src, image_1_alt,
    image_2_src, image_2_alt, image_3_src, image_3_alt, price,
    brand_name, brand_logo, name, supplier_country, supplier_phone,
    supplier_email, brand_description, property_1_label, property_1_text,
    property_2_label, property_2_text, property_3_label, property_3_text,
    property_4_label, property_4_text, property_5_label, property_5_text
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
    $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
    $21, $22, $23, $24, $25, $26
);
  `,
          data
        );
      }

      // En développement, ne garder que 100 lignes
      await queryRunner.query(`
        DELETE FROM temp_import 
        WHERE ref NOT IN (
          SELECT ref FROM temp_import LIMIT 100
        )
      `);

      const rawData = await queryRunner.query('SELECT * FROM temp_import');
      console.info(`Processing ${rawData.length} records`);

      for (const data of rawData) {
        if (!data.brand_name || !data.ref) continue;

        // Brand
        let brand = await queryRunner.manager.findOne(Brand, {
          where: { name: data.brand_name }
        });
        if (!brand) {
          brand = queryRunner.manager.create(Brand, {
            name: data.brand_name,
            description: data.brand_description
          });
          await queryRunner.manager.save(brand);
        }

        // Product
        let product = await queryRunner.manager.findOne(Product, {
          where: { reference: data.ref }
        });
        if (!product) {
          product = queryRunner.manager.create(Product, {
            reference: data.ref,
            name: data.name,
            shortDescription: data.short_description,
            description: data.description,
            price: data.price,
            brand: brand
          });
          await queryRunner.manager.save(product);

          // Images
          if (data.image_1_src) {
            const image = queryRunner.manager.create(Image, {
              url: data.image_1_src,
              isMain: true
            });
            await queryRunner.manager.save(image);

            // Ajouter la relation ManyToMany
            product.images = [...(product.images || []), image];
            await queryRunner.manager.save(product);
          }

          // Caractéristiques
          const characteristics = [
            { label: data.property_1_label, value: data.property_1_text },
            { label: data.property_2_label, value: data.property_2_text },
            { label: data.property_3_label, value: data.property_3_text },
            { label: data.property_4_label, value: data.property_4_text },
            { label: data.property_5_label, value: data.property_5_text }
          ];

          for (const char of characteristics) {
            if (char.label && char.value) {
              let definition = await queryRunner.manager.findOne(
                Characteristic,
                { where: { name: char.label } }
              );

              if (!definition) {
                definition = queryRunner.manager.create(Characteristic, {
                  name: char.label
                });
                await queryRunner.manager.save(definition);
              }

              const productCharacteristic = queryRunner.manager.create(
                ProductCharacteristic,
                {
                  value: char.value,
                  product: product,
                  characteristic: definition
                }
              );
              await queryRunner.manager.save(productCharacteristic);
            }
          }
        }
      }

      await queryRunner.query('DROP TABLE temp_import');
      await queryRunner.commitTransaction();
      console.info('Import completed successfully');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Import failed:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
