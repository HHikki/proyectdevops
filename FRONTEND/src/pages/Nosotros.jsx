import React, { useEffect, useState, useRef } from "react";
import Button_A from "../components/Button_A";
import img_map from "../assets/foto_map.png";
import { Footer } from "../components/Footer";
import {
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaGraduationCap,
  FaAward,
  FaBookReader,
  FaHistory,
  FaRegLightbulb,
  FaStar,
  FaBuilding,
  FaTrophy,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaEye,
  FaHeart,
  FaUsers,
  FaRocket,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import DIR1 from "../assets/foto_random.jpg";
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

// Componente de Carrusel Mejorado con Efectos Modernos
const CarruselCintaMultiple = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredImage, setHoveredImage] = useState(null);
  const timeoutRef = useRef(null);

  const imagenesPorVista = 3;
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
  }, [currentIndex, maxIndex, isPlaying]);

  const nextSlide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
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
              onMouseEnter={() => setHoveredImage(i)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={img}
                  alt={`Imagen ${i + 1}`}
                  className="w-full h-80 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-2 text-sm">
                    <FaEye className="text-blue-400" />
                    <span>Momento especial {i + 1}</span>
                  </div>
                </div>
                {hoveredImage === i && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 animate-pulse">
                      <FaHeart className="text-red-400 text-2xl" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Controles de navegación mejorados */}
        <div className="absolute inset-0 flex items-center justify-between p-6">
          <button
            onClick={prevSlide}
            className="p-3 bg-white/10 backdrop-blur-md text-white rounded-full shadow-xl hover:bg-white/20 hover:scale-110 transition-all duration-300 border border-white/20"
            aria-label="Anterior"
          >
            <FaChevronLeft size={20} />
          </button>

          <button
            onClick={nextSlide}
            className="p-3 bg-white/10 backdrop-blur-md text-white rounded-full shadow-xl hover:bg-white/20 hover:scale-110 transition-all duration-300 border border-white/20"
            aria-label="Siguiente"
          >
            <FaChevronRight size={20} />
          </button>
        </div>

        {/* Control de reproducción */}
        <div className="absolute top-4 right-4">
          <button
            onClick={togglePlayPause}
            className="p-2 bg-white/10 backdrop-blur-md text-white rounded-full shadow-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
          >
            {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
          </button>
        </div>

        {/* Indicadores modernos */}
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
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                }
                setCurrentIndex(i);
              }}
              aria-label={`Ir a la imagen ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente de estadísticas animadas
const EstadisticasAnimadas = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    students: 0,
    teachers: 0,
    years: 0,
    awards: 0,
  });

  useEffect(() => {
    if (isVisible) {
      const targets = { students: 850, teachers: 45, years: 25, awards: 12 };
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

      setTimeout(() => clearInterval(timer), duration);
    }
  }, [isVisible]);

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 gap-8 py-6"
      ref={(el) => {
        if (el) {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting && !isVisible) {
                setIsVisible(true);
              }
            },
            { threshold: 0.5 }
          );
          observer.observe(el);
        }
      }}
    >
      {[
        {
          icon: FaUsers,
          count: counts.students,
          label: "Estudiantes",
          color: "text-blue-400",
        },
        {
          icon: FaGraduationCap,
          count: counts.teachers,
          label: "Docentes",
          color: "text-green-400",
        },
        {
          icon: FaHistory,
          count: counts.years,
          label: "Años de Experiencia",
          color: "text-purple-400",
        },
        {
          icon: FaTrophy,
          count: counts.awards,
          label: "Reconocimientos",
          color: "text-yellow-400",
        },
      ].map((stat, index) => (
        <div key={index} className="text-center group">
          <div
            className={`${stat.color} text-4xl mb-4 group-hover:scale-110 transition-transform duration-300`}
          >
            <stat.icon className="mx-auto" />
          </div>
          <div className="text-4xl font-bold text-[#003049] mb-2 group-hover:text-yellow-300 transition-colors duration-300">
            {stat.count}+
          </div>
          <div className="text-[#003049] font-medium">{stat.label}</div>
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
  }, []);

  // Contenido mejorado para la línea de tiempo
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
    <>
      <div>
        {/* HERO SECTION MEJORADO */}
        <div
          className="relative w-full bg-cover bg-center min-h-screen h-150 p-24 flex items-center"
          style={{ backgroundImage: `url(${img_map})` }}
        >
          {/* 🎨 Degradado azul suave */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                "linear-gradient(to right, #0d47a1, rgba(0,0,0,0.4), transparent)",
            }}
          />

          {/* Contenido */}
          <h1 className="text-white text-6xl font-bold relative z-10">
            Ven conócenos
          </h1>

          {/* 📍 Botón de mapa flotante */}
          <a
            href="https://www.google.com/maps/place/Asociaci%C3%B3n+Educativa+Prisma+de+Chincha/@-13.3980394,-76.1247566,17z/data=!3m1!4b1!4m6!3m5!1s0x911016506c0cd3e7:0x516f937d46732c24!8m2!3d-13.3980394!4d-76.1221817!16s%2Fg%2F11hb3g_fmb?entry=ttu&g_ep=EgoyMDI1MDUyNi4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D" // Cambia este enlace por el de tu ubicación
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-6 right-6 z-10 bg-[#780000] hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition duration-300"
          >
            {/* Icono de mapa (de Heroicons) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 20.25l-4.5-2.25V4.5l4.5 2.25m0 13.5l6-3V6.75m-6 13.5V6.75m6 10.5l4.5 2.25V9l-4.5-2.25"
              />
            </svg>
          </a>
        </div>

        {/* ESTADÍSTICAS SECTION */}
        <div className="bg-[#f0e4d0] py-6" data-aos="fade-up">
          <div className="max-w-6xl mx-auto px-2">
            <h2 className="text-center text-4xl font-bold text-[#003049] mb-2">
              Nuestra Comunidad en Números
            </h2>
            <div className="w-40 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mb-1 rounded-full"></div>
            <EstadisticasAnimadas />
          </div>
        </div>

        {/* SECCIÓN HISTORIA MEJORADA */}
        <div
          className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20"
          data-aos="fade-up"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h1
                className="text-blue-50 font-bold text-5xl md:text-6xl mb-6 leading-tight"
                data-aos="fade-down"
              >
                NUESTRA HISTORIA,
                <br />
                <span className=" bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                  IDENTIDAD Y VISIÓN
                </span>
              </h1>
              <div
                className="h-2 w-32 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full mb-6"
                data-aos="zoom-in"
                data-aos-delay="200"
              ></div>
              <p
                className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                Conoce los pilares fundamentales que han guiado nuestro camino
                hacia la excelencia educativa a lo largo de los años
              </p>
            </div>

            {/* LÍNEA DE TIEMPO MODERNA */}
            <div className="relative mx-auto w-full max-w-6xl">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-yellow-400 via-orange-400 to-red-400 rounded-full shadow-lg"></div>

              {valoresV.map((valor, index) => (
                <div
                  key={index}
                  className={`flex items-center mb-16 ${
                    index % 2 === 0 ? "flex-row-reverse" : ""
                  }`}
                  data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
                  data-aos-delay={index * 200}
                >
                  <div
                    className={`w-5/12 ${
                      index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                    }`}
                  >
                    <div
                      className={`
                      bg-gradient-to-br ${valor.color}
                      rounded-2xl p-8 shadow-2xl 
                      transform transition-all duration-500 hover:scale-105 hover:shadow-3xl
                      border border-white/10 
                      relative overflow-hidden
                    `}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6 justify-between">
                          <h3 className="text-3xl font-bold text-yellow-300">
                            {valor.año}
                          </h3>
                          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                            {valor.icono}
                          </div>
                        </div>
                        <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent mb-6"></div>
                        <p className="text-gray-100 leading-relaxed text-lg">
                          {valor.evento}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20">
                      <span className="text-white font-bold text-lg">
                        {index + 1}
                      </span>
                      <span className="text-white font-bold text-lg">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECCIÓN DE DIRECTIVOS PREMIUM */}
        <div
          className="relative w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${img_map})` }}
          data-aos="fade-up"
        >
          <div className="absolute inset-0 bg-[#f0e4d0]"></div>

          <div className="relative z-10 py-24 min-h-screen flex flex-col justify-center">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2
                  className="text-5xl md:text-6xl font-bold text-[#003049] mb-6"
                  data-aos="zoom-in"
                >
                  Nuestro{" "}
                  <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                    Equipo Directivo
                  </span>
                </h2>
                <div
                  className="h-2 w-32 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mb-8 rounded-full"
                  data-aos="zoom-in"
                  data-aos-delay="200"
                ></div>
                <p
                  className="text-[#003049] text-xl max-w-3xl mx-auto leading-relaxed"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  Conoce a los profesionales dedicados que lideran nuestra
                  institución con pasión, experiencia y compromiso hacia la
                  excelencia educativa
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {directivos.map((item, i) => (
                  <div
                    key={i}
                    className="group relative bg-[#003049] backdrop-blur-md rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl border border-white/20"
                    data-aos="flip-up"
                    data-aos-delay={i * 150}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Overlay con información adicional */}
                      <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="text-white">
                          <p className="text-xs mb-1">{item.descripcion}</p>
                          <div className="flex gap-1 items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-xs text-gray-300">
                              Disponible
                            </span>
                            <span className="text-xs text-gray-300">
                              Disponible
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 text-center">
                      <h3 className="text-white text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors duration-300">
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
        {/* SECCIÓN DE GALERÍA MEJORADA */}
        <div
          className="bg-gradient-to-br from-gray-50 to-blue-50 py-20"
          data-aos="fade-up"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-blue-600 font-semibold text-lg mb-2">
                Conócenos
              </h3>
              <h1 className="text-gray-800 font-bold text-5xl md:text-6xl mb-6 leading-tight">
                ÚNETE AL EQUIPO
                <br />
                <span
                  className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent
"
                >
                  GANADOR
                </span>
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                Estos son algunos de los momentos más especiales que hemos
                vivido en nuestra institución educativa Estos son algunos de los
                momentos más especiales que hemos vivido en nuestra institución
                educativa
              </p>
            </div>
            <CarruselCintaMultiple />
          </div>
        </div>

        {/* SECCIÓN DE VIDEO PREMIUM */}
        <div
          className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-24"
          data-aos="fade-up"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <div
                className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl mb-8"
                data-aos="zoom-in"
              >
                <h2 className="text-white text-2xl lg:text-3xl font-bold flex items-center gap-2">
                  <FaPlay className="text-1xl" />
                  Himno Institucional
                </h2>
              </div>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Escucha nuestro himno institucional que representa los valores y
                el espíritu de nuestra comunidad educativa
              </p>
            </div>

            <div
              className="relative w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-10 pointer-events-none"></div>
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
      </div>

      <Footer />
    </>
  );
};

export default Nosotros;
