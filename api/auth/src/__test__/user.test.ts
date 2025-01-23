import { pool } from '../database/pg.client';
import request from 'supertest';
import app from '../app';
import { UserCookie } from './helpers/test.helpers';
import Token from '../helpers/Token';

describe('User tests', () => {
  beforeEach(async () => {
    await pool.query(
      `INSERT INTO "user" ("email", "password", "last_name", "first_name", "phone", "starting_date", "ending_date", "role_id") VALUES 
      ('user@user.com', '$argon2id$v=19$m=65536,t=3,p=4$PFcMqkfp3D01NDa30mOSjw$giWJTxXDHnQ5u+7AJdje+iO9txBioPMkc+GMqSkWcW0', 'user', 'user', '123456789', '2021-01-01', '2030-12-31', 2);`
    );
  });

  afterEach(async () => {
    await pool.query(`DELETE FROM "user" WHERE "email" = 'user@user.com';`);
  });

  // --------------------

  it('returns a 403 when trying to get users list (admin protected route) with a user role', async () => {
    await request(app)
      .get('/auth/users')
      .set('Cookie', UserCookie)
      .send()
      .expect(403);
  });

  // --------------------

  it('returns a string when generating an access token', async () => {
    const userPayload = {
      email: 'user@user.com',
      role: 'user'
    };

    const accessToken = await Token.generateAccessToken(userPayload);

    expect(typeof accessToken).toBe('string');
  });

  // --------------------
});
