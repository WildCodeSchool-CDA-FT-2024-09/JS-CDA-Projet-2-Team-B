import { gql } from '@apollo/client';

export const GET_PRODUCT = gql`
  query GetAllProducts($search: String) {
    getAllProducts(search: $search) {
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
      isPublished
      categories {
        id
        name
      }
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
      isPublished
      categories {
        id
        name
      }
      brand {
        id
        name
      }
    }
  }
`;

export const GET_IMAGES = gql`
  query getAllImages {
    getAllImages {
      id
      url
      isMain
    }
  }
`;

export const GET_CHARACTERISTIC = gql`
  query GetAllCharacteristic {
    getAllCharacteristic {
      id
      name
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

export const GET_ALL_TAGS = gql`
  query GetAllTags {
    getAllTags {
      id
      name
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
  query GetBrandById($getBrandByIdId: Int!) {
    getBrandById(id: $getBrandByIdId) {
      id
      name
      description
      logo
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    getAllCategories {
      id
      name
    }
  }
`;
