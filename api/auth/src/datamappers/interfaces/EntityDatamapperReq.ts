import { TableNames } from '../../helpers/TableNames';
import { Pool } from 'pg';

export interface EntityDatamapperReq {
  tableName: TableNames;
  pool: Pool;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  findBySpecificField(
    field: string,
    value: string
  ): Promise<EntityDatamapperReq['data']>;
  insert(
    item: EntityDatamapperReq['data']
  ): Promise<EntityDatamapperReq['data']>;
}
