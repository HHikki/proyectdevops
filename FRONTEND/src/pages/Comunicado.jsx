import React from "react";
import Crush from "../components/Crush";
import pict from "../assets/eventos.png";
import { FiBook } from "react-icons/fi";
import { Footer } from "../components/Footer";
import Calendar from "../components/Calendar";
const Comunicado = () => {
  return (
    <div>
      <Crush pict={pict} />
      <section className="bg-[#445da7] text-white py-20 px-4 sm:px-8 lg:px-24">
        <h2 className="text-3xl md:text-4xl font-bold text-left mb-12 tracking-wide">
          PROXIMOS EVENTOS
        </h2>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* EVENTOS */}
          <div
            key={1}
            className="bg-white/90 text-black rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group flex flex-col h-full"
          >
            <div className="overflow-hidden">
              <img
                src={pict}
                alt="evento"
                className="w-full h-52 md:h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between p-4 text-center">
              <div>
                <h3 className="font-bold text-lg mb-1">Dia de la madre</h3>
                <p className="text-gray-500 text-xs tracking-widest mb-1">
                  FECHA 11/05/25 | Plantel intitucional
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#26335D] text-white py-20 px-4 sm:px-8 lg:px-24">
        <h2 className="text-3xl md:text-4xl font-bold text-left mb-12 tracking-wide">
          Comunicados
        </h2>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* EVENTOS */}
          <div
            key={1}
            className="bg-white/90 text-black rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group flex flex-col h-full"
          >
            <div className="overflow-hidden">
              <img
                src={pict}
                alt="evento"
                className="w-full h-52 md:h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between p-4 text-center">
              <div>
                <h3 className="font-bold text-lg mb-1">Dia de la madre</h3>
                <p className="text-gray-500 text-xs tracking-widest mb-1">
                  FECHA 11/05/25 | Plantel intitucional
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#445da7] text-white py-20 px-4 sm:px-8 lg:px-24">
        <h2 className="text-3xl md:text-4xl font-bold text-left mb-12 tracking-wide">
          NORMAS INSTITUCIONALES
        </h2>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* NORMAS */}
          <a
            href="https://www.trilcelm.edu.pe/lamolina/doc/reglamento_interno.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black p-6 rounded-2xl shadow-lg w-full max-w-sm mx-auto transition transform hover:scale-105 cursor-pointer block"
          >
            <div className="flex flex-col items-center">
              <div>
                <FiBook />
              </div>
              <h3 className="text-md font-bold mb-2">Normas</h3>
              <p className="text-sm text-center">
                Aqui estan las regla para los estudiantes
              </p>
            </div>
          </a>
          <a
            href="https://www.trilcelm.edu.pe/lamolina/doc/reglamento_interno.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black p-6 rounded-2xl shadow-lg w-full max-w-sm mx-auto transition transform hover:scale-105 cursor-pointer block"
          >
            <div className="flex flex-col items-center">
              <div>
                <FiBook />
              </div>
              <h3 className="text-md font-bold mb-2">Normas</h3>
              <p className="text-sm text-center">
                Aqui estan las regla para los estudiantes
              </p>
            </div>
          </a>
        </div>
      </section>
      {/* Calendario */}
      <div>
        <Calendar />
      </div>
      <Footer />
    </div>
  );
};

export default Comunicado;
