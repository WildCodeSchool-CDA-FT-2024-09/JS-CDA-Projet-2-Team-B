import gql from 'graphql-tag';

export const POST_PRODUCT = gql`
  mutation createNewProduct($data: ProductInput!) {
    createNewProduct(data: $data) {
      id
      reference
      name
      shortDescription
      description
      price
    }
  }
`;
