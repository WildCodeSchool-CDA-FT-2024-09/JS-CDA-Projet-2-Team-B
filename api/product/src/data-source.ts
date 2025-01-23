import { DataSource } from 'typeorm';
import { Product } from './entity/product.entities';
import { Category } from './entity/category.entities';
import { Characteristic } from './entity/characteristic.entities';
import { Image } from './entity/image.entities';
import { Tag } from './entity/tag.entities';
import { Brand } from './entity/brand.entities';
import { ProductCharacteristic } from './entity/productCharacteristic.entities';

const { POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_USER, POSTGRES_HOST } =
  process.env;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: POSTGRES_HOST,
  port: 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [
    Product,
    Category,
    Characteristic,
    Image,
    Tag,
    Brand,
    ProductCharacteristic
  ],
  synchronize: false,
  migrations: ['src/migrations/*.ts']
});
