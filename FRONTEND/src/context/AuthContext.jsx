import { createContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Función para verificar el token
  const checkAuth = useCallback(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      return false;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 > Date.now()) {
        setIsAuthenticated(true);
        setUser(decoded);
        return true;
      }
    } catch (error) {
      console.error('Error decodificando token:', error);
    }

    localStorage.removeItem('jwtToken');
    setIsAuthenticated(false);
    setUser(null);
    return false;
  }, []); // No hay dependencias porque solo usa localStorage

  // Verifica el token al montar el componente
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Función para iniciar sesión
  const login = useCallback((token) => {
    localStorage.setItem('jwtToken', token);
    checkAuth();
  }, [checkAuth]);

  // Función para cerrar sesión
  const logout = useCallback(() => {
    localStorage.removeItem('jwtToken');
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout,
      checkAuth 
    }}>
      {children}
    </AuthContext.Provider>
  );
};