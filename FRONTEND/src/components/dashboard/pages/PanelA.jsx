import React, { useContext, useState, useEffect } from "react";
import { Button } from "../components/UI";
import { AuthContext } from "../../../context/AuthContext";

const API_BASE_URL = "http://localhost:4001";

export default function PanelA() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch(`${API_BASE_URL}/prisma/post`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        
        if (!response.ok) {
          throw new Error('No se pudieron cargar los posts');
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen pt-16"> {/* Añadimos padding-top para el Navbar */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-[#003049] mb-8">Panel de Administración</h1>
          
          <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Bienvenido{user?.email ? `, ${user.email}` : ''}
            </h2>
            <p className="text-gray-600">
              Desde aquí podrás gestionar el contenido de la plataforma.
            </p>
          </div>

          {/* Tabla de Posts */}
          <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Lista de Posts</h3>
            
            {loading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : error ? (
              <div className="text-red-600 text-center py-4">
                {error}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {posts.map((post) => (
                      <tr key={post.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{post.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{post.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{post.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <Button className="mr-2 bg-blue-500 hover:bg-blue-600">Editar</Button>
                          <Button className="bg-red-500 hover:bg-red-600">Eliminar</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Gestión de Eventos</h3>
              <Button className="w-full">Administrar Eventos</Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Blog</h3>
              <Button className="w-full">Gestionar Blog</Button>
              
            </div>
            
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Comunicados</h3>
              <Button className="w-full">Administrar Comunicados</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}