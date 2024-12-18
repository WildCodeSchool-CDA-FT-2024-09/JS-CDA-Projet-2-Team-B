import { GET_PRODUCT, GET_PRODUCT_BY_ID } from './schemas/queries';
import { POST_PRODUCT, PUT_PRODUCT } from './schemas/mutations';
import { graphql, GraphQLSchema, print } from 'graphql';
import { AppDataSource } from '../../src/data-source';
import { Product } from 'src/entity/product.entities';
import getSchema from '../../src/schema';
import { ProductUpdateInput } from 'src/types/product.types';
import { createBrand } from './helpers/test.helpers';

describe('Product resolvers tests', () => {
  let schema: GraphQLSchema;

  beforeAll(async () => {
    schema = await getSchema();
  });

  beforeEach(async () => {
    await AppDataSource.query('DELETE FROM products');
    await AppDataSource.query('DELETE FROM brand');
  });

  const productOne = {
    reference: 'REF001',
    name: 'Test Product 1',
    shortDescription: 'A short description of the product',
    description: 'A detailed description of the test product',
    price: 123.45
  };

  const productTwo = {
    reference: 'REF002',
    name: 'Test Product 2',
    shortDescription: 'A short description of the product',
    description: 'A detailed description of the test product',
    price: 543.21
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
      variableValues: { data: brandAddedToProduct }
    })) as { data: { createNewProduct: Product } };

    expect(result.data?.createNewProduct).toMatchObject({
      reference: productOne.reference,
      name: productOne.name,
      shortDescription: productOne.shortDescription,
      description: productOne.description,
      price: productOne.price
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
      variableValues: { data: brandAddedToProductOne }
    })) as { data: { createNewProduct: unknown } };

    (await graphql({
      schema: schema,
      source: print(POST_PRODUCT),
      variableValues: { data: brandAddedToProductTwo }
    })) as { data: { createNewProduct: Product } };

    const result = (await graphql({
      schema: schema,
      source: print(GET_PRODUCT)
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
      variableValues: { data: brandAddedToProduct }
    })) as { data: { createNewProduct: Product } };

    const productId = resultOne.data?.createNewProduct.id;

    const resultTwo = (await graphql({
      schema: schema,
      source: print(GET_PRODUCT_BY_ID),
      variableValues: { getProductByIdId: productId }
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
      variableValues: { data: brandAddedToProduct }
    })) as { data: { createNewProduct: Product } };

    const productId = resultOne.data?.createNewProduct.id;

    const updateData: ProductUpdateInput = {
      id: productId,
      reference: '123456789012345',
      name: 'Updated product',
      shortDescription: 'Updated short description',
      description: 'Updated description',
      price: 150.0,
      brand: brandOne.id
    };

    const resultTwo = await graphql({
      schema,
      source: print(PUT_PRODUCT),
      variableValues: { data: updateData }
    });

    expect(resultTwo.data?.updateProduct).toMatchObject({
      id: productId,
      reference: '123456789012345',
      name: 'Updated product',
      shortDescription: 'Updated short description',
      description: 'Updated description',
      price: 150.0,
      brand: brandOne
    });
  });
});
