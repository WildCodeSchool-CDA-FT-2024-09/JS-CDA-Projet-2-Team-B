import { buildSchema } from 'type-graphql';
import ProductResolver from './resolvers/product.resolvers';
import ImageResolver from './resolvers/image.resolvers';

const getSchema = async () => {
  return await buildSchema({
    resolvers: [ProductResolver, ImageResolver]
  });
};

export default getSchema;
