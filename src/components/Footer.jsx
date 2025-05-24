import React from "react";
import { FaTiktok, FaWhatsapp } from "react-icons/fa";
import { FaFacebook, FaInstagram } from "react-icons/fa6";

export const Footer = () => {
  return (
    <div>
      <footer className="bg-blue-900 px-4 md:px-16 lg:px-8 text-white py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* libro de reclamos */}
          <div>
            <a href="#" className="text-lg font-bold mb-4">
              Libro de reclamaciones
            </a>
          </div>

          {/* iconos */}
          <div className="">
            <h2 className="text-lg font-bold mb-4">
              Siguenos en nuestras redes sociales
            </h2>
            <div>
              <ul className="flex space-x-4">
                <li>
                  <FaFacebook />
                  <a href="#" className="text-white font-bold">
                    Facebook
                  </a>
                </li>

                <li>
                  <FaInstagram />
                  <a href="#" className="text-white font-bold">
                    Instagram
                  </a>
                </li>

                <li>
                  <FaTiktok />
                  <a href="" className="text-white font-bold">
                    Tiktok
                  </a>
                </li>

                <li>
                  <FaWhatsapp />
                  <a href="" className="text-white font-bold">
                    Whatsapp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* contacto */}
          <div className="">
            <h2 className="text-lg font-bold mb-4">Contacto</h2>
            <p className="text-white">Teléfono: +51 123-456-789</p>
            <p className="text-white">
              Email: <a href="mailto:prisma@google.com">prisma@google.com</a>
            </p>
          </div>
        </div>
        <div className="text-center py-4 border-t border-blue-500 mt-8">
          <p className="text-white">© 2025 Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
};
