import { graphql, GraphQLSchema, print } from 'graphql';
import { AppDataSource } from '../data-source';
import getSchema from '../schema';
import { POST_BRAND } from './schemas/mutations';
import { Brand } from '../../src/entity/brand.entities';

describe('Brand resolvers tests', () => {
  let schema: GraphQLSchema;

  beforeAll(async () => {
    schema = await getSchema();
  });

  beforeEach(async () => {
    await AppDataSource.query('TRUNCATE TABLE brand RESTART IDENTITY');
  });

  const manualBrandCreation = {
    name: 'Le Brand James',
    description: 'A very tall brand',
    logo: 'logo_brand.jpg'
  };

  it('creates a brand and checks if the return matches the input object', async () => {
    const result = (await graphql({
      schema: schema,
      source: print(POST_BRAND),
      variableValues: { data: manualBrandCreation }
    })) as { data: { createBrand: Brand } };

    expect(result.data?.createBrand).toMatchObject({
      name: manualBrandCreation.name,
      description: manualBrandCreation.description,
      logo: manualBrandCreation.logo
    });
  });
});
