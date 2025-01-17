import express from 'express';
import userRouter from './user.router';
import { userController } from '../controllers/index.controllers';
import {
  validateRequest,
  errorCatcher
} from '../middlewares/index.middlewares';
import { userSigninSchema } from '../validation/index.validation';

const indexRouter = express.Router();

indexRouter
  .route('/')
  .post(
    errorCatcher(validateRequest('body', userSigninSchema)),
    errorCatcher(userController.signin)
  );

indexRouter.use('/users', userRouter);

export default indexRouter;
