import React from "react";
import Crush from "../components/Crush";
import pict from "../assets/eventos.png"; // imagen de cabecera

import { FiBook } from "react-icons/fi";
import { Footer } from "../components/Footer";
import Calendar from "../components/Calendar";

export default function Comunicado() {
  /* ─────────────────────  DATA  ───────────────────── */
  const eventos = [
    {
      id: 1,
      titulo: "Día de la Madre",
      fecha: "📅 11 de mayo, 2025",
      lugar: "📍 Plantel Institucional",
      descripcion:
        "Con motivo del Día de la Madre, el colegio celebró una ceremonia especial en honor a todas las mamás de nuestra comunidad educativa. Se realizaron presentaciones artísticas y se entregaron reconocimientos...",
      imagen: pict,
      enlace: "#",
    },
    {
      id: 2,
      titulo: "VIII Concurso de Grafiti 🎨💡🖊️✨",
      fecha: "📅 20 de abril, 2021",
      lugar: "",
      descripcion:
        "VIII CONCURSO DE GRAFITI promoviendo la creatividad estudiantil en muralismo escolar...",
      imagen: pict,
      enlace: "#",
    },
    {
      id: 3,
      titulo: "Campaña Preventiva frente al Ciberbullying",
      fecha: "📅 20 de abril, 2021",
      lugar: "",
      descripcion:
        "La campaña preventiva frente al ciberbullying promueve una cultura de paz, a través de las relaciones armoniosas y de respeto...",
      imagen: pict,
      enlace: "#",
    },
    {
      id: 4,
      titulo: "Origen de la palabra TRILCE",
      fecha: "📅 14 de abril, 2021",
      lugar: "",
      descripcion:
        "Existen muchas versiones acerca del origen de la palabra Trilce, que le da nombre al segundo poemario de César Vallejo...",
      imagen: pict,
      enlace: "#",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <Crush pict={pict} />

      {/* ─────────────  PRÓXIMOS EVENTOS  ───────────── */}
      <section className="bg-[#f0e4d0] text-[#003049] py-20 px-4 sm:px-8 lg:px-24">
        <h2 className="text-3xl md:text-4xl font-bold text-left mb-12 tracking-wide">
          PRÓXIMOS EVENTOS
        </h2>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {eventos.map((ev) => (
            <div
              key={ev.id}
              className="bg-[#6698BC] text-black rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group flex flex-col md:flex-row h-full"
            >
              {/* Imagen */}
              <div className="md:w-1/2 w-full h-52 md:h-auto overflow-hidden">
                <img
                  src={ev.imagen}
                  alt={ev.titulo}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Texto */}
              <div className="md:w-1/2 w-full p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-1 leading-snug">
                    {ev.titulo}
                  </h3>
                  <p className="text-white text-xs mb-2">
                    {ev.fecha} {ev.lugar}
                  </p>
                  <p className="text-sm text-white mb-4 line-clamp-3">
                    {ev.descripcion}
                  </p>
                </div>

                <a
                  href={ev.enlace}
                  className="text-[#780000] hover:text-orange-800 text-sm font-semibold"
                >
                  Leer más 🔍
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────  COMUNICADOS  ───────────── */}
      <section className="bg-[#26335D] text-white py-20 px-4 sm:px-8 lg:px-24">
        <h2 className="text-3xl md:text-4xl font-bold text-left mb-12 tracking-wide">
          COMUNICADOS
        </h2>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white text-black rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col"
            >
              <img
                src={pict}
                alt="Comunicado"
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-bold text-xl mb-2">Día de la Madre</h3>
                  <p className="text-gray-500 text-sm mb-1">
                    📅 11/05/25 | 📍 Plantel Institucional
                  </p>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    Ceremonia especial en honor a todas las mamás de nuestra
                    comunidad educativa. Presentaciones artísticas,
                    reconocimientos y más.
                  </p>
                </div>
                <a
                  href="#"
                  className="mt-auto inline-block text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Ver más →
                </a>
              </div>
            </div>
          ))}
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
                className="bg-white text-black rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition transform hover:scale-105 hover:shadow-xl w-[300px]"
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
    </div>
  );
}
