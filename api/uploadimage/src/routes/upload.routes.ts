import { Router, Request, Response } from 'express';
import multer from '../middlewares/multer';
import { saveImageToDatabase, verifyFileExistence } from '../services/upload';

const router = Router();

router.get('/', (_: Request, res: Response) => {
  res.send('Hello World');
});

router.post(
  '/',
  multer.single('image'),
  async (req: Request, res: Response): Promise<void> => {
    console.info('Headers:', req.headers);
    console.info('Body:', req.body);
    console.info('Received file:', req.file);

    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const filePath = `http://localhost:3000/uploads/${req.file.filename}`;

    try {
      await verifyFileExistence(req.file.path);
      const savedImage = await saveImageToDatabase(filePath);

      res.status(200).json({
        status: 'success',
        data: savedImage
      });
      return;
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
  }
);

export { router as uploadRoutes };
