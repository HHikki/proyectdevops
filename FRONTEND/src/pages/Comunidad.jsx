import React, { useState } from "react";
import Crush from "../components/Crush";
import alumnosImg from "../assets/calendar2.jpg";
import docentesImg from "../assets/calendar3.jpg";
import padre1 from "../assets/padre1.jpg";
import padre2 from "../assets/padre2.jpg";
import galeria1 from "../assets/galeria1.jpg";
import galeria2 from "../assets/galeria2.jpg";
import galeria3 from "../assets/galeria3.jpg";
import galeria4 from "../assets/galeria4.jpg";
import galeria5 from "../assets/galeria5.jpg";
import galeria6 from "../assets/galeria6.jpg";
import pict from "../assets/comunidad1.png";
const galeria = [
  { src: galeria1, categoria: "actividades" },
  { src: galeria2, categoria: "eventos" },
  { src: galeria3, categoria: "actividades" },
  { src: galeria4, categoria: "eventos" },
  { src: galeria5, categoria: "talleres" },
  { src: galeria6, categoria: "talleres" },
];
const categorias = ["all", "actividades", "eventos", "talleres"];

const Comunidad = () => {
  const [categoriaActiva, setCategoriaActiva] = useState("all");
  const galeriaFiltrada =
    categoriaActiva === "all"
      ? galeria
      : galeria.filter((item) => item.categoria === categoriaActiva);

  return (
    <div className="bg-white">
      <Crush pict={pict} />

      {/* SECCIÓN ALUMNOS */}
      <section className="bg-[#0c1a2c] text-white py-20 px-6 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
          {/* Texto descriptivo */}
          <div className="flex-1 ">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-400/30 mb-6 animate-fade-in-right">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-200 text-sm font-medium tracking-wide">
                NUESTROS ESTUDIANTES
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight animate-fade-in-right">
              Alumnos - Perfil
            </h2>
            <p className="mb-10 text-gray-300 text-lg md:text-xl leading-relaxed animate-fade-in-right" style={{ animationDelay: '120ms' }}>
              Celebramos a los verdaderos protagonistas de nuestra institución:
              nuestros alumnos.
            </p>

            {/* Lista de características */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Investigan de manera rigurosa y buscan la verdad desde una perspectiva holística.",
                "Tienen un profundo arraigo y amor por su país, su familia, su colegio y el mundo.",
                "Son conscientes de su identidad y como cristianos en el mundo.",
                "Son equilibrados, educados en el buen uso de su libertad.",
                "Demuestran pensamiento crítico y compromiso social.",
                "Cultivan valores humanos y espirituales para su formación integral.",
              ].map((text, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 text-white flex items-start gap-4 px-5 py-5 rounded-xl shadow-sm hover:shadow-xl hover:scale-[1.05] transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <span className="text-yellow-400 text-2xl font-bold pt-1 animate-bounce-slow">✓</span>
                  <p className="text-base leading-snug">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Imagen y badge institucional */}
          <div className="w-full xl:w-[400px] flex-shrink-0 space-y-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-violet-500 to-blue-600 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-300"></div>
              <div className="relative">
                <img
                  src={alumnosImg}
                  alt="Estudiantes de I.E.P. Ganador"
                  className="w-full h-[500px] object-cover rounded-xl shadow-2xl group-hover:scale-[1.04] group-hover:brightness-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent rounded-xl"></div>
              </div>
            </div>
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-3 bg-slate-800/80 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-600/50 shadow-md animate-fade-in-up">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-violet-400 rounded-full"></div>
                <span className="text-slate-300 text-sm font-semibold tracking-wider uppercase">
                  I.E.P. GANADOR
                </span>
                <div className="w-3 h-3 bg-gradient-to-r from-violet-400 to-blue-400 rounded-full"></div>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Formando líderes del mañana
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN PROFESORES */}
      <section className="relative bg-[#f0e4d0] text-[#003049] py-12 px-6 sm:px-8 lg:px-24 overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#e4bfa2]/30 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#db9e82]/30 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#c87f6a]/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-6 space-y-6 text-[#003049]">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#003049] animate-fade-in-down">
              Nuestros Profesores
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Imagen */}
            <div className="w-full lg:w-1/2 relative group animate-fade-in-left">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#c87f6a] via-[#db9e82] to-[#f2b89e] rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative">
                <img
                  src={docentesImg}
                  alt="Equipo docente de I.E.P. Ganador"
                  className="w-full h-[480px] object-cover rounded-xl shadow-2xl group-hover:scale-[1.04] group-hover:brightness-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5a4e3c]/30 via-transparent to-transparent rounded-xl"></div>
                {/* Overlay con estadísticas */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-[#fff8f1]/70 backdrop-blur-lg rounded-lg p-4 border border-[#e0c8a0]/50">
                    <div className="flex justify-between items-center text-center">
                      <div>
                        <div className="text-2xl font-bold text-[#9d584c] animate-flash-once">15+</div>
                        <div className="text-xs text-[#5a4e3c]">Años de experiencia</div>
                      </div>
                      <div className="w-px h-8 bg-[#c4a88e]/50"></div>
                      <div>
                        <div className="text-2xl font-bold text-[#9d584c] animate-flash-once" style={{ animationDelay: '150ms' }}>25+</div>
                        <div className="text-xs text-[#5a4e3c]">Docentes expertos</div>
                      </div>
                      <div className="w-px h-8 bg-[#c4a88e]/50"></div>
                      <div>
                        <div className="text-2xl font-bold text-[#9d584c] animate-flash-once" style={{ animationDelay: '300ms' }}>100%</div>
                        <div className="text-xs text-[#5a4e3c]">Compromiso</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Texto */}
            <div className="w-full lg:w-1/2 space-y-8 animate-fade-in-right">
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-1 bg-gradient-to-r from-[#d97706] via-[#f59e0b] to-[#fcd34d] rounded-full"></div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-[#d97706] rounded-full"></div>
                    <div className="w-2 h-2 bg-[#f59e0b] rounded-full"></div>
                    <div className="w-2 h-2 bg-[#fcd34d] rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#780000]">
                  Nuestro Equipo Excepcional
                </h3>
                <p className="text-lg text-[#5a4e3c] leading-relaxed">
                  Contamos con un equipo de{" "}
                  <span className="text-[#003049] font-semibold">profesionales altamente calificados</span>{" "}
                  y comprometidos con la educación y formación integral de nuestros estudiantes.
                </p>
              </div>
              {/* Características */}
              <div className="space-y-4">
                {[
                  {
                    icon: "🎓",
                    title: "Formación Especializada",
                    description: "Docentes con estudios superiores y especialización en sus áreas",
                  },
                  {
                    icon: "🌟",
                    title: "Innovación Pedagógica",
                    description: "Metodologías modernas adaptadas a las necesidades actuales",
                  },
                  {
                    icon: "🤝",
                    title: "Trabajo en Equipo",
                    description: "Colaboración constante para el fortalecimiento de nuestra comunidad educativa",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-start gap-4 p-4 rounded-lg bg-[#003049] backdrop-blur-sm border border-[#e0c8a0]/30 hover:bg-[#fffaf5] hover:border-[#d8b48e] transition-all duration-300 hover:scale-[1.04] animate-fade-in-up"
                    style={{ animationDelay: `${index * 90 + 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#c87f6a] to-[#e4bfa2] rounded-lg flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1 group-hover:text-[#af6e60] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-white group-hover:text-[#3e2e1e] transition-colors">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN TESTIMONIOS */}
      <section className="bg-[#6698BC] text-[#003049] py-12 px-4 sm:px-8 lg:px-24">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 leading-tight animate-fade-in-down">
          Testimonios de Padres de Familia
        </h2>
        <p className="text-center text-white  mb-16 max-w-2xl mx-auto text-lg animate-fade-in-down" style={{ animationDelay: '80ms' }}>
          Reconocemos y valoramos el rol fundamental que cumplen los padres en
          el desarrollo integral de nuestros estudiantes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {[
            {
              img: padre1,
              texto:
                "Mi hijo era todo un desastre con sus tareas en su colegio anterior, ahora es todo un campeón. Prisma canalizó su mayor pasión.",
              nombre: "Regina Miles",
              rol: "Madre de familia",
            },
            {
              img: padre2,
              texto:
                "Me gustó el colegio, ahora mi hijo es todo un profesional. Se convirtió en panadero nuclear en Francia.",
              nombre: "Carlos Gómez",
              rol: "Padre orgulloso",
            },
          ].map((padre, index) => (
            <div
              key={index}
              className="bg-white/80 text-[#333] rounded-2xl shadow-xl p-8 flex flex-col items-center space-y-4 hover:shadow-2xl hover:scale-[1.04] transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 120 + 100}ms` }}
            >
              <img
                src={padre.img}
                alt={padre.nombre}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#f0e4d0] shadow-md hover:scale-110 transition-transform duration-300"
              />
              <p className="text-md italic text-center text-[#444]">
                “{padre.texto}”
              </p>
              <div className="text-yellow-500 text-xl">★★★★★</div>
              <div className="text-center">
                <p className="font-semibold text-lg">{padre.nombre}</p>
                <p className="text-sm text-[#666]">{padre.rol}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN GALERÍA */}
      <section className="bg-[#f0e4d0] text-white py-12 px-4 sm:px-8 lg:px-24">
        <h2 className="text-4xl font-bold text-center mb-8 animate-fade-in-up">Galería</h2>

        {/* Botones de filtro */}
        <div className="flex justify-center gap-4 flex-wrap mb-12">
          {categorias.map((cat, idx) => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 animate-fade-in-up
                ${categoriaActiva === cat
                  ? "bg-white text-[#445da7] shadow-lg scale-105"
                  : "bg-[#780000] hover:bg-[#6b85da]"}
              `}
              style={{ animationDelay: `${idx * 70}ms` }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Galería */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {galeriaFiltrada.map((item, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl shadow-lg group relative animate-fade-in-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <img
                src={item.src}
                alt={`Galería ${i + 1}`}
                className="w-full h-50 object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-300"></div>
              {/* Efecto de brillo cuando pasas el mouse */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 blur-2xl"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1c2540] text-white py-16 px-6 md:px-24">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
          <div>
            <h3 className="font-bold mb-3">Company Info</h3>
            <ul className="space-y-1 text-gray-300">
              <li>About Us</li>
              <li>Carrier</li>
              <li>We are hiring</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Legal</h3>
            <ul className="space-y-1 text-gray-300">
              <li>About Us</li>
              <li>Carrier</li>
              <li>We are hiring</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Features</h3>
            <ul className="space-y-1 text-gray-300">
              <li>Business Marketing</li>
              <li>User Analytic</li>
              <li>Live Chat</li>
              <li>Unlimited Support</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Resources</h3>
            <ul className="space-y-1 text-gray-300">
              <li>IOS & Android</li>
              <li>Watch a Demo</li>
              <li>Customers</li>
              <li>API</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Get In Touch</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-center gap-2">
                <span>📞</span> (480) 555-0103
              </li>
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>4577 Washington Ave. Manchester, Kentucky 39495</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span> debra.holt@example.com
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* --- ANIMACIONES personalizadas --- */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(.4,2,.6,1) both;}
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-down { animation: fade-in-down 1s cubic-bezier(.4,2,.6,1) both;}
        @keyframes fade-in-right {
          0% { opacity: 0; transform: translateX(-40px);}
          100% { opacity: 1; transform: translateX(0);}
        }
        .animate-fade-in-right { animation: fade-in-right 1s cubic-bezier(.4,2,.6,1) both;}
        @keyframes fade-in-left {
          0% { opacity: 0; transform: translateX(40px);}
          100% { opacity: 1; transform: translateX(0);}
        }
        .animate-fade-in-left { animation: fade-in-left 1s cubic-bezier(.4,2,.6,1) both;}
        @keyframes bounce-slow {
          0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);}
        }
        .animate-bounce-slow { animation: bounce-slow 1.8s infinite;}
        @keyframes flash-once {
          0%{background:#ffe1c1; box-shadow:0 0 0px #ffe1c1;}
          50%{background:#ffe1c1; box-shadow:0 0 18px #ffe1c1;}
          100%{background:none; box-shadow:none;}
        }
        .animate-flash-once { animation: flash-once 1.3s 1;}
      `}</style>
    </div>
  );
};

export default Comunidad;
