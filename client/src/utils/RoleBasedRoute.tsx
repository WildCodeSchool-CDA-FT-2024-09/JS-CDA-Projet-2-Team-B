import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React from 'react';

interface RoleBasedRouteProps {
  allowedRole: string[];
  element: React.JSX.Element;
}

export const RoleBasedRoute = ({
  allowedRole,
  element
}: RoleBasedRouteProps) => {
  const { user, isLoggedIn, isInitializing } = useAuth();

  if (isInitializing) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/portal" replace />;
  }

  if (!allowedRole.includes(user!.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return element;
};
