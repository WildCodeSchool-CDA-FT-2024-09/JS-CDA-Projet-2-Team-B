import fs from 'fs';
import { pool } from '../database/pg.client';

export const saveImageToDatabase = async (
  url: string,
  isMain: boolean = false
) => {
  const query = `
    INSERT INTO image (url, ismain)
    VALUES ($1, $2)
    RETURNING *;
  `;

  try {
    const result = await pool.query(query, [url, isMain]);
    console.info('Image sauvegardée :', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de l'image :", error);
    throw error;
  }
};

export const verifyFileExistence = async (filePath: string) => {
  try {
    await fs.promises.access(filePath);
    console.info('Fichier trouvé :', filePath);
  } catch (error) {
    console.error('Fichier introuvable :', filePath);
    throw error;
  }
};

export const imageByProduct = async (imageId: number, productId: string) => {
  const query = `
    INSERT INTO products_images (product_id, image_id)
    VALUES ($1, $2);
  `;

  try {
    await pool.query(query, [productId, imageId]);
    console.info('Lien produit-image créé');
  } catch (error) {
    console.error('Erreur lors de la création du lien produit-image :', error);
    throw error;
  }
};
