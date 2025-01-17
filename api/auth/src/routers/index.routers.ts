import express from 'express';
import usersRouter from './users.router';
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

indexRouter.use('/users', usersRouter);

export default indexRouter;
