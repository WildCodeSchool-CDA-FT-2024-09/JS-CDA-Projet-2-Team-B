import { GET_PRODUCT, GET_PRODUCT_BY_ID } from './schemas/queries';
import { POST_PRODUCT } from './schemas/mutations';
import { graphql, GraphQLSchema, print } from 'graphql';
import { AppDataSource } from '../../src/data-source';
import { Product } from 'src/entity/product.entities';
import getSchema from '../../src/schema';

describe('Product resolvers tests', () => {
  let schema: GraphQLSchema;

  beforeAll(async () => {
    schema = await getSchema();
  });

  beforeEach(async () => {
    await AppDataSource.query('TRUNCATE TABLE products RESTART IDENTITY');
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
    const result = (await graphql({
      schema: schema,
      source: print(POST_PRODUCT),
      variableValues: { data: productOne }
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
    (await graphql({
      schema: schema,
      source: print(POST_PRODUCT),
      variableValues: { data: productOne }
    })) as { data: { createNewProduct: unknown } };

    (await graphql({
      schema: schema,
      source: print(POST_PRODUCT),
      variableValues: { data: productTwo }
    })) as { data: { createNewProduct: Product } };

    const result = (await graphql({
      schema: schema,
      source: print(GET_PRODUCT)
    })) as { data: { getAllProducts: Array<Product> } };

    expect(result.data?.getAllProducts.length).toEqual(2);
  });

  // - - - - - - - - - -

  it('creates a product and fetches it with its id', async () => {
    const resultOne = (await graphql({
      schema: schema,
      source: print(POST_PRODUCT),
      variableValues: { data: productOne }
    })) as { data: { createNewProduct: { id: string } } };

    const productId = parseInt(resultOne.data?.createNewProduct.id, 10);

    const resultTwo = (await graphql({
      schema: schema,
      source: print(GET_PRODUCT_BY_ID),
      variableValues: { getProductByIdId: productId }
    })) as { data: { getProductById: { id: string } } };

    expect(resultTwo.data?.getProductById.id).toEqual(
      resultOne.data?.createNewProduct.id
    );
  });
});
import { ProductUpdateInput } from '../types/product.types';
import getSchema from '../schema';
import { graphql, GraphQLSchema, print } from 'graphql';
import gql from 'graphql-tag';

const PUT_PRODUCT = gql`
  mutation UpdateProduct($data: ProductUpdateInput!) {
    updateProduct(data: $data) {
      id
      reference
      name
      shortDescription
      description
      price
    }
  }
`;

describe('Product resolvers', () => {
  let schema: GraphQLSchema;

  beforeAll(async () => {
    schema = await getSchema();
  });

  it('updates a product', async () => {
    const updateData: ProductUpdateInput = {
      id: 1,
      reference: '123456789012345',
      name: 'Updated product',
      shortDescription: 'Updated short description',
      description: 'Updated description',
      price: 150.0
    };

    const result = await graphql({
      schema,
      source: print(PUT_PRODUCT),
      variableValues: { data: updateData }
    });

    expect(result.data?.updateProduct).toEqual(updateData);
  });
});
