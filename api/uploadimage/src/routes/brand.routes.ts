import { Router, Request, Response } from 'express';
import {
  checkIfBrandHasImage,
  deleteImageFile,
  deleteImageFromDatabase,
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
    async (req: Request, res: Response): Promise<void> => {
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
          await deleteImageFromDatabase(brandImage.image_id);
          await deleteImageFile(image.url);
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
  .delete('/', async (req: Request, res: Response): Promise<void> => {
    const { image_id } = req.body;

    try {
      const brand = await getBrandByImageId(image_id);

      if (brand) {
        const image = await getBrandImage(brand.image_id);
        await updateBrandImageToNull(brand.id);
        await deleteImageFromDatabase(brand.image_id);
        await deleteImageFile(image.url);
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
