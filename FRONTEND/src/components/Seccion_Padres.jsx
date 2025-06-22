import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import padres1 from "../assets/Blog/padre1.png";
import padres2 from "../assets/Blog/padre2.png";
import padres3 from "../assets/Blog/padre3.png";
import padres4 from "../assets/Blog/padre4.png";

const InfoCard = ({ title, description }) => (
  <div
    className="relative flex flex-col items-center w-full sm:w-80 p-8 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-blue-100/30 hover:shadow-blue-500/30 hover:shadow-3xl transition-all duration-700 group hover:-translate-y-2"
    data-aos="zoom-in"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full p-5 shadow-xl group-hover:shadow-blue-500/50 transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
      <div className="text-white text-3xl group-hover:scale-125 transition-all duration-500 relative z-10">
        {title === "Nuestra Escuela" ? "🏫" : "🏅"}
      </div>
    </div>
    <h3 className="font-bold text-2xl text-gray-800 mt-14 mb-4 text-center tracking-wide group-hover:text-blue-700 transition-colors duration-500">
      {title}
    </h3>
    <p className="text-gray-600 text-base text-center leading-relaxed group-hover:text-gray-700 transition-colors duration-500 font-medium">
      {description}
    </p>
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
  </div>
);

const ImageCard = ({ src, alt }) => (
  <div
    className="relative w-52 h-40 overflow-hidden rounded-2xl shadow-2xl group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:rotate-1"
    data-aos="fade-up"
  >
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 filter group-hover:brightness-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-all duration-500"></div>
    <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="absolute inset-0 border-2 border-white/20 rounded-2xl group-hover:border-white/40 transition-all duration-500"></div>
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-500 shadow-xl">
        <svg
          className="w-6 h-6 text-blue-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  </div>
);

const SeccionPadres = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const cards = [
    {
      title: "Nuestra Escuela",
      description:
        "No es solo un lugar de aprendizaje, sino un espacio donde se forman tradiciones, valores y logros educativos que marcan la diferencia en cada familia.",
    },
    {
      title: "Reconocimientos",
      description:
        "Somos reconocidos por la excelencia en la formación integral y el acompañamiento personalizado a nuestras familias y comunidad educativa.",
    },
  ];

  return (
    <section
      className="relative py-20 px-4 md:px-12 min-h-screen flex items-center font-sans overflow-hidden"
      style={{ background: "#003049" }}
    >
      <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-start gap-16 relative z-10">
        {/* Izquierda */}
        <div className="flex-1 flex flex-col items-center lg:items-start">
          <h2
            className="text-5xl md:text-6xl font-black leading-tight text-center lg:text-left mb-6 tracking-tight text-white"
            data-aos="fade-up"
          >
            Bienvenidos a
            <span className="block mt-2 text-white">Escuela de Padres</span>
          </h2>

          <p
            className="text-xl md:text-2xl text-white max-w-2xl text-center lg:text-left mb-12 leading-relaxed font-medium"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            Creamos un espacio donde las familias y la escuela se unen para
            impulsar la formación y el desarrollo integral de sus hijos.
            <br />
            <span className="font-bold text-2xl block mt-3 text-white">
              ¡Juntos construimos el futuro!
            </span>
          </p>

          <div
            className="w-full flex flex-col sm:flex-row gap-10 justify-center lg:justify-start"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {cards.map((card, idx) => (
              <InfoCard
                key={idx}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </div>

        {/* Derecha */}
        <div
          className="w-full max-w-lg bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-3xl shadow-2xl p-10 flex flex-col items-center text-white relative overflow-hidden"
          data-aos="zoom-in-left"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-400/20 rounded-full blur-xl"></div>
          </div>

          <div className="relative z-10 text-center mb-8" data-aos="fade-up">
            <h3 className="text-3xl md:text-4xl font-bold tracking-wide mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Galería
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-6"></div>
            <p className="text-blue-100 text-lg text-center leading-relaxed font-medium">
              Descubre nuestras actividades y participa en la experiencia
              <span className="text-white font-semibold block mt-1">
                Escuela de Padres
              </span>
            </p>
          </div>

          <div className="flex flex-row gap-6 w-full justify-center items-center mb-10 relative z-10">
            <ImageCard src={padres1} alt="Actividad Escuela de Padres 1" />
            <ImageCard src={padres2} alt="Actividad Escuela de Padres 2" />
          </div>
          <div className="flex flex-row gap-6 w-full justify-center items-center mb-10 relative z-10">
            <ImageCard src={padres3} alt="Actividad Escuela de Padres 3" />
            <ImageCard src={padres4} alt="Actividad Escuela de Padres 4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeccionPadres;
