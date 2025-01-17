import { ApolloClient, InMemoryCache } from '@apollo/client';

const apiUri = import.meta.env.VITE_API_URI;// relative et absolue http ou pas

const client = new ApolloClient({
  uri: apiUri,
  cache: new InMemoryCache()
});

export default client;
