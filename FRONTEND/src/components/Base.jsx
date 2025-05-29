import { useEffect } from "react";
import { BookOpen, ClipboardCheck, Flag } from "lucide-react";

const pillars = [
  {
    title: "ESTUDIO",
    description:
      "El estudio es la base del conocimiento y el camino hacia el crecimiento personal. Fomenta la curiosidad, el pensamiento crítico y la preparación para enfrentar los desafíos del mañana.",
    icon: <BookOpen className="w-6 h-6 text-red-600" />,
    bg: "bg-[#003049] text-white",
  },
  {
    title: "DISCIPLINA",
    description:
      "La disciplina es el puente entre las metas y los logros. Forma hábitos positivos, fortalece la voluntad y guía el comportamiento hacia la excelencia académica y personal.",
    icon: <ClipboardCheck className="w-6 h-6 text-[#003049]" />,
    bg: "bg-[#780000] text-white",
  },
  {
    title: "SUPERACIÓN",
    description:
      "La superación es el motor del progreso. Impulsa a los estudiantes a dar siempre lo mejor de sí mismos, superar obstáculos y alcanzar nuevas metas con determinación.",
    icon: <Flag className="w-6 h-6 text-red-600" />,
    bg: "bg-[#003049] text-white",
  },
];

export default function EducationalPillars() {
  /* Inyectamos la animación marquee una sola vez */
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes marquee {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }
      .animate-marquee {
        display: inline-block;
        animation: marquee 20s linear infinite;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <>
      {/* ───── Sección de pilares con banda beige a la izquierda ───── */}

      <section className="relative w-full py-10 text-center">
        {/* Fondo gris detrás de todo */}
        <div className="absolute inset-0 bg-white -z-20" />

        {/* Banda vertical beige encima del gris */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-80 bg-[#f0e4d0] -z-10" />

        {/* Contenido principal */}
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[#003049]">
          NUESTROS PILARES EDUCATIVOS
        </h2>
        <p className="text-sm md:text-base text-[#003049] mb-8">
          Educamos con propósito, valores y excelencia.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-10 px-4">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className={`${pillar.bg} relative p-10 md:p-12 rounded-none shadow-lg flex flex-col items-start gap-6 transition hover:shadow-2xl`}
            >
              {/* Esquinas decorativas */}
              <div className="absolute top-0 right-0 w-4 h-4 bg-[#f0e4d0]"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 bg-[#f0e4d0]"></div>

              {/* Icono en círculo más grande */}
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                {pillar.icon}
              </div>

              {/* Título más grande */}
              <h3 className="text-xl font-bold">{pillar.title}</h3>

              {/* Descripción más clara */}
              <p className="text-base leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* Franja animada tipo marquee */}
        <div className="w-full bg-[#0F172A] overflow-hidden">
          <div className="animate-marquee whitespace-nowrap text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-red-500 to-blue-600 py-4">
            ESTUDIO · DISCIPLINA · SUPERACIÓN · ¡FUERZA PRISMA! · ESTUDIO ·
            DISCIPLINA · SUPERACIÓN · ¡FUERZA PRISMA! ·
          </div>
        </div>
      </section>
    </>
  );
}
