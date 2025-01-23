import { afterAll, beforeAll } from '@jest/globals';
import { AppDataSource } from '../src/data-source';

beforeAll(async () => {
  await AppDataSource.initialize();

  await AppDataSource.query(
    `INSERT INTO "user" ("email", "password", "last_name", "first_name", "phone", "starting_date", "ending_date", "role_id") VALUES 
    ('user@user.com', '$argon2id$v=19$m=65536,t=3,p=4$PFcMqkfp3D01NDa30mOSjw$giWJTxXDHnQ5u+7AJdje+iO9txBioPMkc+GMqSkWcW0', 'user', 'user', '123456789', '2021-01-01', '2030-12-31', 2);`
  );
});

afterAll(
  async () =>
    await AppDataSource.query(
      `DELETE FROM "user" WHERE "email" = 'user@user.com';`
    )
);
