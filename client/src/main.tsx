import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './services/apollo.client.ts';
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
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { RoleBasedRoute } from './utils/RoleBasedRoute.tsx';

const Root = () => {
  const { logout } = useAuth();
  const client = createApolloClient(logout);

  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
};

const router = createBrowserRouter([
  {
    path: '/portal',
    element: <Portal />
  },
  {
    path: '/',
    element: (
      <RoleBasedRoute allowedRole={['admin', 'user']} element={<App />} />
    ),
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
    <AuthProvider>
      <Root />
    </AuthProvider>
  </StrictMode>
);
