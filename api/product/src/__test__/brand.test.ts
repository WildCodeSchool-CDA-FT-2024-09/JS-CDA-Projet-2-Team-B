import { graphql, GraphQLSchema, print } from 'graphql';
import { AppDataSource } from '../data-source';
import getSchema from '../schema';
import { DEACTIVATE_BRAND, POST_BRAND, PUT_BRAND } from './schemas/mutations';
import { Brand } from '../../src/entity/brand.entities';
import { createBrand } from './helpers/test.helpers';
import { GET_ALL_BRANDS } from './schemas/queries';

describe('Brand resolvers tests', () => {
  let schema: GraphQLSchema;

  beforeAll(async () => {
    schema = await getSchema();
  });

  beforeEach(async () => {
    await AppDataSource.query('DELETE FROM products');
    await AppDataSource.query('DELETE FROM brand');
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

  it('creates 2 brands and fetches all the brands', async () => {
    await createBrand();
    await createBrand();

    const result = (await graphql({
      schema: schema,
      source: print(GET_ALL_BRANDS)
    })) as { data: { getAllBrands: Array<Brand> } };

    expect(result.data.getAllBrands.length).toEqual(2);
  });

  it('creates and updates a brand', async () => {
    const createdBrand = await createBrand();

    const newData = {
      id: createdBrand.id,
      name: 'Updated name',
      description: 'Updated description',
      logo: 'Updated logo'
    };

    const updatedBrand = (await graphql({
      schema: schema,
      source: print(PUT_BRAND),
      variableValues: { data: newData }
    })) as { data: { updateBrand: Brand } };

    expect(updatedBrand.data?.updateBrand).toMatchObject(newData);
  });

  it('creates a brand and deactivates it', async () => {
    const brand = await createBrand();

    const deactivatedBrand = (await graphql({
      schema: schema,
      source: print(DEACTIVATE_BRAND),
      variableValues: { id: brand.id }
    })) as { data: { deactivateBrand: Brand } };

    expect(deactivatedBrand.data?.deactivateBrand.deletedAt).not.toBe(null);
  });
});
