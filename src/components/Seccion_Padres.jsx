import React from "react";

import padres1 from "../assets/Blog/padres1.jpg";
import padres2 from "../assets/Blog/padres2.jpg";

const SeccionPadres = () => {
  return (
    <section className="bg-[#1C2D5A] text-white py-16 px-4 md:px-16">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center tracking-wide drop-shadow-lg">
          ESCUELA DE PADRE
        </h2>
        <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-center text-blue-100">
          Es un espacio donde el colegio orienta a las familias para apoyar la formación y el desarrollo integral de sus hijos.
        </p>

        <div className="flex flex-col md:flex-row gap-8 mb-10 justify-center items-center">
          {[padres1, padres2].map((img, idx) => (
        <div
          key={idx}
          className="overflow-hidden rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105 hover:shadow-blue-400/40 w-full md:w-[70%]"
        // ...existing code...
        >
          <img
            src={img}
            alt={`Escuela de padres ${idx + 1}`}
            className="w-full h-180 object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-blue-400/40 text-lg tracking-wide transform hover:-translate-y-1">
            LEER MÁS →
          </button>
        </div>
      </div>
    </section>
  );
};

export default SeccionPadres;