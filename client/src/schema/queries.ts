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

export const GET_IMAGES = gql`
  query getAllImages($productId: Float!) {
    getAllImages {
      id
      url
      isMain
    }
  }
`;

export const ADD_IMAGE = gql`
  mutation addImage($data: ImageInput!) {
    addImage(data: $data) {
      id
      url
      isMain
    }
  }
`;
