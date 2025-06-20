import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhone,
  FaBook,
  FaQuestionCircle,
  FaShieldAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-[#003049] text-white px-6 md:px-16 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* IZQUIERDA: PRISMA y descripción */}
        <div>
          <h2 className="text-3xl font-bold mb-2">PRISMA</h2>
          <p className="text-sm text-gray-200">
            Comprometidos con la formación de líderes del mañana a través de la
            excelencia educativa, valores y tecnología.
          </p>
        </div>

        {/* CENTRO: Redes Sociales */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-bold mb-4">Síguenos</h3>
          <div className="flex space-x-5 text-2xl">
            <a href="https://web.facebook.com/Prisma.Chincha">
              <FaFacebook />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaTiktok />
            </a>
          </div>
        </div>

        {/* DERECHA: Recursos y contacto */}
        <div className="text-sm space-y-3">
          <h3 className="text-lg font-bold mb-2">Recursos y contacto</h3>

          <div className="flex items-center space-x-2">
            <FaPhone />
            <span>Teléfono: +51 123-456-789</span>
          </div>

          <Link
            to="/PreguntasFrecuentes"
            className="flex items-center gap-1 text-white hover:underline"
          >
            Preguntas frecuentes
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>

          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt />
            <a
              href="https://www.google.com.pe/maps/@-13.4176273,-76.1279866,18.25z?entry=ttu"
              className="hover:underline"
            >
              Ubicación
            </a>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="mt-10 pt-6 border-t border-white/20 text-center">
        <p className="text-sm">
          © 2025 Colegio Prisma. Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};
