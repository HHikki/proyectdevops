import React from "react";
import { FaRegSmile } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import escolar1 from "../assets/Blog/escolar1.jpg";
import escolar2 from "../assets/Blog/escolar2.jpg";
import escolar3 from "../assets/Blog/escolar3.jpg";

const fotos = [
  {
    src: escolar1,
    alt: "Alumnos parados por obligación",
  },
  {
    src: escolar2,
    alt: "Incomodidad total",
  },
  {
    src: escolar3,
    alt: "Oso",
  },
];

const colors = [
  "border-[#D7263D]", // Gouchjang Red
  "border-[#5D8CA9]", // Cosmos Blue
  "border-[#A6122E]", // Crimson Blaze
];

const InicioEscolar = () => (
  <section className="bg-gradient-to-br from-[#2c366b] to-[#4151a3] min-h-screen py-20 px-4 font-poppins">
    <div className="max-w-6xl mx-auto">
      {/* Subtítulo */}
      <h2 className="text-center text-sm md:text-base font-bold tracking-[.35em] uppercase text-[#A7BFE8] mb-2">
        CONÓCENOS
      </h2>
      {/* Título grande con gradiente */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-3 bg-gradient-to-r from-[#5D8CA9] via-[#3B4D61] to-[#D7263D] bg-clip-text text-transparent drop-shadow-xl tracking-tight">
        INICIO AÑO ESCOLAR 2025
      </h1>
      {/* Barra animada decorativa */}
      <div className="mx-auto w-32 h-1 rounded-full bg-gradient-to-r from-[#D7263D] via-[#FFD600] to-[#5D8CA9] mb-6 animate-pulse shadow-lg"></div>
      {/* Descripción mejorada */}
      <div className="mb-10 max-w-2xl mx-auto text-center">
        <p className="text-xl md:text-2xl text-[#f5f5fa] font-semibold leading-relaxed flex flex-wrap justify-center items-center gap-2">
          Comenzamos un nuevo año con <span className="text-[#FFD600] font-extrabold">entusiasmo</span> y ganas de aprender.
          <FaRegSmile className="inline-block text-2xl text-[#FFD600] drop-shadow animate-bounce" />
        </p>
        <span className="block text-lg md:text-xl mt-3 text-[#FFD600] font-bold tracking-wide flex items-center justify-center gap-1">
          ¡Bienvenidos a este nuevo ciclo! <FiStar className="text-xl animate-pulse" />
        </span>
      </div>
      {/* Cards de imágenes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {fotos.map((foto, i) => (
          <div
            key={i}
            className={`bg-white rounded-3xl ${colors[i % colors.length]} border-2 shadow-lg overflow-hidden flex flex-col transform transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl group`}
            style={{ minHeight: "370px" }}
          >
            <div className="overflow-hidden">
              <img
                src={foto.src}
                alt={foto.alt}
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-3xl"
                loading="lazy"
              />
            </div>
            <div className="p-7 flex-1 flex items-center justify-center bg-white">
              <p className="text-[#232323] font-bold text-xl md:text-2xl text-center tracking-wide transition-all duration-300 group-hover:text-[#D7263D] group-hover:scale-105">
                {foto.alt}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Mensaje de cierre opcional */}
      <div className="text-center mt-14">
        <span className="text-2xl md:text-3xl font-black text-[#D7263D] flex items-center justify-center gap-2 drop-shadow">
          ¡Que este año escolar esté lleno de logros!
          <FiStar className="inline-block text-yellow-400 text-2xl animate-pulse" />
        </span>
      </div>
    </div>
  </section>
);

export default InicioEscolar;
