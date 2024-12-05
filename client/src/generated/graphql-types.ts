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
  createNewProduct: Product;
};

export type MutationAddImageArgs = {
  data: ImageInput;
};

export type MutationCreateNewProductArgs = {
  data: ProductInput;
};

export type Product = {
  __typename?: 'Product';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
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

export type Query = {
  __typename?: 'Query';
  getAllImages: Array<Image>;
  getAllProducts: Array<Product>;
  getProductById?: Maybe<Product>;
};

export type QueryGetProductByIdArgs = {
  id: Scalars['Float']['input'];
};

export type GetAllProductsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllProductsQuery = {
  __typename?: 'Query';
  getAllProducts: Array<{
    __typename?: 'Product';
    id: string;
    reference: string;
    name: string;
    shortDescription: string;
    description: string;
    price: number;
  }>;
};

export type GetProductByIdQueryVariables = Exact<{
  getProductByIdId: Scalars['Float']['input'];
}>;

export type GetProductByIdQuery = {
  __typename?: 'Query';
  getProductById?: {
    __typename?: 'Product';
    id: string;
    reference: string;
    name: string;
    shortDescription: string;
    description: string;
    price: number;
  } | null;
};

export type GetAllImagesQueryVariables = Exact<{
  productId: Scalars['Float']['input'];
}>;

export type GetAllImagesQuery = {
  __typename?: 'Query';
  getAllImages: Array<{
    __typename?: 'Image';
    id: number;
    url: string;
    isMain: boolean;
  }>;
};

export type AddImageMutationVariables = Exact<{
  data: ImageInput;
}>;

export type AddImageMutation = {
  __typename?: 'Mutation';
  addImage: { __typename?: 'Image'; id: number; url: string; isMain: boolean };
};

export const GetAllProductsDocument = gql`
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
  query getAllImages($productId: Float!) {
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
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetAllImagesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAllImagesQuery,
    GetAllImagesQueryVariables
  > &
    (
      | { variables: GetAllImagesQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
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
