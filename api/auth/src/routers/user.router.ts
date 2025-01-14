import Router from 'express';
import { userController } from '../controllers/index.controllers';
import { errorCatcher } from '../helpers/errorCatcher.helper';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { userCreateSchema } from '../validation/index.validation';

const userRouter = Router();

userRouter
  .route('/')
  .get(errorCatcher(userController.getAll))
  .post(
    validateRequest('body', userCreateSchema),
    errorCatcher(userController.create)
  );

export default userRouter;
