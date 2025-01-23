import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: undefined; output: undefined };
  DateTimeISO: { input: undefined; output: undefined };
};

export type Brand = {
  __typename?: 'Brand';
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  image?: Maybe<Image>;
  name: Scalars['String']['output'];
  products?: Maybe<Array<Product>>;
};

export type BrandCreationInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type BrandUpdateInput = {
  deletedAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Category = {
  __typename?: 'Category';
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  products?: Maybe<Array<Product>>;
};

export type Characteristic = {
  __typename?: 'Characteristic';
  deletedDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  products?: Maybe<Array<Product>>;
};

export type CharacteristicInput = {
  id?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
};

export type CharacteristicValueInput = {
  characteristicId: Scalars['Int']['input'];
  value: Scalars['String']['input'];
};

export type CharacteristicValueUpdateInput = {
  characteristicId: Scalars['Int']['input'];
  productCharacteristicId?: InputMaybe<Scalars['Int']['input']>;
  value: Scalars['String']['input'];
};

export type CreateCategoryInput = {
  name: Scalars['String']['input'];
};

export type CreateTagInput = {
  name: Scalars['String']['input'];
};

export type Image = {
  __typename?: 'Image';
  brand?: Maybe<Brand>;
  id: Scalars['Float']['output'];
  isMain: Scalars['Boolean']['output'];
  products: Array<Product>;
  url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  activateBrand: Scalars['Boolean']['output'];
  createBrand: Brand;
  createCategory: Category;
  createNewCharacteristic: Characteristic;
  createNewProduct: Product;
  createTag: Tag;
  deactivateBrand: Scalars['Boolean']['output'];
  deleteCategory: Scalars['Boolean']['output'];
  deleteProduct: Scalars['Boolean']['output'];
  deleteTag: Scalars['Boolean']['output'];
  disableCharacteristic: Scalars['Boolean']['output'];
  editCharacteristic: Characteristic;
  enableCharacteristic: Scalars['Boolean']['output'];
  restoreCategory: Scalars['Boolean']['output'];
  restoreProduct: Product;
  restoreTag: Scalars['Boolean']['output'];
  updateBrand: Brand;
  updateCategory: Category;
  updateProduct: Product;
  updateTag: Tag;
};

export type MutationActivateBrandArgs = {
  id: Scalars['Int']['input'];
};

export type MutationCreateBrandArgs = {
  data: BrandCreationInput;
};

export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};

export type MutationCreateNewCharacteristicArgs = {
  characteristic: CharacteristicInput;
};

export type MutationCreateNewProductArgs = {
  data: ProductInput;
};

export type MutationCreateTagArgs = {
  input: CreateTagInput;
};

export type MutationDeactivateBrandArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteCategoryArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteProductArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteTagArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDisableCharacteristicArgs = {
  id: Scalars['Int']['input'];
};

export type MutationEditCharacteristicArgs = {
  characteristic: CharacteristicInput;
};

export type MutationEnableCharacteristicArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRestoreCategoryArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRestoreProductArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRestoreTagArgs = {
  id: Scalars['Int']['input'];
};

export type MutationUpdateBrandArgs = {
  data: BrandUpdateInput;
};

export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};

export type MutationUpdateProductArgs = {
  data: ProductUpdateInput;
};

export type MutationUpdateTagArgs = {
  input: UpdateTagInput;
};

export type Product = {
  __typename?: 'Product';
  brand?: Maybe<Brand>;
  categories?: Maybe<Array<Category>>;
  characteristicValues?: Maybe<Array<ProductCharacteristic>>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  images: Array<Image>;
  isPublished: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  price?: Maybe<Scalars['Float']['output']>;
  reference: Scalars['String']['output'];
  shortDescription?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Tag>>;
};

export type ProductCharacteristic = {
  __typename?: 'ProductCharacteristic';
  characteristic: Characteristic;
  id: Scalars['Float']['output'];
  product: Product;
  value: Scalars['String']['output'];
};

