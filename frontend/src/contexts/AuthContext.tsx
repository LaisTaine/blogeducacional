import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { login as apiLogin, LoginCredentials, apiClient } from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean; 
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    setIsLoading(false); 
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      const response = await apiLogin(credentials);
      const newToken = response.data.accessToken;
      setToken(newToken);
      localStorage.setItem('authToken', newToken);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      return true;
    } catch (error) {
      console.error('Falha no login:', error);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
    delete apiClient.defaults.headers.common['Authorization'];
    window.location.href = '/login';
  };

  const value = {
    isAuthenticated: !!token,
    isLoading, 
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}