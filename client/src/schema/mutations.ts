import { gql } from '@apollo/client';

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
    }
  }
`;

export const CREATE_CHARACTERISTIC = gql`
  mutation CreateNewCharacteristic($characteristic: CharacteristicInput!) {
    createNewCharacteristic(characteristic: $characteristic) {
      id
      name
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

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($input: UpdateCategoryInput!) {
    updateCategory(input: $input) {
      id
      name
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: Int!) {
    deleteCategory(id: $id)
  }
`;
