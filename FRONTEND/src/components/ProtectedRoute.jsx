import { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, checkAuth } = useContext(AuthContext);
  const location = useLocation();

  // Verifica el token al intentar acceder a la ruta
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!isAuthenticated) {
    // Redirigir a login pero mantener la ruta anterior para volver después
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  // Renderizar el componente dentro de un div que no afecte al layout
  return (
    <div className="page-container">
      <Component {...rest} />
    </div>
  );
};

export default ProtectedRoute;