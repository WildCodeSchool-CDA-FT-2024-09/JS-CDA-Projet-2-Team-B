import fs from 'fs';
import { pool } from '../database/pg.client';
import path from 'path';

const PUBLIC_DIR = path.resolve(__dirname, '../../public');

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

    return result.rows[0];
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de l'image :", error);
    throw error;
  }
};

export const verifyFileExistence = async (filePath: string) => {
  try {
    await fs.promises.access(filePath);
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
  } catch (error) {
    console.error('Erreur lors de la création du lien produit-image :', error);
    throw error;
  }
};

export const updateBrandImage = async (imageId: number, brandId: string) => {
  const query = 'UPDATE brand SET "image_id" = $1 WHERE "id" = $2';

  try {
    await pool.query(query, [imageId, brandId]);
  } catch (error) {
    console.error(
      "Erreur lors de l'association de l'image à la marque : ",
      error
    );
    throw error;
  }
};

export const checkIfBrandHasImage = async (brandId: string) => {
  const query = 'SELECT * FROM brand WHERE "id" = $1';

  try {
    const result = await pool.query(query, [brandId]);
    return result.rows[0];
  } catch (error) {
    console.error('Erreur lors de vérification : ', error);
    throw error;
  }
};

export const getBrandImage = async (imageId: string) => {
  const query = 'SELECT * FROM image WHERE "id" = $1';

  try {
    const result = await pool.query(query, [imageId]);
    return result.rows[0];
  } catch (error) {
    console.error("Erreur lors de la recherche de l'image", error);
    throw error;
  }
};

export const updateBrandImageToNull = async (brandId: string) => {
  const brandQuery = 'UPDATE brand SET "image_id" = null WHERE "id" = $1';

  try {
    await pool.query(brandQuery, [brandId]);
  } catch (error) {
    console.error("Erreur lors de suppression de l'image : ", error);
    throw error;
  }
};

export const deleteImageFromDatabase = async (imageId: number) => {
  const imageQuery = 'DELETE FROM image WHERE "id" = $1';

  try {
    await pool.query(imageQuery, [imageId]);
  } catch (error) {
    console.error("Erreur lors de suppression de l'image : ", error);
    throw error;
  }
};

export const deleteImageFile = async (url: string) => {
  const imagePath = path.join(PUBLIC_DIR, url);

  try {
    await fs.promises.unlink(imagePath);
    return true;
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes('ENOENT')) {
      console.warn(`Image non trouvée : ${imagePath}`);
      return { error: 'Image non trouvée' };
    }
    console.error(
      "Erreur lors de la suppression de l'image : " +
        (err instanceof Error ? err.message : String(err))
    );
    return {
      error: 'Erreur lors de la suppression du fichier',
      details: err instanceof Error ? err.message : 'Erreur inconnue'
    };
  }
};

export const getBrandByImageId = async (imageId: number) => {
  const query = 'SELECT * FROM brand WHERE "image_id" = $1';

  try {
    const result = await pool.query(query, [imageId]);
    return result.rows[0];
  } catch (error) {
    console.error('Erreur lors de la recherche de la marque', error);
    throw error;
  }
};

export const getProductImageById = async (imageId: number) => {
  const query = `
    SELECT i.* 
    FROM image i
    JOIN products_images pi ON i.id = pi.image_id
    WHERE i.id = $1
  `;

  try {
    const result = await pool.query(query, [imageId]);
    return result.rows[0];
  } catch (error) {
    console.error("Erreur lors de la recherche de l'image du produit", error);
    throw error;
  }
};

export const getImageUsageCount = async (imageId: number) => {
  const query = `
    SELECT COUNT(*) as usage_count 
    FROM products_images 
    WHERE image_id = $1
  `;

  try {
    const result = await pool.query(query, [imageId]);
    return parseInt(result.rows[0].usage_count);
  } catch (error) {
    console.error(
      "Erreur lors du comptage des utilisations de l'image:",
      error
    );
    throw error;
  }
};

export const deleteProductImageRelation = async (
  imageId: number,
  productId: string
) => {
  const query =
    'DELETE FROM products_images WHERE image_id = $1 AND product_id = $2';

  try {
    await pool.query(query, [imageId, productId]);
  } catch (error) {
    console.error(
      'Erreur lors de la suppression de la relation produit-image:',
      error
    );
    throw error;
  }
};
