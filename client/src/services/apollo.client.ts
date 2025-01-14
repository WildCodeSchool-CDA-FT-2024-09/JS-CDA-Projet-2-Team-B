import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const apiUri = import.meta.env.VITE_API_URI;

export const createApolloClient = (logout: () => void) => {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) => {
        console.error(`GraphQL error: ${message}`);
        if (
          message ===
          "Token d'accès invalide ou expiré. Veuillez vous reconnecter."
        ) {
          logout();
        }
      });
    }
    if (networkError) {
      console.error(`Erreur réseau: ${networkError}`);
    }
  });
  const httpLink = createHttpLink({
    uri: apiUri,
    credentials: 'include'
  });

  return new ApolloClient({
    link: errorLink.concat(httpLink),
    cache: new InMemoryCache()
  });
};
