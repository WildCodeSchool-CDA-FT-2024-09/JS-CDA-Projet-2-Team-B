import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './services/connexion.ts';
import App from './App.tsx';
import Catalog from './pages/Catalog.tsx';
import ManagementProduct from './pages/ManagementProduct.tsx';
import ProductDetails from './components/ProductDetails.tsx';
import AddProduct from './pages/AddProduct.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/catalog',
        element: <Catalog />
      },
      {
        path: '/managementProduct',
        element: <ManagementProduct />
      },
      {
        path: '/addProduct',
        element: <AddProduct />
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
