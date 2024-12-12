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
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query getProductById($getProductByIdId: Int!) {
    getProductById(id: $getProductByIdId) {
      id
      reference
      name
      shortDescription
      description
      price
    }
  }
`;

export const GET_ALL_BRANDS = gql`
  query GetAllBrands {
    getAllBrands {
      id
      name
      description
      logo
    }
  }
`;
