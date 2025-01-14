import express from 'express';
import userRouter from './user.router';
import { errorCatcher } from '../helpers/index.helpers';
import { userController } from '../controllers/index.controllers';
import { validateRequest } from '../middlewares/index.middlewares';
import { userSigninSchema } from '../validation/index.validation';

const indexRouter = express.Router();

indexRouter
  .route('/')
  .post(
    validateRequest('body', userSigninSchema),
    errorCatcher(userController.signin)
  );

indexRouter.use('/users', userRouter);

export default indexRouter;
