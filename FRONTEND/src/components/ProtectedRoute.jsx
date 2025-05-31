
import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, checkAuth } = useContext(AuthContext);

  // Verifica el token al intentar acceder a la ruta
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/Login" replace />;
};

export default ProtectedRoute;