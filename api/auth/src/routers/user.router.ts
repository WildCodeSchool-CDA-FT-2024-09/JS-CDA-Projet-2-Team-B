import { Router } from 'express';
import { userController } from '../controllers/index.controllers';
import {
  checkPermissions,
  validateRequest,
  errorCatcher
} from '../middlewares/index.middlewares';
import { userChangePasswordSchema } from '../validation/index.validation';

const userRouter = Router();

userRouter.use(errorCatcher(checkPermissions(['user'])));

userRouter
  .get('/', errorCatcher(userController.getByEmail))
  .patch(
    '/change-password',
    errorCatcher(validateRequest('body', userChangePasswordSchema)),
    errorCatcher(userController.changePassword)
  );

export default userRouter;
