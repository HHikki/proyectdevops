// src/components/Level.jsx
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ModalForm from "./ModalForm";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

/* —— data —— */
const levels = [
  {
    name: "INICIAL",
    description:
      "Educación inicial para los más pequeños, basada en el juego y el descubrimiento. Promovemos el desarrollo emocional, social y cognitivo en un ambiente seguro y afectuoso.",
  },
  {
    name: "PRIMARIA",
    description:
      "Formación integral con enfoque en valores, ciencias y desarrollo emocional. En esta etapa fortalecemos las habilidades de lectura, escritura, lógica matemática y comprensión del entorno.",
  },
  {
    name: "SECUNDARIA",
    description:
      "Preparación académica sólida para afrontar los retos del futuro con éxito. Se consolidan las competencias académicas, científicas y tecnológicas.",
  },
];

const bannerImages = [banner1, banner2, banner3];

export default function Level() {
  /* —— state —— */
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");

  /* —— efectos —— */
  useEffect(() => {
    AOS.init({ duration: 1000, offset: 100 });
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setCurrent((prev) => (prev + 1) % bannerImages.length),
      3000
    );
    return () => clearInterval(id);
  }, []);

  /* —— helpers —— */
  const openModal = (name) => {
    setSelectedLevel(name);
    setModalOpen(true);
  };

  /* —— render —— */
  return (
    <>
      <section className="flex flex-col md:flex-row w-full min-h-[600px]">
        {/* ——— Banner ——— */}
        <div
          className="w-full md:w-2/5 flex items-center justify-center py-8 bg-[#6698BC]"
          data-aos="zoom-in"
        >
          <img
            src={bannerImages[current]}
            alt={`Banner ${current + 1}`}
            className="
              w-4/5 sm:w-[420px] lg:w-[500px] h-auto
              object-cover rounded-xl shadow
              transition-opacity duration-700
            "
          />
        </div>

        {/* ——— Tarjetas ——— */}
        <div
          className="
            w-full md:w-3/5 bg-gray-50
            flex flex-col gap-6 sm:gap-8
            p-6 sm:p-8 lg:p-10
          "
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <h2
            className="text-2xl md:text-4xl font-bold text-[#003049]"
            data-aos="fade-up"
          >
            NUESTROS NIVELES EDUCATIVOS
          </h2>

          {levels.map((lvl, i) => (
            <div
              key={lvl.name}
              className={`
                group relative w-full
                sm:max-w-lg md:max-w-xl
                bg-[#003049] text-white
                px-5 py-6 sm:px-6 sm:py-7
                rounded-xl shadow-md
                flex flex-col
                transition-all duration-300
                hover:scale-105 hover:-translate-y-2 hover:shadow-2xl
                ${i === 1 ? "md:ml-8" : i === 2 ? "md:ml-16" : ""}
              `}
              data-aos="fade-up"
              data-aos-delay={400 + i * 150}
            >
              <h3 className="text-lg sm:text-xl font-bold mb-3">{lvl.name}</h3>

              <p className="text-sm sm:text-base leading-relaxed mb-6">
                {lvl.description}
              </p>

              <button
                className="
                  self-start sm:self-center
                  bg-[#780000] px-5 py-2 rounded-lg font-semibold
                  transition-colors duration-300
                  hover:bg-[#a5123b] hover:shadow-md
                "
                onClick={() => openModal(lvl.name)}
              >
                ÚNETE
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* —— Modal —— */}
      <ModalForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        level={selectedLevel}
      />
    </>
  );
}
