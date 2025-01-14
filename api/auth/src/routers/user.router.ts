import Router from 'express';
import { userController } from '../controllers/index.controllers';
import { errorCatcher } from '../helpers/index.helpers';
import { validateRequest, requireAuth } from '../middlewares/index.middlewares';
import { userCreateSchema } from '../validation/index.validation';

const userRouter = Router();

userRouter
  .route('/')
  .get(errorCatcher(requireAuth), errorCatcher(userController.getAll))
  .post(
    errorCatcher(validateRequest('body', userCreateSchema)),
    errorCatcher(userController.create)
  );

export default userRouter;
