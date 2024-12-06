import { buildSchema } from 'type-graphql';
import ProductResolver from './resolvers/product.resolvers';
import CharacteristicResolver from './resolvers/characteristic.resolvers';
import CategoryResolver from './resolvers/category.resolver';
import ImageResolver from './resolvers/image.resolvers';
import TagResolver from './resolvers/tag.resolver';

const getSchema = async () => {
  return await buildSchema({
    resolvers: [
      ProductResolver,
      CharacteristicResolver,
      CategoryResolver,
      ImageResolver,
      TagResolver
    ]
  });
};

export default getSchema;
