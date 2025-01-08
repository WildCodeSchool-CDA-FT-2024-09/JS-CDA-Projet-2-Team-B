import { Router, Request, Response } from 'express';
import {
  checkIfBrandHasImage,
  deleteBrandImageFile,
  deleteBrandImageFromDatabase,
  getBrandByImageId,
  getBrandImage,
  saveImageToDatabase,
  updateBrandImage,
  updateBrandImageToNull,
  verifyFileExistence
} from '../services/upload';
import multer from '../middlewares/multer';

const brandRouter = Router();

brandRouter
  .patch(
    '/',
    multer.single('image'),
    // Review Validation de données en middleware (req.body)
    async (req: Request, res: Response): Promise<void> => {
      console.info('Headers:', req.headers);
      console.info('Body:', req.body);
      console.info('Received file:', req.file);

      const { brand_id } = req.body;

      const isMain = true;

      if (!req.file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
      }

      const filePath = `/${req.file.filename}`;

      try {
        const brandImage = await checkIfBrandHasImage(brand_id);

        if (brandImage.image_id) {
          const image = await getBrandImage(brandImage.image_id);
          await updateBrandImageToNull(brand_id);
          await deleteBrandImageFromDatabase(brandImage.image_id);
          await deleteBrandImageFile(image.url);
        }

        await verifyFileExistence(req.file.path);
        const savedImage = await saveImageToDatabase(filePath, isMain);
        await updateBrandImage(savedImage.id, brand_id);

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
  )
  // Review Validation de données en middleware (req.body)
  .delete('/', async (req: Request, res: Response): Promise<void> => {
    const { image_id } = req.body;

    try {
      const brand = await getBrandByImageId(image_id);

      if (brand) {
        const image = await getBrandImage(brand.image_id);
        await updateBrandImageToNull(brand.id);
        await deleteBrandImageFromDatabase(brand.image_id);
        await deleteBrandImageFile(image.url);
      }

      res.status(200).json({
        status: 'success'
      });
      return;
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : error);
      res.sendStatus(500);
      return;
    }
  });

export default brandRouter;
// Review Renommer en product.controllers.ts
