import { Router, Request, Response } from 'express';
import {
  deleteImageFile,
  deleteImageFromDatabase,
  deleteProductImageRelation,
  getImageUsageCount,
  getProductImageById,
  imageByProduct,
  saveImageToDatabase,
  verifyFileExistence
} from '../services/upload';
import multer from '../middlewares/multer';

const productRouter = Router();

productRouter.post(
  '/',
  multer.single('image'),
  async (req: Request, res: Response): Promise<void> => {
    const { product_id, isMain } = req.body;

    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const filePath = `/${req.file.filename}`;

    try {
      await verifyFileExistence(req.file.path);
      const savedImage = await saveImageToDatabase(filePath, isMain);
      await imageByProduct(savedImage.id, product_id);

      res.status(200).json({
        status: 'success',
        data: savedImage
      });
      return;
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : error);
      res.sendStatus(500);
      return;
    }
  }
);

productRouter.delete(
  '/:productId/images/:imageId',
  async (req: Request, res: Response): Promise<void> => {
    const { productId, imageId } = req.params;

    try {
      const image = await getProductImageById(parseInt(imageId));

      if (!image) {
        res.status(404).json({
          status: 'error',
          message: 'Image non trouvée'
        });
        return;
      }

      // Supprime la relation spécifique produit-image
      await deleteProductImageRelation(parseInt(imageId), productId);

      // Vérifie si l'image est encore utilisée par d'autres produits
      const usageCount = await getImageUsageCount(parseInt(imageId));

      if (usageCount === 0) {
        await deleteImageFromDatabase(parseInt(imageId));
        await deleteImageFile(image.url);

        res.status(200).json({
          status: 'success',
          message: "Image supprimée complètement car elle n'était plus utilisée"
        });
      } else {
        res.status(200).json({
          status: 'success',
          message:
            "Image dissociée du produit mais conservée car utilisée par d'autres produits"
        });
      }
      return;
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : error);
      res.status(500).json({
        status: 'error',
        message: "Erreur lors de la suppression de l'image"
      });
      return;
    }
  }
);

export default productRouter;
