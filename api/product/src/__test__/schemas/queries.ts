import { gql } from 'graphql-tag';

export const GET_PRODUCT = gql`
  query GetAllProducts {
    getAllProducts {
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
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($getProductByIdId: Int!) {
    getProductById(id: $getProductByIdId) {
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
    }
  }
`;

export const GET_ALL_BRANDS = gql`
  query GetAllBrands($search: String) {
    getAllBrands(search: $search) {
      id
      name
      description
      logo
    }
  }
`;

export const GET_BRAND_BY_ID = gql`
  query Query($getBrandByIdId: Int!) {
    getBrandById(id: $getBrandByIdId) {
      id
      name
      description
      logo
    }
  }
`;
