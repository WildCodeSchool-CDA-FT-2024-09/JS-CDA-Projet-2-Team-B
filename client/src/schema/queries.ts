import { gql } from '@apollo/client';

export const GET_PRODUCT = gql`
  query GetAllProducts($search: String, $brands: [String!]) {
    getAllProducts(search: $search, brands: $brands) {
      id
      name
      price
      reference
      shortDescription
      description
      price
      deletedAt
      brand {
        id
        name
        description
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
  query getProductById($getProductByIdId: Int!, $includeDeleted: Boolean) {
    getProductById(id: $getProductByIdId, includeDeleted: $includeDeleted) {
      id
      reference
      name
      shortDescription
      description
      price
      isPublished
      deletedAt
      categories {
        id
        name
      }
      tags {
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
      characteristicValues {
        id
        value
        characteristic {
          id
          name
        }
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
      deletedAt
      image {
        id
        url
      }
    }
  }
`;

export const GET_BRAND_BY_ID = gql`
  query getBrandById($getBrandByIdId: Int!) {
    getBrandById(id: $getBrandByIdId, includeDeleted: true) {
      id
      name
      description
      deletedAt
      image {
        id
        url
      }
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
