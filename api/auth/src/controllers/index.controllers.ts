import { RoleController } from './RoleController';
import { roleDatamapper } from '../datamappers/index.datamappers';

const roleController = new RoleController(roleDatamapper);

export { roleController };
