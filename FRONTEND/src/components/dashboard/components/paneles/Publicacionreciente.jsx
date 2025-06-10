import React, { useEffect, useState } from "react";
import { Table, Spin, message } from "antd";
import { API_KEY, API_BASE_URL } from "../../../../config/env.jsx";

const PublicacionesRecientes = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/prisma/post/page`, {
          headers: {
            "x-api-key": API_KEY,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Error al obtener publicaciones");
        const data = await response.json();

        // Filtrar posts de los últimos 3 días
        const tresDiasAtras = new Date();
        tresDiasAtras.setDate(tresDiasAtras.getDate() - 3);

        const recientes = data.filter((post) => {
          // Usa created_at si existe, si no, muestra todos
          if (!post.created_at) return false;
          return new Date(post.created_at) >= tresDiasAtras;
        });

        setPosts(
          recientes.map((post) => ({
            key: post.id,
            titulo: post.title,
            autor:
              post.user?.username || post.autor || post.userId || "Sin autor",
            fecha: post.created_at
              ? new Date(post.created_at).toLocaleDateString()
              : "-",
          }))
        );
      } catch (error) {
        message.error("No se pudieron cargar las publicaciones recientes");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const columns = [
    { title: "Título", dataIndex: "titulo", key: "titulo" },
    { title: "Autor", dataIndex: "autor", key: "autor" },
    { title: "Fecha", dataIndex: "fecha", key: "fecha" },
  ];

  return (
    <section className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-2">Publicaciones Recientes</h2>
      <p className="text-sm text-gray-500 mb-4">
        Las últimas noticias, eventos y comunicados publicados
      </p>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={posts}
          pagination={false}
          className="mt-4"
        />
      </Spin>
    </section>
  );
};

export default PublicacionesRecientes;