export type ProductInput = {
  brand?: InputMaybe<Scalars['Float']['input']>;
  categoryIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  characteristicValues?: InputMaybe<Array<CharacteristicValueInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  price?: InputMaybe<Scalars['Float']['input']>;
  reference: Scalars['String']['input'];
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  tagIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type ProductUpdateInput = {
  brand?: InputMaybe<Scalars['Float']['input']>;
  categoryIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  characteristicValues?: InputMaybe<Array<CharacteristicValueUpdateInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  price?: InputMaybe<Scalars['Float']['input']>;
  reference: Scalars['String']['input'];
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  tagIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Query = {
  __typename?: 'Query';
  getAllBrands: Array<Brand>;
  getAllCategories: Array<Category>;
  getAllCharacteristic: Array<Characteristic>;
  getAllImages: Array<Image>;
  getAllProducts: Array<Product>;
  getAllTags: Array<Tag>;
  getBrandById?: Maybe<Brand>;
  getProductById?: Maybe<Product>;
};

export type QueryGetAllBrandsArgs = {
  includeDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetAllCategoriesArgs = {
  includeDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryGetAllCharacteristicArgs = {
  isDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryGetAllProductsArgs = {
  brands?: InputMaybe<Array<Scalars['String']['input']>>;
  includeDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetAllTagsArgs = {
  includeDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryGetBrandByIdArgs = {
  id: Scalars['Int']['input'];
  includeDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryGetProductByIdArgs = {
  id: Scalars['Int']['input'];
  includeDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Tag = {
  __typename?: 'Tag';
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type UpdateCategoryInput = {
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};

export type UpdateTagInput = {
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};

export type CreateNewProductMutationVariables = Exact<{
  data: ProductInput;
}>;

export type CreateNewProductMutation = {
  __typename?: 'Mutation';
  createNewProduct: {
    __typename?: 'Product';
    id: number;
    reference: string;
    name: string;
    shortDescription?: string | null;
    description?: string | null;
    price?: number | null;
    isPublished: boolean;
    deletedAt?: undefined | null;
    brand?: {
      __typename?: 'Brand';
      id: number;
      name: string;
      description: string;
    } | null;
    categories?: Array<{
      __typename?: 'Category';
      id: number;
      name: string;
    }> | null;
    characteristicValues?: Array<{
      __typename?: 'ProductCharacteristic';
      id: number;
      value: string;
      characteristic: {
        __typename?: 'Characteristic';
        id: number;
        name: string;
      };
    }> | null;
  };
};

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type DeleteProductMutation = {
  __typename?: 'Mutation';
  deleteProduct: boolean;
};

export type RestoreProductMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type RestoreProductMutation = {
  __typename?: 'Mutation';
  restoreProduct: {
    __typename?: 'Product';
    id: number;
    reference: string;
    name: string;
    shortDescription?: string | null;
    description?: string | null;
    price?: number | null;
    isPublished: boolean;
    deletedAt?: undefined | null;
    brand?: {
      __typename?: 'Brand';
      id: number;
      name: string;
      description: string;
    } | null;
    categories?: Array<{
      __typename?: 'Category';
      id: number;
      name: string;
    }> | null;
  };
};

export type CreateCategoryMutationVariables = Exact<{
  input: CreateCategoryInput;
}>;

export type CreateCategoryMutation = {
  __typename?: 'Mutation';
  createCategory: { __typename?: 'Category'; id: number; name: string };
};

export type UpdateProductMutationVariables = Exact<{
  data: ProductUpdateInput;
}>;

export type UpdateProductMutation = {
  __typename?: 'Mutation';
  updateProduct: {
    __typename?: 'Product';
    id: number;
    reference: string;
    name: string;
    shortDescription?: string | null;
    description?: string | null;
    price?: number | null;
    isPublished: boolean;
    brand?: {
      __typename?: 'Brand';
      id: number;
      name: string;
      description: string;
    } | null;
    categories?: Array<{
      __typename?: 'Category';
      id: number;
      name: string;
    }> | null;
    tags?: Array<{ __typename?: 'Tag'; id: number; name: string }> | null;
    characteristicValues?: Array<{
      __typename?: 'ProductCharacteristic';
      id: number;
      value: string;
      characteristic: {
        __typename?: 'Characteristic';
        id: number;
        name: string;
      };
    }> | null;
  };
};

export type CreateNewCharacteristicMutationVariables = Exact<{
  characteristic: CharacteristicInput;
}>;

export type CreateNewCharacteristicMutation = {
  __typename?: 'Mutation';
  createNewCharacteristic: {
    __typename?: 'Characteristic';
    id: number;
    name: string;
  };
};

export type UpdateCategoryMutationVariables = Exact<{
  input: UpdateCategoryInput;
}>;

export type UpdateCategoryMutation = {
  __typename?: 'Mutation';
  updateCategory: { __typename?: 'Category'; id: number; name: string };
};

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type DeleteCategoryMutation = {
  __typename?: 'Mutation';
  deleteCategory: boolean;
};

export type EditCharacteristicMutationVariables = Exact<{
  characteristic: CharacteristicInput;
}>;

export type EditCharacteristicMutation = {
  __typename?: 'Mutation';
  editCharacteristic: {
    __typename?: 'Characteristic';
    id: number;
    name: string;
  };
};

export type CreateTagMutationVariables = Exact<{
  input: CreateTagInput;
}>;

export type CreateTagMutation = {
  __typename?: 'Mutation';
  createTag: { __typename?: 'Tag'; id: number; name: string };
};

export type CreateBrandMutationVariables = Exact<{
  data: BrandCreationInput;
}>;

export type CreateBrandMutation = {
  __typename?: 'Mutation';
  createBrand: {
    __typename?: 'Brand';
    id: number;
    name: string;
    description: string;
  };
};

export type UpdateBrandMutationVariables = Exact<{
  data: BrandUpdateInput;
}>;

export type UpdateBrandMutation = {
  __typename?: 'Mutation';
  updateBrand: {
    __typename?: 'Brand';
    id: number;
    name: string;
    description: string;
  };
};

export type UpdateTagMutationVariables = Exact<{
  input: UpdateTagInput;
}>;

export type UpdateTagMutation = {
  __typename?: 'Mutation';
  updateTag: { __typename?: 'Tag'; id: number; name: string };
};

export type DeleteTagMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type DeleteTagMutation = { __typename?: 'Mutation'; deleteTag: boolean };

export type DeactivateBrandMutationVariables = Exact<{
  deactivateBrandId: Scalars['Int']['input'];
}>;

export type DeactivateBrandMutation = {
  __typename?: 'Mutation';
  deactivateBrand: boolean;
};

export type ActivateBrandMutationVariables = Exact<{
  activateBrandId: Scalars['Int']['input'];
}>;

export type ActivateBrandMutation = {
  __typename?: 'Mutation';
  activateBrand: boolean;
};

export type DisableCharactertisticMutationVariables = Exact<{
  disableCharacteristicId: Scalars['Int']['input'];
}>;

export type DisableCharactertisticMutation = {
  __typename?: 'Mutation';
  disableCharacteristic: boolean;
};

export type GetAllProductsQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  brands?: InputMaybe<
    Array<Scalars['String']['input']> | Scalars['String']['input']
  >;
}>;

export type GetAllProductsQuery = {
  __typename?: 'Query';
  getAllProducts: Array<{
    __typename?: 'Product';
    id: number;
    name: string;
    price?: number | null;
    reference: string;
    shortDescription?: string | null;
    description?: string | null;
    deletedAt?: undefined | null;
    isPublished: boolean;
    brand?: {
      __typename?: 'Brand';
      id: number;
      name: string;
      description: string;
    } | null;
    categories?: Array<{
      __typename?: 'Category';
      id: number;
      name: string;
    }> | null;
  }>;
};

export type GetProductByIdQueryVariables = Exact<{
  getProductByIdId: Scalars['Int']['input'];
  includeDeleted?: InputMaybe<Scalars['Boolean']['input']>;
}>;

export type GetProductByIdQuery = {
  __typename?: 'Query';
  getProductById?: {
    __typename?: 'Product';
    id: number;
    reference: string;
    name: string;
    shortDescription?: string | null;
    description?: string | null;
    price?: number | null;
    isPublished: boolean;
    deletedAt?: undefined | null;
    categories?: Array<{
      __typename?: 'Category';
      id: number;
      name: string;
    }> | null;
    tags?: Array<{ __typename?: 'Tag'; id: number; name: string }> | null;
    brand?: {
      __typename?: 'Brand';
      id: number;
      name: string;
      deletedAt?: undefined | null;
    } | null;
    images: Array<{
      __typename?: 'Image';
      id: number;
      url: string;
      isMain: boolean;
    }>;
    characteristicValues?: Array<{
      __typename?: 'ProductCharacteristic';
      id: number;
      value: string;
      characteristic: {
        __typename?: 'Characteristic';
        id: number;
        name: string;
      };
    }> | null;
  } | null;
};

export type GetAllImagesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllImagesQuery = {
  __typename?: 'Query';
  getAllImages: Array<{
    __typename?: 'Image';
    id: number;
    url: string;
    isMain: boolean;
  }>;
};

export type GetAllCharacteristicQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetAllCharacteristicQuery = {
  __typename?: 'Query';
  getAllCharacteristic: Array<{
    __typename?: 'Characteristic';
    id: number;
    name: string;
  }>;
};

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllCategoriesQuery = {
  __typename?: 'Query';
  getAllCategories: Array<{
    __typename?: 'Category';
    id: number;
    name: string;
  }>;
};

export type GetAllTagsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllTagsQuery = {
  __typename?: 'Query';
  getAllTags: Array<{ __typename?: 'Tag'; id: number; name: string }>;
};

export type GetAllBrandsQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  includeDeleted?: InputMaybe<Scalars['Boolean']['input']>;
}>;

export type GetAllBrandsQuery = {
  __typename?: 'Query';
  getAllBrands: Array<{
    __typename?: 'Brand';
    id: number;
    name: string;
    description: string;
    deletedAt?: undefined | null;
    image?: { __typename?: 'Image'; id: number; url: string } | null;
  }>;
};

export type GetBrandByIdQueryVariables = Exact<{
  getBrandByIdId: Scalars['Int']['input'];
}>;

export type GetBrandByIdQuery = {
  __typename?: 'Query';
  getBrandById?: {
    __typename?: 'Brand';
    id: number;
    name: string;
    description: string;
    deletedAt?: undefined | null;
    image?: { __typename?: 'Image'; id: number; url: string } | null;
  } | null;
};

export const CreateNewProductDocument = gql`
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
export type CreateNewProductMutationFn = Apollo.MutationFunction<
  CreateNewProductMutation,
  CreateNewProductMutationVariables
>;

/**
 * __useCreateNewProductMutation__
 *
 * To run a mutation, you first call `useCreateNewProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewProductMutation, { data, loading, error }] = useCreateNewProductMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateNewProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateNewProductMutation,
    CreateNewProductMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateNewProductMutation,
    CreateNewProductMutationVariables
  >(CreateNewProductDocument, options);
}
export type CreateNewProductMutationHookResult = ReturnType<
  typeof useCreateNewProductMutation
>;
export type CreateNewProductMutationResult =
  Apollo.MutationResult<CreateNewProductMutation>;
export type CreateNewProductMutationOptions = Apollo.BaseMutationOptions<
  CreateNewProductMutation,
  CreateNewProductMutationVariables
>;
export const DeleteProductDocument = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id)
  }
`;
export type DeleteProductMutationFn = Apollo.MutationFunction<
  DeleteProductMutation,
  DeleteProductMutationVariables
>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteProductMutation,
    DeleteProductMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteProductMutation,
    DeleteProductMutationVariables
  >(DeleteProductDocument, options);
}
export type DeleteProductMutationHookResult = ReturnType<
  typeof useDeleteProductMutation
>;
export type DeleteProductMutationResult =
  Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<
  DeleteProductMutation,
  DeleteProductMutationVariables
>;
export const RestoreProductDocument = gql`
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
export type RestoreProductMutationFn = Apollo.MutationFunction<
  RestoreProductMutation,
  RestoreProductMutationVariables
>;

/**
 * __useRestoreProductMutation__
 *
 * To run a mutation, you first call `useRestoreProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreProductMutation, { data, loading, error }] = useRestoreProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRestoreProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RestoreProductMutation,
    RestoreProductMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RestoreProductMutation,
    RestoreProductMutationVariables
  >(RestoreProductDocument, options);
}
export type RestoreProductMutationHookResult = ReturnType<
  typeof useRestoreProductMutation
>;
export type RestoreProductMutationResult =
  Apollo.MutationResult<RestoreProductMutation>;
export type RestoreProductMutationOptions = Apollo.BaseMutationOptions<
  RestoreProductMutation,
  RestoreProductMutationVariables
>;
export const CreateCategoryDocument = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
    }
  }
`;
export type CreateCategoryMutationFn = Apollo.MutationFunction<
  CreateCategoryMutation,
  CreateCategoryMutationVariables
>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >(CreateCategoryDocument, options);
}
export type CreateCategoryMutationHookResult = ReturnType<
  typeof useCreateCategoryMutation
>;
export type CreateCategoryMutationResult =
  Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<
  CreateCategoryMutation,
  CreateCategoryMutationVariables
>;
export const UpdateProductDocument = gql`
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
export type UpdateProductMutationFn = Apollo.MutationFunction<
  UpdateProductMutation,
  UpdateProductMutationVariables
>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >(UpdateProductDocument, options);
}
export type UpdateProductMutationHookResult = ReturnType<
  typeof useUpdateProductMutation
>;
export type UpdateProductMutationResult =
  Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<
  UpdateProductMutation,
  UpdateProductMutationVariables
>;
export const CreateNewCharacteristicDocument = gql`
  mutation CreateNewCharacteristic($characteristic: CharacteristicInput!) {
    createNewCharacteristic(characteristic: $characteristic) {
      id
      name
    }
  }
`;
export type CreateNewCharacteristicMutationFn = Apollo.MutationFunction<
  CreateNewCharacteristicMutation,
  CreateNewCharacteristicMutationVariables
>;

/**
 * __useCreateNewCharacteristicMutation__
 *
 * To run a mutation, you first call `useCreateNewCharacteristicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewCharacteristicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewCharacteristicMutation, { data, loading, error }] = useCreateNewCharacteristicMutation({
 *   variables: {
 *      characteristic: // value for 'characteristic'
 *   },
 * });
 */
export function useCreateNewCharacteristicMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateNewCharacteristicMutation,
    CreateNewCharacteristicMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateNewCharacteristicMutation,
    CreateNewCharacteristicMutationVariables
  >(CreateNewCharacteristicDocument, options);
}
export type CreateNewCharacteristicMutationHookResult = ReturnType<
  typeof useCreateNewCharacteristicMutation
>;
export type CreateNewCharacteristicMutationResult =
  Apollo.MutationResult<CreateNewCharacteristicMutation>;
export type CreateNewCharacteristicMutationOptions = Apollo.BaseMutationOptions<
  CreateNewCharacteristicMutation,
  CreateNewCharacteristicMutationVariables
>;
export const UpdateCategoryDocument = gql`
  mutation UpdateCategory($input: UpdateCategoryInput!) {
    updateCategory(input: $input) {
      id
      name
    }
  }
`;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables
>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables
  >(UpdateCategoryDocument, options);
}
export type UpdateCategoryMutationHookResult = ReturnType<
  typeof useUpdateCategoryMutation
>;
export type UpdateCategoryMutationResult =
  Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables
>;
export const DeleteCategoryDocument = gql`
  mutation DeleteCategory($id: Int!) {
    deleteCategory(id: $id)
  }
`;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables
>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCategoryMutation,
    DeleteCategoryMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteCategoryMutation,
    DeleteCategoryMutationVariables
  >(DeleteCategoryDocument, options);
}
export type DeleteCategoryMutationHookResult = ReturnType<
  typeof useDeleteCategoryMutation
>;
export type DeleteCategoryMutationResult =
  Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables
>;
export const EditCharacteristicDocument = gql`
  mutation EditCharacteristic($characteristic: CharacteristicInput!) {
    editCharacteristic(characteristic: $characteristic) {
      id
      name
    }
  }
`;
export type EditCharacteristicMutationFn = Apollo.MutationFunction<
  EditCharacteristicMutation,
  EditCharacteristicMutationVariables
>;

/**
 * __useEditCharacteristicMutation__
 *
 * To run a mutation, you first call `useEditCharacteristicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCharacteristicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCharacteristicMutation, { data, loading, error }] = useEditCharacteristicMutation({
 *   variables: {
 *      characteristic: // value for 'characteristic'
 *   },
 * });
 */
export function useEditCharacteristicMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditCharacteristicMutation,
    EditCharacteristicMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    EditCharacteristicMutation,
    EditCharacteristicMutationVariables
  >(EditCharacteristicDocument, options);
}
export type EditCharacteristicMutationHookResult = ReturnType<
  typeof useEditCharacteristicMutation
