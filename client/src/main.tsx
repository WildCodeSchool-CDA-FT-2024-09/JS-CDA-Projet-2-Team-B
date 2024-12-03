import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './services/connexion.ts';
import App from './App.tsx';
import Catalog from './pages/Catalog.tsx';
import ProductDetails from './components/ProductDetails.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/product',
        element: <Catalog />
      },
      {
        path: '/product/:id/edit',
        element: <ProductDetails />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);
