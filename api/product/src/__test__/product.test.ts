import { GET_PRODUCTS, GET_PRODUCT_BY_ID } from './schemas/queries';
import { POST_PRODUCT, PUT_PRODUCT } from './schemas/mutations';
import { graphql, GraphQLSchema, print } from 'graphql';
import { AppDataSource } from '../../src/data-source';
import getSchema from '../../src/schema';
import { createBrand } from './helpers/test.helpers';
import { cookieString } from './helpers/generateCookie.helper';
import * as cookie from 'cookie';
import { Product } from '../entity/product.entities';
import { ProductUpdateInput } from '../types/product.types';

describe('Product resolvers tests', () => {
  let schema: GraphQLSchema;

  beforeAll(async () => {
    schema = await getSchema();
  });

  beforeEach(async () => {
    await AppDataSource.query('DELETE FROM products');
    await AppDataSource.query('DELETE FROM brand');
  });

  const cookieHeader = cookieString.split(';')[0];
  const contextValue = cookie.parse(cookieHeader);

  const productOne = {
    reference: 'REF0000000001',
    name: 'Test Product 01',
    shortDescription: 'A short description of the product',
    description: 'A detailed description of the test product',
    price: 123.45,
    isPublished: false
  };

  const productTwo = {
    reference: 'REF0000000002',
    name: 'Test Product 02',
    shortDescription: 'A short description of the product',
    description: 'A detailed description of the test product',
    price: 543.21,
    isPublished: false
  };

  // - - - - - - - - - -

  it('create a product and checks if the returned product matches the input product', async () => {
    const brandOne = await createBrand();

    const brandAddedToProduct = {
      ...productOne,
      brand: brandOne.id
    };

    const result = (await graphql({
      schema: schema,
      source: print(POST_PRODUCT),
      variableValues: { data: brandAddedToProduct },
      contextValue: contextValue
    })) as { data: { createNewProduct: Product } };

    expect(result.data?.createNewProduct).toMatchObject({
      reference: productOne.reference,
      name: productOne.name,
      shortDescription: productOne.shortDescription,
      description: productOne.description,
      price: productOne.price,
      isPublished: productOne.isPublished
    });
  });

  // - - - - - - - - - -

  it('creates a product and fetches all the products', async () => {
    const brandOne = await createBrand();

    const brandAddedToProductOne = {
      ...productOne,
      brand: brandOne.id
    };

    const brandAddedToProductTwo = {
      ...productTwo,
      brand: brandOne.id
    };

    (await graphql({
      schema: schema,
      source: print(POST_PRODUCT),
      variableValues: { data: brandAddedToProductOne },
      contextValue: contextValue
    })) as { data: { createNewProduct: Product } };

    (await graphql({
      schema: schema,
      source: print(POST_PRODUCT),
      variableValues: { data: brandAddedToProductTwo },
      contextValue: contextValue
    })) as { data: { createNewProduct: Product } };

    const result = (await graphql({
      schema: schema,
      source: print(GET_PRODUCTS),
      contextValue: contextValue
    })) as { data: { getAllProducts: Array<Product> } };

    expect(result.data?.getAllProducts.length).toEqual(2);
  });

  // - - - - - - - - - -

  it('creates a product and fetches it with its id', async () => {
    const brandOne = await createBrand();

    const brandAddedToProduct = {
      ...productOne,
      brand: brandOne.id
    };

    const resultOne = (await graphql({
      schema: schema,
      source: print(POST_PRODUCT),
      variableValues: { data: brandAddedToProduct },
      contextValue: contextValue
    })) as { data: { createNewProduct: Product } };

    const productId = resultOne.data?.createNewProduct.id;

    const resultTwo = (await graphql({
      schema: schema,
      source: print(GET_PRODUCT_BY_ID),
      variableValues: { getProductByIdId: productId },
      contextValue: contextValue
    })) as { data: { getProductById: Product } };

    expect(resultTwo.data?.getProductById.id).toEqual(
      resultOne.data?.createNewProduct.id
    );
  });

  it('creates and updates a product', async () => {
    const brandOne = await createBrand();

    const brandAddedToProduct = {
      ...productOne,
      brand: brandOne.id
    };

    const resultOne = (await graphql({
      schema: schema,
      source: print(POST_PRODUCT),
      variableValues: { data: brandAddedToProduct },
      contextValue: contextValue
    })) as { data: { createNewProduct: Product } };

    const productId = resultOne.data?.createNewProduct.id;

    const updateData: ProductUpdateInput = {
      id: productId,
      reference: 'REF0000000003',
      name: 'Updated product',
      shortDescription: 'Updated short description',
      description: 'Updated description',
      price: 150.0,
      brand: brandOne.id,
      isPublished: false
    };

    const resultTwo = await graphql({
      schema,
      source: print(PUT_PRODUCT),
      variableValues: { data: updateData },
      contextValue: contextValue
    });

    expect(resultTwo.data?.updateProduct).toMatchObject({
      id: productId,
      reference: 'REF0000000003',
      name: 'Updated product',
      shortDescription: 'Updated short description',
      description: 'Updated description',
      price: 150.0,
      brand: brandOne,
      isPublished: false
    });
  });
});
