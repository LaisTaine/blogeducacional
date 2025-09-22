import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isLoading } = useAuth(); 

  if (isLoading) {
    return <div>Verificando autenticação...</div>;
  }

  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}