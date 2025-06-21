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
        console.log("EVENTOS>>>", data);
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
      <section className="bg-gradient-to-br from-[#f0e4d0] via-[#f5e9d3] to-[#ede0c8] text-[#003049] py-20 px-4 sm:px-8 lg:px-24 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#6698BC] opacity-5 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#003049] opacity-3 rounded-full blur-2xl"></div>

        <div className="relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block">
              <h2 className="text-4xl md:text-5xl font-bold tracking-wide bg-gradient-to-r from-[#003049] to-[#6698BC] bg-clip-text text-transparent mb-4">
                PRÓXIMOS EVENTOS
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-[#003049] to-[#6698BC] mx-auto rounded-full"></div>
            </div>
          </div>

          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-2 text-center py-16">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#6698BC] border-t-transparent mx-auto"></div>
                  <div className="animate-ping absolute inset-0 rounded-full h-16 w-16 border-4 border-[#003049] border-opacity-20 mx-auto"></div>
                </div>
                <p className="mt-4 text-[#003049] opacity-70 font-medium">
                  Cargando eventos...
                </p>
              </div>
            ) : error ? (
              <div className="col-span-2 text-center py-16">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
                  <div className="text-red-500 text-4xl mb-4">⚠️</div>
                  <p className="text-red-600 font-medium">{error}</p>
                </div>
              </div>
            ) : (
              posts.map((post, idx) => (
                <div
                  key={post.id}
                  className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden
            transform transition-all duration-500 ease-out
            hover:-translate-y-3 hover:scale-[1.02]
            border border-white/20 backdrop-blur-sm
            ${idx % 2 === 0 ? "animate-fade-in-up" : "animate-fade-in-down"}
            `}
                  style={{ animationDelay: `${idx * 70}ms` }}
                >
                  {/* Gradiente overlay sutil */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6698BC]/5 to-[#003049]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                  <div className="flex flex-col md:flex-row h-full relative z-10">
                    {/* Contenedor de imagen mejorado */}
                    <div className="md:w-2/5 w-full h-64 md:h-auto overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                      <img
                        src={
                          post.images?.length > 0
                            ? post.images[0].image_url
                            : pict
                        }
                        alt={post.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                        loading="lazy"
                      />
                      {/* Efecto de brillo en hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                    </div>

                    {/* Contenido de texto mejorado */}
                    <div className="md:w-3/5 w-full p-8 flex flex-col justify-between bg-gradient-to-br from-[#6698BC] to-[#5a87a8]">
                      <div className="flex-1">
                        <h3
                          className="font-bold text-xl lg:text-2xl mb-4 leading-tight text-white
                    group-hover:text-[#f0e4d0] transition-colors duration-300
                    drop-shadow-sm"
                        >
                          {post.title}
                        </h3>

                        {/* Fecha con diseño mejorado */}
                        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                          <div className="flex items-center text-white/90 text-sm font-medium">
                            <div className="flex items-center bg-white/20 rounded-lg px-3 py-2 mr-2">
                              <span className="text-lg mr-2">📅</span>
                              <span className="font-semibold">Inicio:</span>
                            </div>
                            <span>{formatDate(post.start_at)}</span>
                          </div>

                          <div className="flex items-center text-white/90 text-sm font-medium mt-2">
                            <div className="flex items-center bg-white/20 rounded-lg px-3 py-2 mr-2">
                              <span className="text-lg mr-2">🏁</span>
                              <span className="font-semibold">Fin:</span>
                            </div>
                            <span>{formatDate(post.end_at)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Botón de acción sutil */}
                      <div className="mt-6">
                        <div className="flex items-center text-white/80 text-sm font-medium group-hover:text-white transition-colors duration-300">
                          <span className="mr-2">Ver detalles</span>
                          <svg
                            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Indicador de posición */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-[#003049] text-white rounded-full flex items-center justify-center text-xs font-bold opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    {idx + 1}
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Botón para ir al calendario */}
          <div className="text-center mt-16">
            <button
              onClick={() => {
                const calendarSection =
                  document.getElementById("calendar-section") ||
                  document.querySelector("[data-calendar]") ||
                  document.querySelector(".calendar");
                if (calendarSection) {
                  calendarSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#003049] to-[#6698BC] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 overflow-hidden"
            >
              {/* Efecto de brillo */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>

              {/* Contenido del botón */}
              <div className="relative z-10 flex items-center">
                <span className="text-lg mr-3">📅</span>
                <span className="text-lg">Ver Calendario Completo</span>
                <svg
                  className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>

              {/* Círculos decorativos */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/20 rounded-full animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
            </button>

            <p className="mt-4 text-[#003049]/70 text-sm font-medium">
              Explora todos los eventos en nuestro calendario interactivo
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────  COMUNICADOS  ───────────── */}
      <section className="bg-gradient-to-br from-[#1a2238] via-[#26335D] to-[#1e2a52] text-white py-20 px-4 sm:px-8 lg:px-24 relative overflow-hidden">
        {/* Elementos decorativos de fondo mejorados */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-400/20 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-indigo-500/15 to-purple-400/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-48 h-48 bg-gradient-to-br from-blue-300/10 to-cyan-300/5 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>

        <div className="relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block">
              <h2 className="text-4xl md:text-6xl font-bold tracking-wide bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent mb-4 drop-shadow-lg">
                COMUNICADOS
              </h2>
              <div className="h-1.5 w-40 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 mx-auto rounded-full shadow-lg shadow-blue-500/30"></div>
            </div>
            <p className="mt-8 text-blue-100/90 max-w-2xl mx-auto text-lg leading-relaxed">
              Mantente informado con nuestras últimas noticias y anuncios
              oficiales
            </p>
          </div>

          <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {comunicados.length === 0 ? (
              <div className="col-span-3 text-center py-16">
                <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-12 max-w-md mx-auto shadow-2xl shadow-black/20">
                  <div className="text-6xl mb-6 opacity-70 animate-bounce">
                    📢
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    No hay comunicados disponibles
                  </h3>
                  <p className="text-blue-200/80">
                    Pronto publicaremos nuevos comunicados oficiales
                  </p>
                </div>
              </div>
            ) : (
              comunicados.map((post, idx) => (
                <div
                  key={post.id}
                  className={`group relative bg-white/95 backdrop-blur-lg text-gray-800 rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden
            transform transition-all duration-700 ease-out
            hover:-translate-y-6 hover:scale-[1.03] hover:rotate-1
            border border-white/30 flex flex-col animate-fade-in-up
            before:absolute before:inset-0 before:bg-gradient-to-br before:from-cyan-500/5 before:via-blue-500/5 before:to-indigo-500/10 
            before:opacity-0 before:transition-opacity before:duration-700 hover:before:opacity-100
            after:absolute after:inset-0 after:rounded-3xl after:shadow-inner after:shadow-blue-500/10
            `}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Contenedor de imagen con efectos mejorados */}
                  <div className="relative h-45 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-10"></div>
                    <img
                      src={
                        post.images?.length > 0
                          ? post.images[0].image_url
                          : pict
                      }
                      alt={post.title}
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-115 group-hover:brightness-110 group-hover:contrast-105"
                      loading="lazy"
                    />

                    {/* Efecto de brillo deslizante mejorado */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out"></div>

                    {/* Badge de "Comunicado" mejorado */}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-[#26335D] via-blue-600 to-cyan-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg shadow-blue-600/30 z-20 backdrop-blur-sm border border-white/20">
                      <span className="mr-1">📢</span>
                      COMUNICADO
                    </div>

                    {/* Efecto de partículas */}
                    <div className="absolute top-6 right-6 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
                    <div
                      className="absolute top-8 right-10 w-1 h-1 bg-blue-300 rounded-full animate-ping opacity-40"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                  </div>

                  {/* Contenido de texto mejorado */}
                  <div className="p-8 flex flex-col justify-between flex-1 relative z-10">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-4 leading-tight text-gray-800 group-hover:text-[#26335D] transition-all duration-500 group-hover:transform group-hover:scale-[1.02]">
                        {post.title}
                      </h3>

                      {/* Fecha con diseño mejorado */}
                      <div className="flex items-center mb-6 text-gray-500">
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl px-4 py-2 flex items-center space-x-3 shadow-sm border border-blue-100/50">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-gray-700">
                            {formatDate(post.created_at)}
                          </span>
                        </div>
                      </div>

                      {/* Contenido completo con mejor tipografía */}
                      <div className="relative bg-gradient-to-br from-gray-50/80 to-blue-50/50 rounded-2xl p-6 border border-gray-100/80 shadow-inner">
                        <div className="prose prose-sm max-w-none">
                          <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap break-words">
                            {post.content}
                          </p>
                        </div>

                        {/* Efecto de borde interno */}
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-blue-200/30 pointer-events-none"></div>
                      </div>
                    </div>

                    {/* Decoración inferior */}
                    <div className="mt-6 pt-4 border-t border-gradient-to-r from-transparent via-gray-200 to-transparent">
                      <div className="flex items-center justify-center space-x-2 text-gray-400">
                        <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium">
                          Comunicado oficial
                        </span>
                        <div
                          className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
                          style={{ animationDelay: "0.5s" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Indicador de número mejorado */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/30 backdrop-blur-md border border-white/40 text-[#26335D] rounded-full flex items-center justify-center text-sm font-bold opacity-70 group-hover:opacity-100 transition-all duration-500 shadow-lg group-hover:scale-110">
                    {idx + 1}
                  </div>

                  {/* Efecto de hover en el borde mejorado */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-br group-hover:from-cyan-300/50 group-hover:via-blue-300/50 group-hover:to-indigo-300/50 transition-all duration-500 pointer-events-none"></div>

                  {/* Efecto de resplandor */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm -z-10"></div>
                </div>
              ))
            )}
          </div>
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
