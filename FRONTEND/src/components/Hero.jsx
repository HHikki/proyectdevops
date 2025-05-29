import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Typewriter from "typewriter-effect";
import { FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-start"
      style={{ backgroundImage: 'url("/src/assets/prisma_logo.jpg")' }}
    >
      {/* 🎨 Degradado rojo suave */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to right, #b22222, rgba(0,0,0,0.4), transparent)",
        }}
      />

      {/* 🧠 Contenido principal */}
      <div
        className="relative z-10 pl-6 pr-6 md:pl-24 md:pr-12 max-w-3xl text-left"
        data-aos="fade-up"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg text-white">
          Bienvenidos al Colegio Prisma
        </h1>

        <div className="mt-4 text-lg sm:text-xl font-medium drop-shadow text-white h-8">
          <Typewriter
            options={{
              strings: [
                "Formando líderes del mañana.",
                "Educando con pasión y propósito.",
                "Disciplina, valores y excelencia.",
                "Comprometidos con tu futuro.",
              ],
              autoStart: true,
              loop: true,
              delay: 60,
              deleteSpeed: 30,
              pauseFor: 2000,
            }}
          />
        </div>
      </div>

      {/* 📦 Caja azul con datos */}
      <div className="absolute bottom-6 right-6 z-10" data-aos="fade-left">
        <div className="bg-[#003049] text-white px-6 py-4 rounded-2xl shadow-2xl w-fit max-w-xs space-y-3 text-base md:text-lg">
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-xl" />
            <span className="font-semibold">El Edén, Provincia de Chincha</span>
          </div>
          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-xl" />
            <span className="font-semibold">(056) 260671</span>
          </div>
        </div>
      </div>

      {/* ✅ Botón flotante de WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/51987654321"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
        >
          <FaWhatsapp className="text-3xl" />
        </a>
      </div>
    </div>
  );
};

export default Hero;
