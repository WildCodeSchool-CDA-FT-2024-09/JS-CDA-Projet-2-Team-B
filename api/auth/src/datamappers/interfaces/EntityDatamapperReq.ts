import { TableNames } from '../../helpers/TableNames';
import { Pool } from 'pg';

export interface EntityDatamapperReq {
  tableName: TableNames;
  pool: Pool;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  findByPk(id: number): Promise<EntityDatamapperReq['data']>;
  findBySpecificField(
    field: string,
    value: string
  ): Promise<EntityDatamapperReq['data']>;
  findAll(): Promise<EntityDatamapperReq['data'][]>;
}