>;
export type EditCharacteristicMutationResult =
  Apollo.MutationResult<EditCharacteristicMutation>;
export type EditCharacteristicMutationOptions = Apollo.BaseMutationOptions<
  EditCharacteristicMutation,
  EditCharacteristicMutationVariables
>;
export const CreateTagDocument = gql`
  mutation CreateTag($input: CreateTagInput!) {
    createTag(input: $input) {
      id
      name
    }
  }
`;
export type CreateTagMutationFn = Apollo.MutationFunction<
  CreateTagMutation,
  CreateTagMutationVariables
>;

/**
 * __useCreateTagMutation__
 *
 * To run a mutation, you first call `useCreateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTagMutation, { data, loading, error }] = useCreateTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTagMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTagMutation,
    CreateTagMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateTagMutation, CreateTagMutationVariables>(
    CreateTagDocument,
    options
  );
}
export type CreateTagMutationHookResult = ReturnType<
  typeof useCreateTagMutation
>;
export type CreateTagMutationResult = Apollo.MutationResult<CreateTagMutation>;
export type CreateTagMutationOptions = Apollo.BaseMutationOptions<
  CreateTagMutation,
  CreateTagMutationVariables
>;
export const CreateBrandDocument = gql`
  mutation CreateBrand($data: BrandCreationInput!) {
    createBrand(data: $data) {
      id
      name
      description
    }
  }
`;
export type CreateBrandMutationFn = Apollo.MutationFunction<
  CreateBrandMutation,
  CreateBrandMutationVariables
>;

/**
 * __useCreateBrandMutation__
 *
 * To run a mutation, you first call `useCreateBrandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBrandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBrandMutation, { data, loading, error }] = useCreateBrandMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateBrandMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateBrandMutation,
    CreateBrandMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateBrandMutation, CreateBrandMutationVariables>(
    CreateBrandDocument,
    options
  );
}
export type CreateBrandMutationHookResult = ReturnType<
  typeof useCreateBrandMutation
>;
export type CreateBrandMutationResult =
  Apollo.MutationResult<CreateBrandMutation>;
export type CreateBrandMutationOptions = Apollo.BaseMutationOptions<
  CreateBrandMutation,
  CreateBrandMutationVariables
>;
export const UpdateBrandDocument = gql`
  mutation UpdateBrand($data: BrandUpdateInput!) {
    updateBrand(data: $data) {
      id
      name
      description
    }
  }
`;
export type UpdateBrandMutationFn = Apollo.MutationFunction<
  UpdateBrandMutation,
  UpdateBrandMutationVariables
>;

/**
 * __useUpdateBrandMutation__
 *
 * To run a mutation, you first call `useUpdateBrandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBrandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBrandMutation, { data, loading, error }] = useUpdateBrandMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateBrandMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateBrandMutation,
    UpdateBrandMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateBrandMutation, UpdateBrandMutationVariables>(
    UpdateBrandDocument,
    options
  );
}
export type UpdateBrandMutationHookResult = ReturnType<
  typeof useUpdateBrandMutation
>;
export type UpdateBrandMutationResult =
  Apollo.MutationResult<UpdateBrandMutation>;
export type UpdateBrandMutationOptions = Apollo.BaseMutationOptions<
  UpdateBrandMutation,
  UpdateBrandMutationVariables
>;
export const UpdateTagDocument = gql`
  mutation UpdateTag($input: UpdateTagInput!) {
    updateTag(input: $input) {
      id
      name
    }
  }
`;
export type UpdateTagMutationFn = Apollo.MutationFunction<
  UpdateTagMutation,
  UpdateTagMutationVariables
>;

/**
 * __useUpdateTagMutation__
 *
 * To run a mutation, you first call `useUpdateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTagMutation, { data, loading, error }] = useUpdateTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTagMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateTagMutation,
    UpdateTagMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateTagMutation, UpdateTagMutationVariables>(
    UpdateTagDocument,
    options
  );
}
export type UpdateTagMutationHookResult = ReturnType<
  typeof useUpdateTagMutation
>;
export type UpdateTagMutationResult = Apollo.MutationResult<UpdateTagMutation>;
export type UpdateTagMutationOptions = Apollo.BaseMutationOptions<
  UpdateTagMutation,
  UpdateTagMutationVariables
>;
export const DeleteTagDocument = gql`
  mutation DeleteTag($id: Int!) {
    deleteTag(id: $id)
  }
`;
export type DeleteTagMutationFn = Apollo.MutationFunction<
  DeleteTagMutation,
  DeleteTagMutationVariables
>;

/**
 * __useDeleteTagMutation__
 *
 * To run a mutation, you first call `useDeleteTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTagMutation, { data, loading, error }] = useDeleteTagMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTagMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteTagMutation,
    DeleteTagMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteTagMutation, DeleteTagMutationVariables>(
    DeleteTagDocument,
    options
  );
}
export type DeleteTagMutationHookResult = ReturnType<
  typeof useDeleteTagMutation
>;
export type DeleteTagMutationResult = Apollo.MutationResult<DeleteTagMutation>;
export type DeleteTagMutationOptions = Apollo.BaseMutationOptions<
  DeleteTagMutation,
  DeleteTagMutationVariables
>;
export const DeactivateBrandDocument = gql`
  mutation DeactivateBrand($deactivateBrandId: Int!) {
    deactivateBrand(id: $deactivateBrandId)
  }
`;
export type DeactivateBrandMutationFn = Apollo.MutationFunction<
  DeactivateBrandMutation,
  DeactivateBrandMutationVariables
>;

/**
 * __useDeactivateBrandMutation__
 *
 * To run a mutation, you first call `useDeactivateBrandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeactivateBrandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deactivateBrandMutation, { data, loading, error }] = useDeactivateBrandMutation({
 *   variables: {
 *      deactivateBrandId: // value for 'deactivateBrandId'
 *   },
 * });
 */
