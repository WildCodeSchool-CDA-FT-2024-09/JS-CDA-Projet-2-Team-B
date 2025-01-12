import { EntityDatamapperReq } from './interfaces/EntityDatamapperReq';

export abstract class CoreDatamapper<T extends EntityDatamapperReq> {
  abstract tableName: T['tableName'];
  abstract pool: T['pool'];

  findByPk = async (id: number) => {
    const result = await this.pool.query(
      `SELECT * FROM "${this.tableName}" WHERE "id" = $1`,
      [id]
    );
    return result.rows[0];
  };

  findBySpecificField = async (field: string, value: string) => {
    const result = await this.pool.query(
      `SELECT * FROM "${this.tableName}" WHERE ${field} = $1`,
      [value]
    );
    return result.rows[0];
  };

  findAll = async () => {
    const result = await this.pool.query(`SELECT * FROM "${this.tableName}";`);
    return result.rows;
  };
}
