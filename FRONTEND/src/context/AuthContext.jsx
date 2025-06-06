import { createContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Función para verificar el token
  const checkAuth = useCallback(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      setAdmin(false);
      setLoading(false); // ✅ Fin de chequeo
      return false;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 > Date.now()) {
        setIsAuthenticated(true);
        setUser({ id: decoded.userId, name: decoded.userName }); // 🟢 Guarda como objeto
        setName(decoded.userName);
        setAdmin(decoded.is_admin); // Asegurate de convertir si es string
        setLoading(false); // ✅
        return true;
      }
    } catch (error) {
      console.error("Error decodificando token:", error);
    }

    localStorage.removeItem("jwtToken");
    setIsAuthenticated(false);
    setUser(null);
    setAdmin(false);
    setLoading(false); // ✅
    return false;
  }, []);
   // No hay dependencias porque solo usa localStorage

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
      name,
      admin,
      loading, 
      login, 
      logout,
      checkAuth 
    }}>
      {children}
    </AuthContext.Provider>
  );
};