export function useDeactivateBrandMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeactivateBrandMutation,
    DeactivateBrandMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeactivateBrandMutation,
    DeactivateBrandMutationVariables
  >(DeactivateBrandDocument, options);
}
export type DeactivateBrandMutationHookResult = ReturnType<
  typeof useDeactivateBrandMutation
>;
export type DeactivateBrandMutationResult =
  Apollo.MutationResult<DeactivateBrandMutation>;
export type DeactivateBrandMutationOptions = Apollo.BaseMutationOptions<
  DeactivateBrandMutation,
  DeactivateBrandMutationVariables
>;
export const ActivateBrandDocument = gql`
  mutation ActivateBrand($activateBrandId: Int!) {
    activateBrand(id: $activateBrandId)
  }
`;
export type ActivateBrandMutationFn = Apollo.MutationFunction<
  ActivateBrandMutation,
  ActivateBrandMutationVariables
>;

/**
 * __useActivateBrandMutation__
 *
 * To run a mutation, you first call `useActivateBrandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateBrandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateBrandMutation, { data, loading, error }] = useActivateBrandMutation({
 *   variables: {
 *      activateBrandId: // value for 'activateBrandId'
 *   },
 * });
 */
export function useActivateBrandMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ActivateBrandMutation,
    ActivateBrandMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ActivateBrandMutation,
    ActivateBrandMutationVariables
  >(ActivateBrandDocument, options);
}
export type ActivateBrandMutationHookResult = ReturnType<
  typeof useActivateBrandMutation
