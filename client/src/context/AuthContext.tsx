import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import axios from 'axios';
import { createAxiosInstance } from '../services/axios.instance';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
  isInitializing: boolean;
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
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsInitializing(false);
  }, []);

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('user');
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

      const loggedUser: User = {
        id: userData.id,
        first_name: userData.first_name,
        last_name: userData.last_name,
        role: userData.role,
        email: userData.email,
        phone: userData.phone
      };

      setUser(loggedUser);

      localStorage.setItem('user', JSON.stringify(loggedUser));

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
    <AuthContext.Provider
      value={{ user, logout, isLoggedIn, login, error, isInitializing }}
    >
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
