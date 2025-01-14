import React, { createContext, ReactNode, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

interface User {
  id: number;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  error: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        '/auth',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status !== 200) {
        throw new Error('Erreur lors de la connexion');
      }
      const { user: userData, accessToken } = response.data;

      Cookies.set('access_token', accessToken, { expires: 0.5 / 24 });

      setUser({
        id: userData.id,
        role: userData.role
      });

      setError(null);
      return true;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.errors?.[0]?.message || 'Erreur inconnue';
        setError(errorMessage);
      } else if (err instanceof Error) {
        console.error(err);
        setError(err.message);
      } else {
        console.error(err);
        setError('Erreur inconnue');
      }

      return false;
    }
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }
  return context;
};
