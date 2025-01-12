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
import UserManagement from './pages/users/UserManagement.tsx';
import Portal from './pages/users/Portal.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { RoleBasedRoute } from './utils/RoleBasedRoute.tsx';

const router = createBrowserRouter([
  {
    path: '/portal',
    element: <Portal />
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/users',
        element: (
          <RoleBasedRoute
            allowedRole={['admin']}
            element={<UserManagement />}
          />
        )
      },
      {
        path: '/catalog',
        element: <RoleBasedRoute allowedRole={['user']} element={<Catalog />} />
      },
      {
        path: '/managementProduct',
        element: (
          <RoleBasedRoute
            allowedRole={['user']}
            element={<ManagementProduct />}
          />
        )
      },
      {
        path: '/addProduct',
        element: (
          <RoleBasedRoute allowedRole={['user']} element={<AddProduct />} />
        )
      },
      {
        path: '/product/:id/edit',
        element: (
          <RoleBasedRoute allowedRole={['user']} element={<ProductDetails />} />
        )
      },
      {
        path: '/brand',
        element: (
          <RoleBasedRoute
            allowedRole={['user']}
            element={<BrandManagement />}
          />
        ),
        children: [
          {
            path: '/brand/view',
            element: (
              <RoleBasedRoute
                allowedRole={['user']}
                element={<BrandCatalog />}
              />
            )
          },
          {
            path: '/brand/add',
            element: (
              <RoleBasedRoute allowedRole={['user']} element={<AddBrand />} />
            )
          },
          {
            path: '/brand/:id/edit',
            element: (
              <RoleBasedRoute
                allowedRole={['user']}
                element={<BrandDetails />}
              />
            )
          }
        ]
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>
);
