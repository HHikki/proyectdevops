import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ModalForm from "./ModalForm";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

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
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: "ease-out-cubic",
      offset: 100,
    });
    AOS.refresh();
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setCurrent((prev) => (prev + 1) % bannerImages.length),
      3000
    );
    return () => clearInterval(id);
  }, []);

  const openModal = (levelName) => {
    setSelectedLevel(levelName);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <>
      <section className="flex flex-col md:flex-row w-full min-h-[700px]">
        {/* Banner celeste */}
        <div
          className="w-full md:w-2/5 flex items-center justify-center py-8"
          style={{ backgroundColor: "#6698BC" }}
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <img
            src={bannerImages[current]}
            alt={`Banner ${current + 1}`}
            className="w-[500px] h-[550px] object-cover rounded-xl shadow transition-opacity duration-700"
          />
        </div>

        {/* Rectángulos de niveles */}
        <div
          className="w-full md:w-3/5 bg-gray-50 flex flex-col items-start justify-start gap-8 p-10"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <h2
            className="text-3xl md:text-4xl font-bold text-[#003049] mb-2"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            NUESTROS NIVELES EDUCATIVOS
          </h2>

          {levels.map((level, index) => (
            <div
              key={level.name}
              className={`w-full max-w-2xl bg-[#003049] text-white px-6 py-6 shadow rounded-xl flex flex-col transition-all
                ${index === 1 ? "ml-16" : index === 2 ? "ml-32" : "ml-0"}
              `}
              data-aos="fade-up"
              data-aos-delay={400 + index * 200}
            >
              <h3 className="text-xl font-bold mb-2">{level.name}</h3>
              <div className="flex flex-row items-center justify-between gap-4">
                <p className="text-base flex-1">{level.description}</p>
                <button
                  className="bg-[#780000] text-white font-semibold px-5 py-2 rounded hover:bg-[#a5123b] shadow transition text-lg animate-bounce"
                  onClick={() => openModal(level.name)}
                >
                  ÚNETE
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ModalForm open={modalOpen} onClose={closeModal} level={selectedLevel} />
    </>
  );
}
