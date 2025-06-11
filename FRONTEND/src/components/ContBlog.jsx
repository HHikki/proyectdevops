import React from "react";
import blog from "../assets/Blog/blog_u.png";
const Fondo = () => {
  return (
    <div
      className="relative w-full h-[60vh] md:h-[70vh] min-h-screen bg-cover bg-center bg-no-repeat flex items-center text-white"
      style={{ backgroundImage: `url(${blog})` }}
    >
      {/* Degradado verde tipo overlay desde la izquierda */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-transparent z-0"></div>

      {/* Contenedor de texto */}
      <div className="relative z-10 px-6 md:px-50 max-w-2xl text-left flex flex-col justify-center h-full">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Blog</h1>
      </div>
    </div>
  );
};

export default Fondo;
