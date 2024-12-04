import { DataSource } from 'typeorm';
import { Product } from './entity/product.entities';
import { Brand } from './entity/brand.entities';
import { Image } from './entity/image.entities';
import { Category } from './entity/category.entities';
import { Tag } from './entity/tag.entities';
import { CharacteristicDefinition } from './entity/characteristicDefinition.entities';
import { ProductCharacteristic } from './entity/productCharacteristic.entities';
import { Contact } from './entity/contact.entities';
import { Action } from './entity/action.entities';
import { Exchange } from './entity/exchange.entities';
import { History } from './entity/history.entities';
import { User } from './entity/user.entities';
import * as dotenv from 'dotenv';

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
  synchronize: true,
  // logging: true,
  entities: [
    Brand,
    Product,
    Image,
    Category,
    Tag,
    CharacteristicDefinition,
    ProductCharacteristic,
    Contact,
    Action,
    Exchange,
    History,
    User
  ]
});
