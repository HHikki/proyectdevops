import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_KEY, API_BASE_URL } from "../config/env.jsx";
import ReactMarkdown from "react-markdown";
import pict from "../assets/eventos.png";

export default function BlogDetalle() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/prisma/post/public/${id}`,
          {
            headers: {
              "x-api-key": API_KEY,
            },
          }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Error al obtener la publicación");
        }

        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    } else {
      setError("ID no válido");
      setLoading(false);
    }
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-20 px-4 sm:px-8 lg:px-24 text-[#003049]">
      {loading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003049] mx-auto"></div>
          <p className="mt-4">Cargando publicación...</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10 transition-all duration-300">
          {" "}
          {/* ✅ Más espacio y redondeo */}
          {/* Imagen del post */}
          <div className="mb-8">
            <img
              src={post.image_url || pict}
              alt={post.title}
              className="w-full h-72 object-cover rounded-xl shadow-sm" // ✅ sombra sutil
              loading="lazy"
            />
          </div>
          {/* Título */}
          <h1 className="text-5xl font-extrabold text-center text-[#1a202c] mb-4 leading-tight">
            {post.title}
          </h1>
          {/* Fecha y ubicación */}
          <p className="text-sm text-gray-500 text-center mb-10">
            📅 {formatDate(post.created_at)}
            {post.location && ` | 📍 ${post.location}`}
          </p>
          {/* Contenido Markdown */}
          <div className="prose prose-lg max-w-none mx-auto p-6 sm:p-8 bg-gray-50 rounded-xl shadow-inner text-[#3B4D61]">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
