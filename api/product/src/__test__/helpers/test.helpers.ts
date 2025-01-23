import { graphql, GraphQLSchema, print } from 'graphql';
import getSchema from '../../schema';
import { Brand } from '../../entity/brand.entities';
import { generateRandomString } from './generateRandomString.helper';
import { POST_BRAND } from '../schemas/mutations';
import { UserCookie } from './generateCookie.helper';
import * as cookie from 'cookie';

export const createBrand = async (): Promise<Brand> => {
  const schema: GraphQLSchema = await getSchema();

  const newBrandData = {
    name: generateRandomString(10),
    description: generateRandomString(10)
  };

  const UserCookieHeader = UserCookie.split(';')[0];
  const UserContextValue = cookie.parse(UserCookieHeader);

  const result = (await graphql({
    schema: schema,
    source: print(POST_BRAND),
    variableValues: { data: newBrandData },
    contextValue: UserContextValue
  })) as { data: { createBrand: Brand } };

  return result.data.createBrand;
};
