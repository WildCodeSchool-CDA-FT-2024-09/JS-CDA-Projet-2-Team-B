import express, { Router, Request, Response } from 'express';
import productRouter from './product.routes';
import brandRouter from './brand.routes';
import path from 'path';

const uploadRouter = Router();

uploadRouter.get('/:filename', (req: Request, res: Response) => {
  const imagePath = path.join(__dirname, '../../public', req.params.filename);
  res.sendFile(imagePath);
});

const publicFolderPath = path.join(__dirname, '../../public');

uploadRouter.get('/*.*', express.static(publicFolderPath, { maxAge: '1y' }));

uploadRouter.use('/products', productRouter);
uploadRouter.use('/brands', brandRouter);

export { uploadRouter };
