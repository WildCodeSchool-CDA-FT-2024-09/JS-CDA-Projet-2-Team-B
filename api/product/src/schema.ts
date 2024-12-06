import { buildSchema } from 'type-graphql';
import ProductResolver from './resolvers/product.resolvers';
import CharacteristicResolver from './resolvers/characteristic.resolvers';
import CategoryResolver from './resolvers/category.resolver';
import ImageResolver from './resolvers/image.resolvers';

const getSchema = async () => {
  return await buildSchema({
    resolvers: [
      ProductResolver,
      CharacteristicResolver,
      CategoryResolver,
      ImageResolver
    ]
  });
};

export default getSchema;
