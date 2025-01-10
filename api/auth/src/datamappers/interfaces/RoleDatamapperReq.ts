import { TableNames } from '../../helpers/TableNames';
import { EntityDatamapperReq } from './EntityDatamapperReq';

export interface RoleDatamapperReq extends EntityDatamapperReq {
  tableName: TableNames.Role;
  data: {
    id?: number;
    name: string;
  };
}
