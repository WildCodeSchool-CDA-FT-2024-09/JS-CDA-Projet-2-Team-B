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
