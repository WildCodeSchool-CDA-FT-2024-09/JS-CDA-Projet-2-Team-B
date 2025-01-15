import React, { createContext, ReactNode, useContext, useState } from 'react';
import { createAxiosInstance } from '../services/axios.instance';

interface User {
  id: number;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
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

  const logout = async () => {
    setUser(null);
  };

  const axiosInstance = createAxiosInstance(logout);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axiosInstance.post(
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

      const { user: userData } = response.data;

      setUser({
        id: userData.id,
        role: userData.role
      });

      setError(null);
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
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
    <AuthContext.Provider value={{ user, logout, isLoggedIn, login, error }}>
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
