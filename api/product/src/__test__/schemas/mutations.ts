import gql from 'graphql-tag';

export const POST_PRODUCT = gql`
  mutation CreateNewProduct($data: ProductInput!) {
    createNewProduct(data: $data) {
      id
      reference
      name
      shortDescription
      description
      price
      brand {
        id
        name
        description
        logo
      }
      categories {
        id
        name
      }
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
      brand {
        id
        name
        description
        logo
      }
      categories {
        id
        name
      }
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

export const PUT_BRAND = gql`
  mutation UpdateBrand($data: BrandUpdateInput!) {
    updateBrand(data: $data) {
      id
      name
      description
      logo
    }
  }
`;
