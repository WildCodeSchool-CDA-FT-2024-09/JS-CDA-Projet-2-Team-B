import { DataSource } from 'typeorm';
import { Product } from './entity/product.entities';
import * as dotenv from 'dotenv';
import { Image } from './entity/image.entities';

dotenv.config();
const { POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_USER, POSTGRES_HOST } =
  process.env;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: POSTGRES_HOST,
  port: 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [Product, Image],
  synchronize: true
});
