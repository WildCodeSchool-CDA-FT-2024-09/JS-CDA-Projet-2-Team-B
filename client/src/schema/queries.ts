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
