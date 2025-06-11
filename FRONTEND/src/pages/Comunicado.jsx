import React, { useState, useEffect } from "react";
import Crush from "../components/Crush";
import pict from "../assets/eventos.png";
import { FiBook } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import { Footer } from "../components/Footer";
import Calendar from "../components/Calendar";
import { API_KEY, API_BASE_URL } from "../config/env.jsx";

// Puedes usar animate.css si lo tienes, o simplemente Tailwind animaciones
// import "animate.css"; // Si quieres usar animate__fadeInUp, etc.

export default function Comunicado() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comunicados, setComunicados] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/prisma/post/page?tipo=1`,
          {
            headers: { "x-api-key": API_KEY },
            cache: "no-cache",
          }
        );
        if (!response.ok) throw new Error("Error al cargar los posts");
        const data = await response.json();
        setPosts(data);
        console.log("EVENTOS>>>",data)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchComunicados = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/prisma/post/page?tipo=3`,
          {
            headers: { "x-api-key": API_KEY },
            cache: "no-cache",
          }
        );
        if (!response.ok) throw new Error("Error al cargar los comunicados");
        const data = await response.json();
        setComunicados(data);
        
        console.log("COMU>>>", data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPosts();
    fetchComunicados();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <div>
      {/* Hero */}
      <Crush pict={pict} />

      {/* ─────────────  PRÓXIMOS EVENTOS  ───────────── */}
      <section className="bg-[#f0e4d0] text-[#003049] py-20 px-4 sm:px-8 lg:px-24">
        <h2 className="text-3xl md:text-4xl font-bold text-left mb-12 tracking-wide">
          PRÓXIMOS EVENTOS
        </h2>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-7">
          {loading ? (
            <div className="col-span-2 text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003049] mx-auto"></div>
            </div>
          ) : error ? (
            <div className="col-span-2 text-center py-10 text-red-600">
              {error}
            </div>
          ) : (
            posts.map((post, idx) => (
              <div
                key={post.id}
                className={`bg-[#6698BC] text-black rounded-2xl shadow-xl overflow-hidden
                transform transition-all duration-300
                hover:-translate-y-2 hover:scale-[1.035] hover:shadow-2xl group
                flex flex-col md:flex-row h-full
                ${idx % 2 === 0 ? "animate-fade-in-up" : "animate-fade-in-down"}
                `}
                style={{ animationDelay: `${idx * 70}ms` }}
              >
                {/* Imagen */}
                <div className="md:w-1/2 w-full h-52 md:h-auto overflow-hidden">
                  <img
                    src={
                      post.images?.length > 0 ? post.images[0].image_url : pict
                    }
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Texto */}
                <div className="md:w-1/2 w-full p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg mb-1 leading-snug group-hover:scale-105 transition-transform duration-300">
                      {post.title}
                    </h3>
                    <p className="text-white text-xs mb-2">
                      📅 {formatDate(post.start_at)} {"hasta "}
                      {formatDate(post.end_at)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ─────────────  COMUNICADOS  ───────────── */}
      <section className="bg-[#26335D] text-white py-20 px-4 sm:px-8 lg:px-24">
        <h2 className="text-3xl md:text-4xl font-bold text-left mb-12 tracking-wide">
          COMUNICADOS
        </h2>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {comunicados.length === 0 ? (
            <p className="col-span-3 text-center text-gray-300">
              No hay comunicados disponibles.
            </p>
          ) : (
            comunicados.map((post, idx) => (
              <div
                key={post.id}
                className={`bg-white text-black rounded-2xl shadow-lg overflow-hidden
                transform transition-all duration-300
                hover:-translate-y-2 hover:scale-105 hover:shadow-2xl flex flex-col animate-fade-in-up
                `}
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <img
                  src={
                    post.images?.length > 0 ? post.images[0].image_url : pict
                  }
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                />
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-bold text-xl mb-2 group-hover:scale-105 transition-transform duration-300">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-1">
                      📅 {formatDate(post.created_at)}
                    </p>
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3 hover:line-clamp-none transition-all duration-300">
                      {post.content}
                    </p>
                  </div>
                  <a
                    href={`/comunicado/${post.id}`}
                    className="mt-auto inline-block text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors animate-pulse-on-hover"
                  >
                    Ver más →
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ─────────────  NORMAS INSTITUCIONALES  ───────────── */}
      <section className="bg-gradient-to-r from-[#9b1c1c] via-[#b73333] to-[#9b1c1c] text-white py-20 px-4 sm:px-8 lg:px-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-wide">
          NORMAS INSTITUCIONALES
        </h2>
        <div className="max-w-[1400px] mx-auto flex justify-center">
          <div className="flex flex-wrap gap-8 justify-center">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white text-black rounded-2xl shadow-md p-6 flex flex-col items-center text-center
                transition transform hover:scale-105 hover:shadow-2xl hover:border-2 hover:border-[#445da7] w-[300px] animate-fade-in-up"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <FiBook size={32} className="text-[#445da7]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Reglamento Interno
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Documento oficial con las normas que rigen la convivencia y
                  disciplina de los estudiantes.
                </p>
                <a
                  href="https://www.trilcelm.edu.pe/lamolina/doc/reglamento_interno.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto bg-[#445da7] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#2f457d] transition"
                >
                  Ver documento 📄
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendario y footer */}
      <Calendar />
      <Footer />

      {/* --- Animaciones personalizadas --- */}
      <style>
        {`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up { animation: fade-in-up 0.7s cubic-bezier(.4,2,.6,1) both;}
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-down { animation: fade-in-down 0.7s cubic-bezier(.4,2,.6,1) both;}
        .animate-pulse-on-hover:hover, .animate-pulse-on-hover:focus {
          animation: pulse 0.7s;
        }
        @keyframes pulse {
          0% { transform: scale(1);}
          40% { transform: scale(1.09);}
          100% { transform: scale(1);}
        }
      `}
      </style>
    </div>
  );
}
