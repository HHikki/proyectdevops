import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Función para verificar el token
  const checkAuth = () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Verifica si el token no ha expirado
        if (decoded.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          setUser(decoded);
          return true;
        } else {
          localStorage.removeItem('jwtToken'); // Elimina token expirado
          setIsAuthenticated(false);
          setUser(null);
          return false;
        }
      } catch (error) {
        console.error('Error decodificando token:', error);
        localStorage.removeItem('jwtToken'); // Token inválido
        setIsAuthenticated(false);
        setUser(null);
        return false;
      }
    }
    setIsAuthenticated(false);
    setUser(null);
    return false;
  };

  // Verifica el token al montar el componente
  useEffect(() => {
    checkAuth();
  }, []);

  // Función para iniciar sesión
  const login = (token) => {
    localStorage.setItem('jwtToken', token);
    const decoded = jwtDecode(token);
    setIsAuthenticated(true);
    setUser(decoded);
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('jwtToken');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};