import { buildSchema } from 'type-graphql';
import ProductResolver from './resolvers/product.resolvers';
import CharacteristicResolver from './resolvers/characteristic.resolvers';
import CategoryResolver from './resolvers/category.resolvers';
import ImageResolver from './resolvers/image.resolvers';
import TagResolver from './resolvers/tag.resolvers';
import BrandResolver from './resolvers/brand.resolvers';

const getSchema = async () => {
  return await buildSchema({
    resolvers: [
      ProductResolver,
      CharacteristicResolver,
      CategoryResolver,
      ImageResolver,
      TagResolver,
      BrandResolver
    ],
    validate: true
  });
};

export default getSchema;
