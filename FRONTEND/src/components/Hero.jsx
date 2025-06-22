import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Typewriter from "typewriter-effect";
import logo from "../assets/prisma_logo.jpg";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaPlay,
  FaTimes,
} from "react-icons/fa";



const Hero = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showModal]);

  return (
    <div className="overflow-x-hidden">
      <div className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-start bg-gradient-to-br from-[#003049] via-[#fdf0d5] to-[#780000] ">
        {/* Imagen de fondo desenfocada */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-85 blur-[2px] z-0"
          style={{ backgroundImage: `url(${logo})` }}
        ></div>

        {/* Degradado rojo suave */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(to right,rgb(180, 53, 53), rgba(0,0,0,0.4), transparent)",
          }}
        />

        {/* Contenido principal */}
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

          {/* Botón Tour Virtual */}
          <div className="mt-8" data-aos="fade-up" data-aos-delay="500">
            <button
              onClick={openModal}
              className="group px-8 py-4 bg-[#003049] hover:bg-[#004066] text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-slow"
            >
              <span className="flex items-center justify-center gap-3">
                <FaPlay className="text-lg group-hover:scale-110 transition-transform duration-200" />
                Tour Virtual
              </span>
            </button>
          </div>
        </div>

        {/* Caja de datos */}
        <div
          className="absolute bottom-20 right-6 z-10 animate-bounce-slow"
          data-aos="fade-left"
        >
          <div className="bg-[#003049] text-white px-6 py-6 rounded-2xl shadow-2xl hover:shadow-3xl w-fit max-w-xs space-y-3 text-base md:text-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 group">
              <FaMapMarkerAlt className="text-xl group-hover:scale-110 transition-transform duration-200" />
              <span className="font-semibold">
                El Edén, Provincia de Chincha
              </span>
            </div>
            <div className="flex items-center gap-3 group">
              <FaPhoneAlt className="text-xl group-hover:scale-110 transition-transform duration-200" />
              <span className="font-semibold">(056) 260671</span>
            </div>
          </div>
        </div>

        {/* Botón WhatsApp */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative group">
            <a
              href="https://wa.me/51956260671"
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white rounded-full p-4 shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 animate-pulse hover:animate-none"
            >
              <FaWhatsapp className="text-3xl group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-xs font-bold">!</span>
              </div>
              <div className="absolute inset-0 rounded-full bg-green-400 opacity-30 animate-ping"></div>
            </a>
            <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg">
              ¡Chatea con nosotros!
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal del Tour Virtual */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-fadeIn">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-center text-gray-800">
                Tour Virtual - Colegio Prisma
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 group"
              >
                <FaTimes className="text-xl text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
              </button>
            </div>
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/bwetv-77C2I?autoplay=1&rel=0&modestbranding=1"
                title="Tour Virtual Colegio Prisma"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4 bg-gray-50 text-center">
              <p className="text-gray-600">
                ¿Te gusta lo que ves?{" "}
                <span className="font-semibold text-[#003049]">
                  ¡Contáctanos para más información!
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Animaciones personalizadas */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Hero;