>;
export type ActivateBrandMutationResult =
  Apollo.MutationResult<ActivateBrandMutation>;
export type ActivateBrandMutationOptions = Apollo.BaseMutationOptions<
  ActivateBrandMutation,
  ActivateBrandMutationVariables
>;
export const DisableCharactertisticDocument = gql`
  mutation DisableCharactertistic($disableCharacteristicId: Int!) {
    disableCharacteristic(id: $disableCharacteristicId)
  }
`;
export type DisableCharactertisticMutationFn = Apollo.MutationFunction<
  DisableCharactertisticMutation,
  DisableCharactertisticMutationVariables
>;

/**
 * __useDisableCharactertisticMutation__
 *
 * To run a mutation, you first call `useDisableCharactertisticMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisableCharactertisticMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disableCharactertisticMutation, { data, loading, error }] = useDisableCharactertisticMutation({
 *   variables: {
 *      disableCharacteristicId: // value for 'disableCharacteristicId'
 *   },
 * });
 */
export function useDisableCharactertisticMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DisableCharactertisticMutation,
    DisableCharactertisticMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DisableCharactertisticMutation,
    DisableCharactertisticMutationVariables
  >(DisableCharactertisticDocument, options);
}
export type DisableCharactertisticMutationHookResult = ReturnType<
  typeof useDisableCharactertisticMutation
