import Router from 'express';
import userRouter from './user.router';

const apiRouter = Router();

apiRouter.use('/users', userRouter);

export default apiRouter;
