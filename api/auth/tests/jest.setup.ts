import { beforeAll } from '@jest/globals';
import { pool } from '../src/database/pg.client';

beforeAll(async () => {
  await pool.connect();
});