>;
export type DisableCharactertisticMutationResult =
  Apollo.MutationResult<DisableCharactertisticMutation>;
export type DisableCharactertisticMutationOptions = Apollo.BaseMutationOptions<
  DisableCharactertisticMutation,
  DisableCharactertisticMutationVariables
>;
export const GetAllProductsDocument = gql`
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

/**
 * __useGetAllProductsQuery__
 *
 * To run a query within a React component, call `useGetAllProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProductsQuery({
 *   variables: {
 *      search: // value for 'search'
 *      brands: // value for 'brands'
 *   },
 * });
 */
export function useGetAllProductsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllProductsQuery,
    GetAllProductsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(
    GetAllProductsDocument,
    options
  );
}
export function useGetAllProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllProductsQuery,
    GetAllProductsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(
    GetAllProductsDocument,
    options
  );
}
export function useGetAllProductsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetAllProductsQuery,
        GetAllProductsQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetAllProductsQuery,
    GetAllProductsQueryVariables
  >(GetAllProductsDocument, options);
}
export type GetAllProductsQueryHookResult = ReturnType<
  typeof useGetAllProductsQuery
>;
export type GetAllProductsLazyQueryHookResult = ReturnType<
  typeof useGetAllProductsLazyQuery
>;
export type GetAllProductsSuspenseQueryHookResult = ReturnType<
  typeof useGetAllProductsSuspenseQuery
