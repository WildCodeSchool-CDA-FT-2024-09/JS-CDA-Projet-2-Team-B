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
      }
      isPublished
      categories {
        id
        name
      }
      characteristicValues {
        id
        value
        characteristic {
          id
          name
        }
      }
      deletedAt
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id)
  }
`;

export const RESTORE_PRODUCT = gql`
  mutation RestoreProduct($id: Int!) {
    restoreProduct(id: $id) {
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
      }
      isPublished
      categories {
        id
        name
      }
      deletedAt
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
      }
      isPublished
      categories {
        id
        name
      }
      tags {
        id
        name
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
    }
  }
`;

export const PUT_BRAND = gql`
  mutation UpdateBrand($data: BrandUpdateInput!) {
    updateBrand(data: $data) {
      id
      name
      description
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

export const DEACTIVATE_BRAND = gql`
  mutation DeactivateBrand($deactivateBrandId: Int!) {
    deactivateBrand(id: $deactivateBrandId)
  }
`;

export const ACTIVATE_BRAND = gql`
  mutation ActivateBrand($activateBrandId: Int!) {
    activateBrand(id: $activateBrandId)
  }
`;

export const DISABLE_CHARACTERISTIC = gql`
  mutation DisableCharactertistic($disableCharacteristicId: Int!) {
    disableCharacteristic(id: $disableCharacteristicId)
  }
`;
