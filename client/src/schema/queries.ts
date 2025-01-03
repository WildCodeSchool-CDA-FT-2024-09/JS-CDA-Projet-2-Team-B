import { gql } from '@apollo/client';

export const GET_PRODUCT = gql`
  query GetAllProducts($search: String) {
    getAllProducts(search: $search) {
      id
      name
      price
      reference
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
        deletedAt
      }
      images {
        id
        url
        isMain
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
  query getAllBrands($search: String, $includeDeleted: Boolean) {
    getAllBrands(search: $search, includeDeleted: $includeDeleted) {
      id
      name
      description
      logo
      deletedAt
    }
  }
`;

export const GET_BRAND_BY_ID = gql`
  query getBrandById($getBrandByIdId: Int!) {
    getBrandById(id: $getBrandByIdId, includeDeleted: true) {
      id
      name
      description
      logo
      deletedAt
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
