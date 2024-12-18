import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation CreateNewProduct($data: ProductInput!) {
    createNewProduct(data: $data) {
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
      categories {
        id
        name
      }
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
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
      brand {
        id
        name
        description
        logo
      }
      categories {
        id
        name
      }
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
export const UPDATE_CHARACTERISTIC = gql`
  mutation EditCharacteristic($characteristic: CharacteristicInput!) {
    editCharacteristic(characteristic: $characteristic) {
      id
      name
    }
  }
`;

export const CREATE_TAG = gql`
  mutation CreateTag($input: CreateTagInput!) {
    createTag(input: $input) {
      id
      name
    }
  }
`;

export const CREATE_BRAND = gql`
  mutation CreateBrand($data: BrandCreationInput!) {
    createBrand(data: $data) {
      id
      name
      description
      logo
    }
  }
`;

export const PUT_BRAND = gql`
  mutation UpdateBrand($data: BrandUpdateInput!) {
    updateBrand(data: $data) {
      id
      name
      description
      logo
    }
  }
`;

export const UPDATE_TAG = gql`
  mutation UpdateTag($input: UpdateTagInput!) {
    updateTag(input: $input) {
      id
      name
    }
  }
`;

export const DELETE_TAG = gql`
  mutation DeleteTag($id: Int!) {
    deleteTag(id: $id)
  }
`;
