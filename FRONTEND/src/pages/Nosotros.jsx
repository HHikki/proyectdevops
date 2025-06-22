import React, { useEffect, useState, useRef } from "react";
import Button_A from "../components/Button_A";
import img_map from "../assets/foto_map.png";
import { Footer } from "../components/Footer";
import {
  FaGraduationCap,
  FaTrophy,
  FaUsers,
  FaHistory,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaEye,
  FaBuilding,
  FaRocket,
  FaMapMarkerAlt,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import galeria1 from "../assets/galeria1.jpg";
import galeria2 from "../assets/galeria2.jpg";
import galeria3 from "../assets/galeria3.jpg";
import galeria4 from "../assets/galeria4.jpg";
import galeria5 from "../assets/galeria5.jpg";
import Image1 from "../assets/directivo1.png";
import Image2 from "../assets/directivo2.png";
import Image3 from "../assets/directivo3.png";
import Image4 from "../assets/directivo4.png";

const imagenesGaleria = [galeria1, galeria2, galeria3, galeria4, galeria5];

// CarruselCintaMultiple (optimized & responsive)
const CarruselCintaMultiple = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timeoutRef = useRef(null);

  // Responsive: cambia cantidad de imágenes según ancho
  const [imagenesPorVista, setImagenesPorVista] = useState(3);

  useEffect(() => {
    const updateImagenesPorVista = () => {
      if (window.innerWidth < 640) setImagenesPorVista(1);
      else if (window.innerWidth < 1024) setImagenesPorVista(2);
      else setImagenesPorVista(3);
    };
    updateImagenesPorVista();
    window.addEventListener("resize", updateImagenesPorVista);
    return () => window.removeEventListener("resize", updateImagenesPorVista);
  }, []);

  const maxIndex = imagenesGaleria.length - imagenesPorVista;

  useEffect(() => {
    if (isPlaying) {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex >= maxIndex ? 0 : prevIndex + 1
        );
      }, 4000);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, isPlaying, maxIndex]);

  const nextSlide = () => {
    clearTimeout(timeoutRef.current);
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    clearTimeout(timeoutRef.current);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };

  const togglePlayPause = () => setIsPlaying(!isPlaying);

  return (
    <div
      className="w-full max-w-7xl mx-auto"
      data-aos="fade-in"
      data-aos-delay="200"
    >
      <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800">
        <div
          className="flex transition-transform ease-out duration-700"
          style={{
            transform: `translateX(-${
              currentIndex * (100 / imagenesPorVista)
            }%)`,
          }}
        >
          {imagenesGaleria.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-2 relative group"
              style={{ width: `${100 / imagenesPorVista}%` }}
            >
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={img}
                  alt={`Galería imagen ${i + 1}`}
                  className="w-full h-44 sm:h-60 md:h-72 lg:h-80 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-2 text-sm">
                    <FaEye className="text-blue-400" />
                    <span>Momento especial {i + 1}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-between p-2 sm:p-6">
          <button
            onClick={prevSlide}
            className="p-2 sm:p-3 bg-white/10 text-white rounded-full shadow-xl hover:bg-white/20 border border-white/20"
            aria-label="Slide anterior"
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 sm:p-3 bg-white/10 text-white rounded-full shadow-xl hover:bg-white/20 border border-white/20"
            aria-label="Siguiente slide"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
        <div className="absolute top-4 right-4">
          <button
            onClick={togglePlayPause}
            className="p-2 bg-white/10 text-white rounded-full shadow-lg hover:bg-white/20 border border-white/20"
            aria-label={isPlaying ? "Pausar carrusel" : "Reproducir carrusel"}
          >
            {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
          </button>
        </div>
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              className={`h-2 transition-all duration-300 rounded-full ${
                i === currentIndex
                  ? "w-8 bg-white shadow-lg"
                  : "w-2 bg-white/50 hover:bg-white/70 hover:w-4"
              }`}
              onClick={() => {
                clearTimeout(timeoutRef.current);
                setCurrentIndex(i);
              }}
              aria-label={`Ir al slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// EstadisticasAnimadas (optimized)
const EstadisticasAnimadas = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    students: 0,
    teachers: 0,
    years: 0,
    awards: 0,
  });

  useEffect(() => {
    if (!isVisible) return;

    const targets = { students: 400, teachers: 40, years: 10, awards: 10 };
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    const timer = setInterval(() => {
      setCounts((prev) => ({
        students: Math.min(
          prev.students + Math.ceil(targets.students / steps),
          targets.students
        ),
        teachers: Math.min(
          prev.teachers + Math.ceil(targets.teachers / steps),
          targets.teachers
        ),
        years: Math.min(
          prev.years + Math.ceil(targets.years / steps),
          targets.years
        ),
        awards: Math.min(
          prev.awards + Math.ceil(targets.awards / steps),
          targets.awards
        ),
      }));
    }, increment);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 py-8"
      ref={(el) => {
        if (el && !isVisible) {
          const observer = new window.IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.5 }
          );
          observer.observe(el);
          return () => observer.disconnect();
        }
      }}
      data-aos="fade-up"
      data-aos-delay="100"
    >
      {[
        { icon: FaUsers, count: counts.students, label: "Estudiantes" },
        { icon: FaGraduationCap, count: counts.teachers, label: "Docentes" },
        { icon: FaHistory, count: counts.years, label: "Años de Experiencia" },
        { icon: FaTrophy, count: counts.awards, label: "Reconocimientos" },
      ].map((stat, index) => (
        <div
          key={index}
          className="text-center group rounded-xl shadow-xl p-4 sm:p-8 bg-[#780000]"
        >
          <div className="text-3xl sm:text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 text-white">
            <stat.icon className="mx-auto" />
          </div>
          <div className="text-2xl sm:text-4xl font-bold text-white mb-2 group-hover:text-[#e24585] transition-colors duration-300">
            {stat.count}+
          </div>
          <div className="text-white font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

const Nosotros = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: "ease-out-cubic",
      offset: 100,
    });
    AOS.refresh();
    return () => AOS.refresh();
  }, []);

  const valoresV = [
    {
      año: "Fundación",
      evento:
        "Nuestra institución nació con el sueño de transformar vidas a través de la educación de calidad, estableciendo los cimientos de lo que hoy es una comunidad educativa sólida y comprometida con la excelencia académica.",
      icono: <FaBuilding className="text-yellow-400 text-3xl" />,
      color: "from-blue-600 to-purple-600",
    },
    {
      año: "Misión",
      evento:
        "Formar estudiantes íntegros, competentes y conscientes de su responsabilidad social, brindándoles herramientas académicas y valores humanos que les permitan contribuir positivamente al desarrollo de nuestra sociedad.",
      icono: <FaGraduationCap className="text-green-400 text-3xl" />,
      color: "from-green-600 to-teal-600",
    },
    {
      año: "Visión",
      evento:
        "Ser reconocidos como una institución educativa líder e innovadora, que inspire el amor por el aprendizaje y forme ciudadanos capaces de enfrentar los desafíos del futuro con creatividad, ética y liderazgo.",
      icono: <FaRocket className="text-purple-400 text-3xl" />,
      color: "from-purple-600 to-pink-600",
    },
  ];

  const directivos = [
    {
      nombre: "Evellyng Limaylla",
      cargo: "DIRECTORA GENERAL",
      descripcion: "Líder visionaria con 20 años de experiencia",
      imagen: Image1,
    },
    {
      nombre: "Julian Jameson",
      cargo: "SUBDIRECTOR ACADÉMICO",
      descripcion: "Especialista en innovación educativa",
      imagen: Image2,
    },
    {
      nombre: "Juan Lhi",
      cargo: "COORDINADOR ESTUDIANTIL",
      descripcion: "Comprometido con el bienestar estudiantil",
      imagen: Image3,
    },
    {
      nombre: "Roxana Median",
      cargo: "PSICÓLOGA EDUCATIVA",
      descripcion: "Experta en desarrollo integral",
      imagen: Image4,
    },
  ];

  return (
    <div data-aos="fade-in" data-aos-duration="1200">
      {/* HERO SECTION */}
      <div
        className="relative w-full h-screen bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${img_map})` }}
        data-aos="fade-in"
        data-aos-duration="1000"
      >
        {/* Estilos para las lucecitas */}
        <style>
          {`
            @keyframes glow {
              0%, 100% { box-shadow: 0 0 8px #fff, 0 0 24px #80caff, 0 0 40px #fff3, 0 0 60px #33d9ff66; }
              50% { box-shadow: 0 0 24px #fff, 0 0 48px #33d9ff, 0 0 80px #fff, 0 0 100px #fff3; }
            }
            .glow-light {
              position: absolute;
              border-radius: 50%;
              width: 12px;
              height: 12px;
              opacity: 0.8;
              background: #fff;
              animation: glow 2s ease-in-out infinite;
              pointer-events: none;
              z-index: 5;
            }
          `}
        </style>
        {/* Puntitos luminiscentes */}
        <div className="absolute inset-0">
          <div className="glow-light" style={{ top: "15%", left: "20%" }} />
          <div className="glow-light" style={{ top: "35%", left: "60%" }} />
          <div className="glow-light" style={{ top: "25%", left: "75%" }} />
          <div className="glow-light" style={{ top: "55%", left: "40%" }} />
          <div className="glow-light" style={{ top: "45%", left: "85%" }} />
        </div>

        {/* Degradado oscuro */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent z-0" />
        {/* Texto alineado izquierda */}
        <div className="relative z-10 max-w-2xl px-8 lg:px-16">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold">
            Ven conócenos
          </h1>
        </div>
      </div>

      {/* ESTADÍSTICAS EN LA PARTE SUPERIOR */}
      <div
        className="bg-[#f0f8ff] py-8 sm:py-12 md:py-16 lg:py-24"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12">
          <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-[#780000]">
            Nuestra Comunidad en Números
          </h2>
          <div className="w-24 md:w-40 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mb-8 rounded-full"></div>
          <EstadisticasAnimadas />
        </div>
      </div>

      {/* HISTORIA / VALORES */}
      <div
        className="min-h-[60vh] py-12 sm:py-16 md:py-20 bg-[#003049]"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
          <div className="text-center mb-10 md:mb-16">
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6 leading-tight text-white">
              Nuestra Historia, <br />
              <span className="text-[#6698BC]">Identidad y Visión</span>
            </h1>
            <div className="h-2 w-20 md:w-32 mx-auto rounded-full mb-4 md:mb-6 bg-[#6698BC]"></div>
            <p className="text-base sm:text-lg max-w-3xl mx-auto leading-relaxed text-white">
              Conoce los pilares fundamentales que han guiado nuestro camino
              hacia la excelencia educativa a lo largo de los años
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-6xl">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 rounded-full shadow-lg bg-[#6698BC]"></div>
            {valoresV.map((valor, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center mb-10 md:mb-16 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
                data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
                data-aos-delay={index * 200}
              >
                <div
                  className={`w-full md:w-5/12 ${
                    index % 2 === 0
                      ? "md:text-right md:pr-8"
                      : "md:text-left md:pl-8"
                  } mb-6 md:mb-0`}
                >
                  <div className="rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/10 bg-[#6698BC]">
                    <div className="flex items-center gap-4 mb-6 justify-between">
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#003049]">
                        {valor.año}
                      </h3>
                      <div className="p-3 rounded-xl bg-[#003049]">
                        {valor.icono}
                      </div>
                    </div>
                    <div className="h-px w-full mb-6 bg-[#003049]"></div>
                    <p className="leading-relaxed text-base sm:text-lg text-[#003049]">
                      {valor.evento}
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center z-20 mb-6 md:mb-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl border-4 bg-[#6698BC] border-[#003049]">
                    <span className="font-bold text-base sm:text-lg text-[#003049]">
                      {index + 1}
                    </span>
                  </div>
                </div>
                <div className="w-full md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DIRECTIVOS */}
      <div
        className="relative w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${img_map})` }}
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <div className="absolute inset-0 bg-[#f0e4d0]/90"></div>
        <div className="relative z-10 py-10 sm:py-16 md:py-24 min-h-[50vh] flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#003049] mb-4 md:mb-6">
                Nuestro{" "}
                <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                  Equipo Directivo
                </span>
              </h2>
              <div className="h-2 w-20 md:w-32 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mb-6 md:mb-8 rounded-full"></div>
              <p className="text-[#003049] text-base sm:text-xl max-w-3xl mx-auto leading-relaxed">
                Conoce a los profesionales dedicados que lideran nuestra
                institución con pasión, experiencia y compromiso hacia la
                excelencia educativa
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {directivos.map((item, i) => (
                <div
                  key={i}
                  className="group relative bg-[#003049] rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-white/20"
                  data-aos="flip-up"
                  data-aos-delay={i * 150}
                >
                  <div className="relative h-48 sm:h-64 overflow-hidden">
                    <img
                      src={item.imagen}
                      alt={`Foto de ${item.nombre}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 flex items-end p-2 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="text-white">
                        <p className="text-xs sm:text-sm mb-1">
                          {item.descripcion}
                        </p>
                        <div className="flex gap-1 items-center">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-xs text-gray-300">
                            Disponible
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 text-center">
                    <h3 className="text-white text-lg sm:text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                      {item.nombre}
                    </h3>
                    <p className="text-gray-300 text-xs uppercase tracking-wide font-medium">
                      {item.cargo}
                    </p>
                    <div className="mt-3 w-full h-1 bg-gradient-to-r from-red-500 to-red-700 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* GALERÍA */}
      <div
        className="bg-gradient-to-br from-gray-50 to-blue-50 py-10 sm:py-16 md:py-20"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
          <div className="text-center mb-10 md:mb-16">
            <h1 className="text-gray-800 font-bold text-3xl sm:text-5xl md:text-6xl mb-4 md:mb-6 leading-tight">
              Únete al Equipo <br />
              <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                Ganador
              </span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Estos son algunos de los momentos más especiales que hemos vivido
              en nuestra institución educativa
            </p>
          </div>
          <CarruselCintaMultiple />
        </div>
      </div>

      {/* VIDEO */}
      <div
        className="py-12 sm:py-16 md:py-24 bg-[#6698BC]"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-block bg-gradient-to-r from-[#a5123b] to-[#e24585] rounded-2xl p-4 sm:p-8 shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl mb-6 sm:mb-8">
              <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2">
                <FaPlay className="text-xl" />
                Himno Institucional
              </h2>
            </div>
            <p className="text-white text-base sm:text-lg max-w-2xl mx-auto">
              Escucha nuestro himno institucional que representa los valores y
              el espíritu de nuestra comunidad educativa
            </p>
          </div>
          <div
            className="relative w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#c2e9f9]/20 to-[#663399]/20 z-10 pointer-events-none"></div>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/KZJvRU4JJak"
              title="Himno Institucional"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Nosotros;
