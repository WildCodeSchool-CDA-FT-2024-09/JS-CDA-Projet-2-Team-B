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
      isPublished
      brand {
        id
        name
        description
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
      isPublished
      brand {
        id
        name
        description
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
    }
  }
`;

export const PUT_BRAND = gql`
  mutation UpdateBrand($data: BrandUpdateInput!) {
    updateBrand(data: $data) {
      id
      name
      description
    }
  }
`;

export const DEACTIVATE_BRAND = gql`
  mutation DeactivateBrand($deactivateBrandId: Int!) {
    deactivateBrand(id: $deactivateBrandId)
  }
`;
