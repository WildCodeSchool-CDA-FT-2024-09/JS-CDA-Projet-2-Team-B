import { TableNames } from '../helpers/TableNames';
import { CoreDatamapper } from './CoreDatamapper';
import { UserDatamapperReq } from './interfaces/UserDatamapperReq';
import { pool } from '../database/pg.client';

export class UserDatamapper extends CoreDatamapper<UserDatamapperReq> {
  readonly tableName = TableNames.User;
  pool = pool;

  insert = async (data: UserDatamapperReq['data']) => {
    const {
      first_name,
      last_name,
      email,
      password,
      phone,
      starting_date,
      ending_date,
      role_id
    } = data;

    const query = `INSERT INTO "${this.tableName}" ("first_name", "last_name", "email", "password", "phone", "starting_date", "ending_date", "role_id") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

    const result = await this.pool.query(query, [
      first_name,
      last_name,
      email,
      password,
      phone,
      starting_date,
      ending_date,
      role_id
    ]);

    return result.rows[0];
  };

  updatePassword = async (password: string, id: number) => {
    const query = `UPDATE "${this.tableName}" SET "password" = $1 WHERE "id" = $2 RETURNING *`;

    const result = await this.pool.query(query, [password, id]);

    return result.rows[0];
  };
}
