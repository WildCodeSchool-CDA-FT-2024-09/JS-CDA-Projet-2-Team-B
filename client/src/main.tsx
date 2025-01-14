import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './services/connexion.ts';
import App from './App.tsx';
import ProductCatalog from './components/Product/ProductCatalog.tsx';
import ItemManagement from './pages/ItemManagement.tsx';
import ProductDetails from './components/Product/ProductDetails.tsx';
import AddProduct from './components/Product/AddProduct.tsx';
import BrandManagement from './pages/BrandManagement.tsx';
import AddBrand from './components/Brand/AddBrand.tsx';
import BrandCatalog from './components/Brand/BrandCatalog.tsx';
import BrandDetails from './components/Brand/BrandDetails.tsx';
import UserManagement from './pages/users/UserManagement.tsx';
import ProductManagement from './pages/ProductManagement.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/users',
        element: <UserManagement />
      },
      {
        path: '/product',
        element: <ProductManagement />,
        children: [
          {
            path: '/product/view',
            element: <ProductCatalog />
          },
          {
            path: '/product/add',
            element: <AddProduct />
          },
          {
            path: '/product/:id/edit',
            element: <ProductDetails />
          }
        ]
      },
      {
        path: '/itemmanagement',
        element: <ItemManagement />
      },
      {
        path: '/brand',
        element: <BrandManagement />,
        children: [
          {
            path: '/brand/view',
            element: <BrandCatalog />
          },
          {
            path: '/brand/add',
            element: <AddBrand />
          },
          {
            path: '/brand/:id/edit',
            element: <BrandDetails />
          }
        ]
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
