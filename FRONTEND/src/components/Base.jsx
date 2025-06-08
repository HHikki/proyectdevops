import { useEffect } from "react";
import { BookOpen, ClipboardCheck, Flag } from "lucide-react";

const pillars = [
  {
    title: "ESTUDIO",
    description:
      "El estudio es la base del conocimiento y el camino hacia el crecimiento personal. Fomenta la curiosidad, el pensamiento crítico y la preparación para enfrentar los desafíos del mañana.",
    icon: <BookOpen className="w-7 h-7 text-red-600" />,
    bgFrom: "#003049",
    bgTo: "#234870",
    text: "text-white",
  },
  {
    title: "DISCIPLINA",
    description:
      "La disciplina es el puente entre las metas y los logros. Forma hábitos positivos, fortalece la voluntad y guía el comportamiento hacia la excelencia académica y personal.",
    icon: <ClipboardCheck className="w-7 h-7 text-[#003049]" />,
    bgFrom: "#780000",
    bgTo: "#a5123b",
    text: "text-white",
  },
  {
    title: "SUPERACIÓN",
    description:
      "La superación es el motor del progreso. Impulsa a los estudiantes a dar siempre lo mejor de sí mismos, superar obstáculos y alcanzar nuevas metas con determinación.",
    icon: <Flag className="w-7 h-7 text-red-600" />,
    bgFrom: "#003049",
    bgTo: "#234870",
    text: "text-white",
  },
];

export default function EducationalPillars() {
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
      .pillar-card {
        transition:
          box-shadow 0.17s cubic-bezier(.45,1.4,.46,1.1),
          transform 0.18s cubic-bezier(.43,1.2,.5,1.08),
          border-radius 0.13s cubic-bezier(.43,1.2,.5,1.08),
          z-index 0s;
        will-change: transform, box-shadow, border-radius, z-index;
        min-height: 370px; /* Fija la altura mínima, ajusta si quieres */
        /* overflow: visible; */
      }
      .pillar-card:hover {
        box-shadow: 0 24px 54px 0 #0030495c, 0 4px 18px #7800001a;
        transform: scale(1.08) translateY(-7px);
        border-radius: 1.5rem;
        z-index: 20 !important;
      }
      .corner {
        transition: all 0.17s cubic-bezier(.45,1.7,.46,1.08);
      }
      .pillar-card:hover .corner {
        width: 20px !important;
        height: 20px !important;
        background-color: #f3b899 !important;
        filter: brightness(1.08);
      }
      .icon-bounce {
        transition: box-shadow 0.14s, filter 0.14s, transform 0.13s;
      }
      .pillar-card:hover .icon-bounce {
        box-shadow: 0 0 14px 0 #fff7, 0 0 8px #2dd4fbaa;
        filter: brightness(1.14) drop-shadow(0 0 4px #fff5);
        transform: scale(1.10) translateY(-5px);
        animation: bounce 0.22s;
      }
      @keyframes bounce {
        0%   { transform: scale(1) translateY(0);}
        40%  { transform: scale(1.10,0.96) translateY(-9px);}
        65%  { transform: scale(0.99,1.03) translateY(3px);}
        85%  { transform: scale(1.06,0.99) translateY(-2px);}
        100% { transform: scale(1.10) translateY(-5px);}
      }
      /* Solo el texto de la tarjeta hover crece un poco, no gigante */
      .pillar-card .pillar-title,
      .pillar-card .pillar-desc {
        transition: font-size 0.19s cubic-bezier(.47,1.5,.5,1.08), color 0.13s;
      }
      .pillar-card:hover .pillar-title {
        font-size: 1.22rem !important;
        letter-spacing: 0.01em;
      }
      .pillar-card:hover .pillar-desc {
        font-size: 1.01rem !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <section className="relative w-full py-10 text-center">
      <div className="absolute inset-0 bg-gray-50 -z-20" />
      <div className="absolute inset-y-0 left-0 w-24 md:w-80 bg-[#f0e4d0] -z-10" />

      <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[#003049]">
        NUESTROS PILARES EDUCATIVOS
      </h2>
      <p className="text-sm md:text-base text-[#003049] mb-8">
        Educamos con propósito, valores y excelencia.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-10 px-4 overflow-visible">
        {pillars.map((pillar, index) => (
          <div
            key={index}
            className={`pillar-card relative p-10 md:p-12 flex flex-col items-center gap-6 transition-all ${pillar.text}`}
            style={{
              background: `linear-gradient(135deg, ${pillar.bgFrom} 80%, ${pillar.bgTo} 100%)`,
              borderRadius: "1.2rem",
              zIndex: 1,
              boxShadow: "0 4px 20px #00304918",
            }}
          >
            {/* Esquinas decorativas animadas */}
            <div className="corner absolute top-0 right-0 w-4 h-4 bg-[#f0e4d0]" />
            <div className="corner absolute bottom-0 left-0 w-4 h-4 bg-[#f0e4d0]" />

            {/* Icono animado */}
            <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center shadow-md mb-2 icon-bounce transition-all text-center">
              {pillar.icon}
            </div>

            <h3 className="pillar-title text-2xl font-bold tracking-wide mb-1">{pillar.title}</h3>
            <p className="pillar-desc text-base leading-relaxed">{pillar.description}</p>
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
  );
}
