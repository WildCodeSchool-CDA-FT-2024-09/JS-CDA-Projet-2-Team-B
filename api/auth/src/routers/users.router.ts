import Router from 'express';
import { userController } from '../controllers/index.controllers';
import {
  validateRequest,
  requireAuth,
  checkPermissions,
  errorCatcher
} from '../middlewares/index.middlewares';
import { userCreateSchema } from '../validation/index.validation';
import userRouter from './user.router';

const usersRouter = Router();

usersRouter.use(errorCatcher(requireAuth));

usersRouter
  .route('/')
  .get(
    errorCatcher(checkPermissions(['admin'])),
    errorCatcher(userController.getAll)
  )
  .post(
    errorCatcher(checkPermissions(['admin'])),
    errorCatcher(validateRequest('body', userCreateSchema)),
    errorCatcher(userController.create)
  );

usersRouter.use('/profile', userRouter);

export default usersRouter;
