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
};

export type Category = {
  __typename?: 'Category';
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type Characteristic = {
  __typename?: 'Characteristic';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type CharacteristicInput = {
  name: Scalars['String']['input'];
};

export type CreateCategoryInput = {
  name: Scalars['String']['input'];
};

export type CreateTagInput = {
  name: Scalars['String']['input'];
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['Float']['output'];
  isMain: Scalars['Boolean']['output'];
  url: Scalars['String']['output'];
};

export type ImageInput = {
  isMain: Scalars['Boolean']['input'];
  url: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addImage: Image;
  createCategory: Category;
  createNewCharacteristic: Characteristic;
  createNewProduct: Product;
  createTag: Tag;
  deleteCategory: Scalars['Boolean']['output'];
  deleteTag: Scalars['Boolean']['output'];
  restoreCategory: Scalars['Boolean']['output'];
  restoreTag: Scalars['Boolean']['output'];
  updateCategory: Category;
  updateProduct: Product;
  updateTag: Tag;
};

export type MutationAddImageArgs = {
  data: ImageInput;
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

export type MutationDeleteCategoryArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteTagArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRestoreCategoryArgs = {
  id: Scalars['Int']['input'];
};

export type MutationRestoreTagArgs = {
  id: Scalars['Int']['input'];
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
  description: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  reference: Scalars['String']['output'];
  shortDescription: Scalars['String']['output'];
};

export type ProductInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  reference: Scalars['String']['input'];
  shortDescription: Scalars['String']['input'];
};

export type ProductUpdateInput = {
  description: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  reference: Scalars['String']['input'];
  shortDescription: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllCategories: Array<Category>;
  getAllCharacteristic: Array<Characteristic>;
  getAllImages: Array<Image>;
  getAllProducts: Array<Product>;
  getAllTags: Array<Tag>;
  getProductById?: Maybe<Product>;
};

export type QueryGetAllCategoriesArgs = {
  includeDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryGetAllProductsArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetAllTagsArgs = {
  includeDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryGetProductByIdArgs = {
  id: Scalars['Int']['input'];
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
    shortDescription: string;
    description: string;
    price: number;
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
    shortDescription: string;
    description: string;
    price: number;
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

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllCategoriesQuery = {
  __typename?: 'Query';
  getAllCategories: Array<{
    __typename?: 'Category';
    id: number;
    name: string;
  }>;
};

export type UpdateCategoryMutationVariables = Exact<{
  input: UpdateCategoryInput;
}>;

export type UpdateCategoryMutation = {
  __typename?: 'Mutation';
  updateCategory: { __typename?: 'Category'; id: number; name: string };
};

export type AddImageMutationVariables = Exact<{
  data: ImageInput;
}>;

export type AddImageMutation = {
  __typename?: 'Mutation';
  addImage: { __typename?: 'Image'; id: number; url: string; isMain: boolean };
};

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type DeleteCategoryMutation = {
  __typename?: 'Mutation';
  deleteCategory: boolean;
};

export type CreateTagMutationVariables = Exact<{
  input: CreateTagInput;
}>;

export type CreateTagMutation = {
  __typename?: 'Mutation';
  createTag: { __typename?: 'Tag'; id: number; name: string };
};

export type GetAllTagsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllTagsQuery = {
  __typename?: 'Query';
  getAllTags: Array<{ __typename?: 'Tag'; id: number; name: string }>;
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

export type GetAllProductsQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
}>;

export type GetAllProductsQuery = {
  __typename?: 'Query';
  getAllProducts: Array<{
    __typename?: 'Product';
    id: number;
    name: string;
    price: number;
    reference: string;
    shortDescription: string;
    description: string;
  }>;
};

export type GetProductByIdQueryVariables = Exact<{
  getProductByIdId: Scalars['Int']['input'];
}>;

export type GetProductByIdQuery = {
  __typename?: 'Query';
  getProductById?: {
    __typename?: 'Product';
    id: number;
    reference: string;
    name: string;
    shortDescription: string;
    description: string;
    price: number;
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

export const CreateNewProductDocument = gql`
  mutation CreateNewProduct($data: ProductInput!) {
    createNewProduct(data: $data) {
      id
      reference
      name
      shortDescription
      description
      price
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
export const AddImageDocument = gql`
  mutation addImage($data: ImageInput!) {
    addImage(data: $data) {
      id
      url
      isMain
    }
  }
`;
export type AddImageMutationFn = Apollo.MutationFunction<
  AddImageMutation,
  AddImageMutationVariables
>;

/**
 * __useAddImageMutation__
 *
 * To run a mutation, you first call `useAddImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addImageMutation, { data, loading, error }] = useAddImageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddImageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddImageMutation,
    AddImageMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddImageMutation, AddImageMutationVariables>(
    AddImageDocument,
    options
  );
}
export type AddImageMutationHookResult = ReturnType<typeof useAddImageMutation>;
export type AddImageMutationResult = Apollo.MutationResult<AddImageMutation>;
export type AddImageMutationOptions = Apollo.BaseMutationOptions<
  AddImageMutation,
  AddImageMutationVariables
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
export const GetAllProductsDocument = gql`
  query GetAllProducts($search: String) {
    getAllProducts(search: $search) {
      id
      name
      price
      reference
      shortDescription
      description
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
  query getProductById($getProductByIdId: Int!) {
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