>;
export type GetAllProductsQueryResult = Apollo.QueryResult<
  GetAllProductsQuery,
  GetAllProductsQueryVariables
>;
export const GetProductByIdDocument = gql`
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

/**
 * __useGetProductByIdQuery__
 *
 * To run a query within a React component, call `useGetProductByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductByIdQuery({
 *   variables: {
 *      getProductByIdId: // value for 'getProductByIdId'
 *      includeDeleted: // value for 'includeDeleted'
 *   },
 * });
 */
export function useGetProductByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetProductByIdQuery,
    GetProductByIdQueryVariables
  > &
    (
      | { variables: GetProductByIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(
    GetProductByIdDocument,
    options
  );
}
export function useGetProductByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetProductByIdQuery,
    GetProductByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(
    GetProductByIdDocument,
    options
  );
}
export function useGetProductByIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetProductByIdQuery,
        GetProductByIdQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetProductByIdQuery,
    GetProductByIdQueryVariables
  >(GetProductByIdDocument, options);
}
export type GetProductByIdQueryHookResult = ReturnType<
  typeof useGetProductByIdQuery
>;
export type GetProductByIdLazyQueryHookResult = ReturnType<
  typeof useGetProductByIdLazyQuery
>;
export type GetProductByIdSuspenseQueryHookResult = ReturnType<
  typeof useGetProductByIdSuspenseQuery
>;
export type GetProductByIdQueryResult = Apollo.QueryResult<
  GetProductByIdQuery,
  GetProductByIdQueryVariables
>;
export const GetAllImagesDocument = gql`
  query getAllImages {
    getAllImages {
      id
      url
      isMain
    }
  }
`;

/**
 * __useGetAllImagesQuery__
 *
 * To run a query within a React component, call `useGetAllImagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllImagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllImagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllImagesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllImagesQuery,
    GetAllImagesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllImagesQuery, GetAllImagesQueryVariables>(
    GetAllImagesDocument,
    options
  );
}
export function useGetAllImagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllImagesQuery,
    GetAllImagesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllImagesQuery, GetAllImagesQueryVariables>(
    GetAllImagesDocument,
    options
  );
}
export function useGetAllImagesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetAllImagesQuery,
        GetAllImagesQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetAllImagesQuery, GetAllImagesQueryVariables>(
    GetAllImagesDocument,
    options
  );
}
export type GetAllImagesQueryHookResult = ReturnType<
  typeof useGetAllImagesQuery
>;
export type GetAllImagesLazyQueryHookResult = ReturnType<
  typeof useGetAllImagesLazyQuery
>;
export type GetAllImagesSuspenseQueryHookResult = ReturnType<
  typeof useGetAllImagesSuspenseQuery
>;
export type GetAllImagesQueryResult = Apollo.QueryResult<
  GetAllImagesQuery,
  GetAllImagesQueryVariables
>;
export const GetAllCharacteristicDocument = gql`
  query GetAllCharacteristic {
    getAllCharacteristic {
      id
      name
    }
  }
`;

/**
 * __useGetAllCharacteristicQuery__
 *
 * To run a query within a React component, call `useGetAllCharacteristicQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCharacteristicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCharacteristicQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCharacteristicQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllCharacteristicQuery,
    GetAllCharacteristicQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetAllCharacteristicQuery,
    GetAllCharacteristicQueryVariables
  >(GetAllCharacteristicDocument, options);
}
export function useGetAllCharacteristicLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllCharacteristicQuery,
    GetAllCharacteristicQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAllCharacteristicQuery,
    GetAllCharacteristicQueryVariables
  >(GetAllCharacteristicDocument, options);
}
export function useGetAllCharacteristicSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetAllCharacteristicQuery,
        GetAllCharacteristicQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetAllCharacteristicQuery,
    GetAllCharacteristicQueryVariables
  >(GetAllCharacteristicDocument, options);
}
export type GetAllCharacteristicQueryHookResult = ReturnType<
  typeof useGetAllCharacteristicQuery
>;
export type GetAllCharacteristicLazyQueryHookResult = ReturnType<
  typeof useGetAllCharacteristicLazyQuery
>;
export type GetAllCharacteristicSuspenseQueryHookResult = ReturnType<
  typeof useGetAllCharacteristicSuspenseQuery
>;
export type GetAllCharacteristicQueryResult = Apollo.QueryResult<
  GetAllCharacteristicQuery,
  GetAllCharacteristicQueryVariables
>;
export const GetAllCategoriesDocument = gql`
  query GetAllCategories {
    getAllCategories {
      id
      name
    }
  }
`;

/**
 * __useGetAllCategoriesQuery__
 *
 * To run a query within a React component, call `useGetAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(
    GetAllCategoriesDocument,
    options
  );
}
export function useGetAllCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
  >(GetAllCategoriesDocument, options);
}
export function useGetAllCategoriesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetAllCategoriesQuery,
        GetAllCategoriesQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
  >(GetAllCategoriesDocument, options);
}
export type GetAllCategoriesQueryHookResult = ReturnType<
  typeof useGetAllCategoriesQuery
>;
export type GetAllCategoriesLazyQueryHookResult = ReturnType<
  typeof useGetAllCategoriesLazyQuery
>;
export type GetAllCategoriesSuspenseQueryHookResult = ReturnType<
  typeof useGetAllCategoriesSuspenseQuery
>;
export type GetAllCategoriesQueryResult = Apollo.QueryResult<
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables
>;
export const GetAllTagsDocument = gql`
  query GetAllTags {
    getAllTags {
      id
      name
    }
  }
`;

/**
 * __useGetAllTagsQuery__
 *
 * To run a query within a React component, call `useGetAllTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTagsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllTagsQuery,
    GetAllTagsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllTagsQuery, GetAllTagsQueryVariables>(
    GetAllTagsDocument,
    options
  );
}
export function useGetAllTagsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllTagsQuery,
    GetAllTagsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllTagsQuery, GetAllTagsQueryVariables>(
    GetAllTagsDocument,
    options
  );
}
export function useGetAllTagsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetAllTagsQuery, GetAllTagsQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetAllTagsQuery, GetAllTagsQueryVariables>(
    GetAllTagsDocument,
    options
  );
}
export type GetAllTagsQueryHookResult = ReturnType<typeof useGetAllTagsQuery>;
export type GetAllTagsLazyQueryHookResult = ReturnType<
  typeof useGetAllTagsLazyQuery
>;
export type GetAllTagsSuspenseQueryHookResult = ReturnType<
  typeof useGetAllTagsSuspenseQuery
>;
export type GetAllTagsQueryResult = Apollo.QueryResult<
  GetAllTagsQuery,
  GetAllTagsQueryVariables
>;
export const GetAllBrandsDocument = gql`
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

/**
 * __useGetAllBrandsQuery__
 *
 * To run a query within a React component, call `useGetAllBrandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllBrandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllBrandsQuery({
 *   variables: {
 *      search: // value for 'search'
 *      includeDeleted: // value for 'includeDeleted'
 *   },
 * });
 */
