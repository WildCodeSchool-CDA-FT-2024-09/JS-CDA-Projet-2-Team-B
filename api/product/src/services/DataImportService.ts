import { AppDataSource } from '../data-source';
import { Brand } from '../entity/brand.entities';
import { Product } from '../entity/product.entities';
import { Image } from '../entity/image.entities';
import { Contact } from '../entity/contact.entities';
import { CharacteristicDefinition } from '../entity/characteristicDefinition.entities';
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
        )
      `);

      // Copier toutes les données
      await queryRunner.query(`
        COPY temp_import FROM '/docker-entrypoint-initdb.d/products.csv' 
        WITH (FORMAT csv, HEADER true)
      `);

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
        let brand = await Brand.findOne({ where: { name: data.brand_name } });
        if (!brand) {
          brand = await Brand.create({
            name: data.brand_name,
            logo: data.brand_logo,
            description: data.brand_description
          }).save();
        }

        // Product
        let product = await Product.findOne({ where: { reference: data.ref } });
        if (!product) {
          product = await Product.create({
            reference: data.ref,
            name: data.name,
            shortDescription: data.short_description,
            description: data.description,
            price: data.price,
            brand: brand
          }).save();

          // Images
          if (data.image_1_src) {
            await Image.create({
              url: data.image_1_src,
              altText: data.image_1_alt || `Image for ${data.name}`,
              isPrimary: true,
              product: product
            }).save();
          }

          // Contact
          if (
            data.supplier_email ||
            data.supplier_phone ||
            data.supplier_country
          ) {
            await Contact.create({
              email: data.supplier_email,
              phone: data.supplier_phone,
              country: data.supplier_country,
              brand: brand,
              product: product
            }).save();
          }

          // Caractéristiques
          if (data.property_1_label && data.property_1_text) {
            let definition = await CharacteristicDefinition.findOne({
              where: { name: data.property_1_label }
            });

            if (!definition) {
              definition = await CharacteristicDefinition.create({
                name: data.property_1_label
              }).save();
            }

            await ProductCharacteristic.create({
              value: data.property_1_text,
              product: product,
              definition: definition
            }).save();
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
