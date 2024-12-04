import { buildSchema } from 'type-graphql';
import ProductResolver from './resolvers/product.resolvers';
import CharacteristicResolver from './resolvers/characteristic.resolvers';

const getSchema = async () => {
  return await buildSchema({
    resolvers: [ProductResolver, CharacteristicResolver]
  });
};

export default getSchema;
