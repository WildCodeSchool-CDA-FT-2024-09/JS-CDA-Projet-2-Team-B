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

export const PUT_PRODUCT = gql`
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

export const POST_BRAND = gql`
  mutation CreateBrand($data: BrandCreationInput!) {
    createBrand(data: $data) {
      id
      name
      description
      logo
    }
  }
`;