export function useGetAllBrandsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllBrandsQuery,
    GetAllBrandsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllBrandsQuery, GetAllBrandsQueryVariables>(
    GetAllBrandsDocument,
    options
  );
}
export function useGetAllBrandsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllBrandsQuery,
    GetAllBrandsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllBrandsQuery, GetAllBrandsQueryVariables>(
    GetAllBrandsDocument,
    options
  );
}
export function useGetAllBrandsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetAllBrandsQuery,
        GetAllBrandsQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetAllBrandsQuery, GetAllBrandsQueryVariables>(
    GetAllBrandsDocument,
    options
  );
}
export type GetAllBrandsQueryHookResult = ReturnType<
  typeof useGetAllBrandsQuery
>;
export type GetAllBrandsLazyQueryHookResult = ReturnType<
  typeof useGetAllBrandsLazyQuery
>;
export type GetAllBrandsSuspenseQueryHookResult = ReturnType<
  typeof useGetAllBrandsSuspenseQuery
>;
export type GetAllBrandsQueryResult = Apollo.QueryResult<
  GetAllBrandsQuery,
  GetAllBrandsQueryVariables
>;
export const GetBrandByIdDocument = gql`
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

/**
 * __useGetBrandByIdQuery__
 *
 * To run a query within a React component, call `useGetBrandByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBrandByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBrandByIdQuery({
 *   variables: {
 *      getBrandByIdId: // value for 'getBrandByIdId'
 *   },
 * });
 */
export function useGetBrandByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetBrandByIdQuery,
    GetBrandByIdQueryVariables
  > &
    (
      | { variables: GetBrandByIdQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetBrandByIdQuery, GetBrandByIdQueryVariables>(
    GetBrandByIdDocument,
    options
  );
}
export function useGetBrandByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBrandByIdQuery,
    GetBrandByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetBrandByIdQuery, GetBrandByIdQueryVariables>(
    GetBrandByIdDocument,
    options
  );
}
export function useGetBrandByIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetBrandByIdQuery,
        GetBrandByIdQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetBrandByIdQuery, GetBrandByIdQueryVariables>(
    GetBrandByIdDocument,
    options
  );
}
export type GetBrandByIdQueryHookResult = ReturnType<
  typeof useGetBrandByIdQuery
>;
export type GetBrandByIdLazyQueryHookResult = ReturnType<
  typeof useGetBrandByIdLazyQuery
>;
export type GetBrandByIdSuspenseQueryHookResult = ReturnType<
  typeof useGetBrandByIdSuspenseQuery
>;
export type GetBrandByIdQueryResult = Apollo.QueryResult<
  GetBrandByIdQuery,
  GetBrandByIdQueryVariables
>;
