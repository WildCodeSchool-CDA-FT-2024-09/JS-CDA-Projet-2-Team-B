import { graphql, GraphQLSchema, print } from 'graphql';
import getSchema from '../../schema';
import { Brand } from '../../entity/brand.entities';
import { generateRandomString } from './generateRandomString.helper';
import { POST_BRAND } from '../schemas/mutations';

export const createBrand = async (): Promise<Brand> => {
  const schema: GraphQLSchema = await getSchema();

  const newBrandData = {
    name: generateRandomString(10),
    description: generateRandomString(10),
    logo: generateRandomString(10)
  };

  const result = (await graphql({
    schema: schema,
    source: print(POST_BRAND),
    variableValues: { data: newBrandData }
  })) as { data: { createBrand: Brand } };

  return result.data.createBrand;
};
