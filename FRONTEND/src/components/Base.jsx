import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
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
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: "ease-out-cubic",
      offset: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <section className="relative w-full py-10 text-center">
      <div className="absolute inset-0 bg-gray-50 -z-20" />
      <div className="absolute inset-y-0 left-0 w-24 md:w-80 bg-[#f0e4d0] -z-10" />

      <h2
        className="text-3xl md:text-4xl font-bold mb-2 text-[#003049]"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        NUESTROS PILARES EDUCATIVOS
      </h2>
      <p
        className="text-sm md:text-base text-[#003049] mb-8"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        Educamos con propósito, valores y excelencia.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-10 px-4 overflow-visible">
        {pillars.map((pillar, index) => (
          <div
            key={index}
            className={`pillar-card relative p-10 md:p-12 flex flex-col items-center gap-6 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl ${pillar.text}`}
            style={{
              background: `linear-gradient(135deg, ${pillar.bgFrom} 80%, ${pillar.bgTo} 100%)`,
              borderRadius: "1.2rem",
              zIndex: 1,
              boxShadow: "0 4px 20px #00304918",
            }}
            data-aos={
              index === 0 ? "fade-left" : index === 1 ? "fade-up" : "fade-right"
            }
            data-aos-delay={index * 200}
          >
            <div className="corner absolute top-0 right-0 w-4 h-4 bg-[#f0e4d0]" />
            <div className="corner absolute bottom-0 left-0 w-4 h-4 bg-[#f0e4d0]" />
            <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center shadow-md mb-2 icon-bounce transition-all text-center">
              {pillar.icon}
            </div>
            <h3 className="pillar-title text-2xl font-bold tracking-wide mb-1">
              {pillar.title}
            </h3>
            <p className="pillar-desc text-base leading-relaxed">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>

      <div className="w-full bg-[#0F172A] overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-red-500 to-blue-600 py-4">
          ESTUDIO · DISCIPLINA · SUPERACIÓN · ¡FUERZA PRISMA! · ESTUDIO ·
          DISCIPLINA · SUPERACIÓN · ¡FUERZA PRISMA! ·
        </div>
      </div>
    </section>
  );
}
