import React, { useEffect, useState } from "react";
import { API_KEY, API_BASE_URL } from "../config/env.jsx";
import img4 from "../assets/prisma_logo.jpg";

const Blog_post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/prisma/post/page?tipo=2`,
          {
            headers: {
              "x-api-key": API_KEY,
            },
            cache: "no-cache",
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener los posts del blog");
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="px-6 py-10 bg-[#6698BC]">
      <h2 className="text-5xl md:text-6xl font-black text-center mb-8 text-white">
        Publicaciones
      </h2>

      {loading ? (
        <div className="text-center text-white">Cargando publicaciones...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border shadow-lg rounded overflow-hidden bg-white hover:bg-red-300 transition duration-300"
            >
              <div className="relative">
                <img
                  src={post.image_url || img4}
                  alt={post.title}
                  className="w-full h-65 object-cover"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                  {post.category || "Sin categoría"}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-blue-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {formatDate(post.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Blog_post;
