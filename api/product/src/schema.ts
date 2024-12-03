import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import ProductResolver from '../src/resolvers/product.resolvers';

const getSchema = async () => {
  return await buildSchema({
    resolvers: [ProductResolver]
  });
};

export default getSchema;
