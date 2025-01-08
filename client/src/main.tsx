import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './services/connexion.ts';
import App from './App.tsx';
import Catalog from './pages/Catalog.tsx';
import ManagementProduct from './pages/ManagementProduct.tsx';
import ProductDetails from './pages/ProductDetails.tsx';
import AddProduct from './pages/AddProduct.tsx';
import BrandManagement from './pages/BrandManagement.tsx';
import AddBrand from './components/AddBrand.tsx';
import BrandCatalog from './components/BrandCatalog.tsx';
import BrandDetails from './components/BrandDetails.tsx';


// Review Penser à mettre en place les portected route durant l'Auth avec Admin / Collaborator
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
        path: '/managementProduct',// Review ???
        element: <ManagementProduct />
      },
      {
        path: '/addProduct',// Review ???
        element: <AddProduct />
      },
      {
        path: '/product/:id/edit',
        element: <ProductDetails />
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
