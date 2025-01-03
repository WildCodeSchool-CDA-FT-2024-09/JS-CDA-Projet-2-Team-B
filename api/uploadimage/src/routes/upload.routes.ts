import { Router } from 'express';
import productRouter from './product.routes';
import brandRouter from './brand.routes';

const uploadRouter = Router();

uploadRouter.use('/products', productRouter);
uploadRouter.use('/brands', brandRouter);

export { uploadRouter };
