import React, { useEffect, useState } from "react";

/* ➊ Niveles que se mostrarán como rectángulos horizontales */
const levels = [
  {
    name: "INICIAL",
    description:
      "Educación inicial para los más pequeños, basada en el juego y el descubrimiento. Promovemos el desarrollo emocional, social y cognitivo en un ambiente seguro y afectuoso. ",
  },
  {
    name: "PRIMARIA",
    description:
      "Formación integral con enfoque en valores, ciencias y desarrollo emocional. En esta etapa fortalecemos las habilidades de lectura, escritura, lógica matemática y comprensión del entorno. ",
  },
  {
    name: "SECUNDARIA",
    description:
      "Preparación académica sólida para afrontar los retos del futuro con éxito. Se consolidan las competencias académicas, científicas y tecnológicas, promoviendo el pensamiento crítico y la responsabilidad social.",
  },
];

/* ➋ Imágenes que rotan en la franja celeste */
const bannerImages = [
  "/src/assets/banner1.jpg",
  "/src/assets/banner2.jpg",
  "/src/assets/banner3.jpg",
];

export default function Level() {
  /* ➌ Índice de la imagen actual del slideshow */
  const [current, setCurrent] = useState(0);

  /* ➍ Cambia de imagen cada 3 s */
  useEffect(() => {
    const id = setInterval(
      () => setCurrent((prev) => (prev + 1) % bannerImages.length),
      3000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="flex flex-col md:flex-row w-full">
      {/* ───── Franja celeste con slideshow ───── */}
      <div
        className="w-full md:w-2/5 flex items-center justify-center py-8"
        style={{ backgroundColor: "#6698BC" }}
      >
        <img
          src={bannerImages[current]}
          alt={`Banner ${current + 1}`}
          className="w-[500px] h-[550px] object-cover rounded-xl shadow transition-opacity duration-700"
        />
      </div>

      {/* ───── Columna derecha con rectángulos ───── */}
      <div className="w-full md:w-3/5 bg-gray-50 flex flex-col items-start justify-start gap-8 p-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#003049] mb">
          NUESTROS NIVELES EDUCATIVOS
        </h2>

        {levels.map((level, index) => (
          <div
            key={level.name}
            className={`w-full max-w-2xl bg-[#003049]  text-white px-6 py-6 shadow rounded-md flex flex-col transition-all
      ${index === 1 ? "ml-16" : index === 2 ? "ml-32" : "ml-0"}
`}
          >
            <h3 className="text-xl font-bold mb-2">{level.name}</h3>

            <div className="flex flex-row items-center justify-between gap-4">
              <p className="text-base flex-1">{level.description}</p>
              <button className="bg-[#780000] text-white font-semibold px-4 py-2 rounded hover:bg-[#012836] transition">
                ÚNETE
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
