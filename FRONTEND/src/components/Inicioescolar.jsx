import React from "react";
import { FaRegSmile } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import escolar1 from "../assets/Blog/escolar1.jpg";
import escolar2 from "../assets/Blog/escolar2.jpg";
import escolar3 from "../assets/Blog/escolar3.jpg";

const fotos = [
  { src: escolar1 },
  { src: escolar2 },
  { src: escolar3 },
];

const colors = [
  "border-[#D7263D]", // Gouchjang Red
  "border-[#5D8CA9]", // Cosmos Blue
  "border-[#A6122E]", // Crimson Blaze
];

const InicioEscolar = () => (
  <section className="bg-[#003049] min-h-screen py-20 px-4 font-poppins">
    <div className="max-w-6xl mx-auto">
      {/* Subtítulo */}
      {/* Título grande con gradiente */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-3 bg-gradient-to-r from-[#FFFFFF] via-[#FFFFFF] to-[#FFFFFF] bg-clip-text text-transparent drop-shadow-xl tracking-tight">
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
        <span className=" text-lg md:text-xl mt-3 text-[#FFD600] font-bold tracking-wide flex items-center justify-center gap-1">
          ¡Bienvenidos a este nuevo ciclo! <FiStar className="text-xl animate-pulse" />
        </span>
      </div>
      {/* Cards SOLO IMAGEN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {fotos.map((foto, i) => (
          <div
            key={i}
            className={`bg-white rounded-3xl ${colors[i % colors.length]} border-2 shadow-lg overflow-hidden flex transform transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl group p-0`}
          >
            <img
              src={foto.src}
              alt=""
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105 rounded-3xl"
              loading="lazy"
              style={{ display: "block" }}
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default InicioEscolar;
