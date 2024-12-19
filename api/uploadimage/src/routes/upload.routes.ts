import { Router, Request, Response } from 'express';

import multer from '../middlewares/multer';
import {
  saveImageToDatabase,
  verifyFileExistence,
  imageByProduct
} from '../services/upload';

const router = Router();

router.post(
  '/',
  multer.single('image'),
  async (req: Request, res: Response): Promise<void> => {
    console.info('Headers:', req.headers);
    console.info('Body:', req.body);
    console.info('Received file:', req.file);

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

export { router as uploadRoutes };
