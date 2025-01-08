import { RoleController } from './RoleController';
import {
  roleDatamapper,
  userDatamapper
} from '../datamappers/index.datamappers';
import { UserController } from './UserController';

const roleController = new RoleController(roleDatamapper);
const userController = new UserController(userDatamapper);

export { roleController, userController };
