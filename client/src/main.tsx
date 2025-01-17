import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './services/apollo.client.ts';
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
import Portal from './pages/users/Portal.tsx';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { RoleBasedRoute } from './utils/RoleBasedRoute.tsx';
import Profile from './pages/users/Profile.tsx';
import UnauthorizedPage from './components/UnauthorizedPage.tsx';
import UserLayout from './pages/users/UserLayout.tsx';

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
          <RoleBasedRoute allowedRole={['admin']} element={<UserLayout />} />
        ),
        children: [
          {
            path: '/users',
            element: <UserManagement />
          }
        ]
      },
      {
        path: '/profile',
        element: <RoleBasedRoute allowedRole={['user']} element={<Profile />} />
      },
      {
        path: '/product',
        element: (
          <RoleBasedRoute
            allowedRole={['user']}
            element={<ProductManagement />}
          />
        ),
        children: [
          {
            path: '/product/view',
            element: (
              <RoleBasedRoute
                allowedRole={['user']}
                element={<ProductCatalog />}
              />
            )
          },
          {
            path: '/product/add',
            element: (
              <RoleBasedRoute allowedRole={['user']} element={<AddProduct />} />
            )
          },
          {
            path: '/product/:id/edit',
            element: (
              <RoleBasedRoute
                allowedRole={['user']}
                element={<ProductDetails />}
              />
            )
          }
        ]
      },
      {
        path: '/itemmanagement',
        element: (
          <RoleBasedRoute allowedRole={['user']} element={<ItemManagement />} />
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
  },
  {
    path: '*',
    element: <UnauthorizedPage />
  }
]);

const Root = () => {
  const { logout } = useAuth();
  const client = createApolloClient(logout);

  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Root />
    </AuthProvider>
  </StrictMode>
);
