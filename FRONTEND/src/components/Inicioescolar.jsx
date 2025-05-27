import React from "react";
import escolar1 from "../assets/Blog/escolar1.jpg";
import escolar2 from "../assets/Blog/escolar2.jpg";
import escolar3 from "../assets/Blog/escolar3.jpg";

const fotos = [
  {
    src: escolar1,
    alt: "Alumnos pparados por obligacion",
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

const InicioEscolar = () => {
  return (
    <section className="bg-gradient-to-br from-[#2c366b] to-[#4151a3] text-white py-16 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-blue-200 text-base font-semibold tracking-widest uppercase mb-2 text-center">
          Conócenos
        </h2>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center drop-shadow-lg">
          INICIO AÑO ESCOLAR 2025
        </h1>
        <p className="mb-8 max-w-2xl mx-auto text-center text-lg md:text-xl text-blue-100">
          Comenzamos un nuevo año con entusiasmo y ganas de aprender. ¡Bienvenidos a este nuevo ciclo! 🎉✨
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {fotos.map((foto, i) => (
            <div
              key={i}
              className="bg-white/95 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group border border-blue-100"
            >
              <div className="overflow-hidden">
                <img
                  src={foto.src}
                  alt={foto.alt}
                  className="w-full h-80 md:h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4 text-center">
                <p className="text-[#2c366b] font-semibold text-base md:text-lg">{foto.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InicioEscolar;