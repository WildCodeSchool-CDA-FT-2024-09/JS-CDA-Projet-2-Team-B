import Router from 'express';
import { userController } from '../controllers/index.controllers';
import { errorCatcher } from '../helpers/index.helpers';
import {
  validateRequest,
  requireAuth,
  checkPermissions
} from '../middlewares/index.middlewares';
import { userCreateSchema } from '../validation/index.validation';

const userRouter = Router();

userRouter.use(errorCatcher(requireAuth));
userRouter.use(errorCatcher(checkPermissions(['admin'])));

userRouter
  .route('/')
  .get(errorCatcher(userController.getAll))
  .post(
    errorCatcher(validateRequest('body', userCreateSchema)),
    errorCatcher(userController.create)
  );

export default userRouter;
