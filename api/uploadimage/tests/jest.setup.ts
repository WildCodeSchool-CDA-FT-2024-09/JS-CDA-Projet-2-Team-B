import { beforeAll, afterAll } from '@jest/globals';

import { pool } from '../src/database/pg.client';

beforeAll(async () => await pool.connect());

afterAll(async () => await pool.end());
