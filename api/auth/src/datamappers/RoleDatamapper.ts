import { TableNames } from '../helpers/TableNames';
import { CoreDatamapper } from './CoreDatamapper';
import { RoleDatamapperReq } from './interfaces/RoleDatamapperReq';
import { pool } from '../database/pg.client';

export class RoleDatamapper extends CoreDatamapper<RoleDatamapperReq> {
  readonly tableName = TableNames.Role;
  pool = pool;
}
