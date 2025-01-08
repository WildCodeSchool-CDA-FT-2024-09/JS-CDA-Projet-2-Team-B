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

  insert = async (entityObject: T['data']) => {
    const columns = Object.keys(entityObject).join(', ');
    const values = Object.values(entityObject);
    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');

    const query = `INSERT INTO "${this.tableName}" (${columns}) VALUES (${placeholders}) RETURNING *`;
    const result = await this.pool.query(query, values);

    return result.rows[0];
  };
}
