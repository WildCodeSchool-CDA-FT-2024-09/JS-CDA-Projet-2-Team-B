import { gql } from '@apollo/client';

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
  query getProductById($getProductByIdId: Float!) {
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

export const GET_CATEGORY = gql`
  query GetAllCategories {
    getAllCategories {
      id
      name
    }
  }
`;
