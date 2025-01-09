import Router from 'express';
import { userController } from '../controllers/index.controllers';
import { errorCatcher } from '../helpers/errorCatcher.helper';

const userRouter = Router();

userRouter.route('/').post(errorCatcher(userController.create));

export default userRouter;
