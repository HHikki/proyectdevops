import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { FiPlay } from 'react-icons/fi';

// Animaciones globales para React (solo una vez por proyecto)
const styles = `
@keyframes floatSlow {
  0% { transform: translateY(0) scale(1); opacity: 0.3; }
  50% { transform: translateY(-20px) scale(1.1); opacity: 0.6; }
  100% { transform: translateY(0) scale(1); opacity: 0.3; }
}
@keyframes slideInTop {
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes slideInBottom {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes zoomIn {
  from { transform: scale(0.92); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
@keyframes bounceSlow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-float-slow { animation: floatSlow 6s infinite ease-in-out; }
.animate-slide-in-top { animation: slideInTop 1s ease-out; }
.animate-slide-in-bottom { animation: slideInBottom 1s ease-out 0.5s backwards; }
.animate-zoom-in { animation: zoomIn 1.1s cubic-bezier(.23,1.02,.52,.99); }
.animate-zoom-in-delay { animation: zoomIn 1.1s cubic-bezier(.23,1.02,.52,.99) 0.3s backwards; }
.animate-bounce-slow { animation: bounceSlow 3s infinite ease-in-out; }
.animate-fade-in-delay { animation: fadeIn 1.5s ease-out 0.5s backwards; }
`;
if (typeof window !== "undefined" && !document.getElementById("welc-video-css")) {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  styleSheet.id = "welc-video-css";
  document.head.appendChild(styleSheet);
}

const WelcomeVideo = () => (
  <section className="relative min-h-screen py-20 px-4 bg-[#f0e4d0] flex items-center justify-center overflow-hidden">
    {/* Fondo animado */}
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-pink-400/20 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-0 right-16 w-64 h-64 bg-yellow-300/20 rounded-full blur-2xl animate-float-slow" style={{ animationDelay: '0.7s' }}></div>
      <div className="absolute bottom-40 left-1/3 w-80 h-48 bg-white/10 rounded-full blur-2xl animate-float-slow" style={{ animationDelay: '1.2s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-56 h-56 bg-purple-400/15 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '1.7s' }}></div>
    </div>

    <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight  bg-[#003049] bg-clip-text text-transparent mb-4 drop-shadow-xl animate-zoom-in">
        Nuestro Reconocimiento
      </h1>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold  bg-[#003049] bg-clip-text text-transparent mb-3 tracking-wide animate-zoom-in-delay">
        ¡BIENVENIDO!
      </h2>

      <div className="flex items-center justify-center gap-3 text-purple-200 font-medium mb-10 animate-slide-in-bottom">
        <FaMapMarkerAlt className="text-lg text-[#003049] animate-bounce-slow" />
        <span className="text-[#003049] md:text-lg leading-relaxed text-center">
          Mira nuestro video institucional y conoce el espíritu Prisma.
        </span>
      </div>

      {/* VIDEO CON NUEVO ASPECTO */}
      <div className="w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl border-2 border-[#a69fff]/20 animate-fade-in-delay bg-white/10 backdrop-blur-md">
        {/* Overlay degradado (ya no cubre el video, solo decora) */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-300/10 to-purple-300/10 pointer-events-none rounded-2xl z-10"></div>
        <iframe
          className="w-full h-full min-h-[220px] rounded-2xl relative z-20"
          src="https://www.youtube.com/embed/4ZXV4uexlTU"
          title="Video institucional Colegio Prisma"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  </section>
);

export default WelcomeVideo;
