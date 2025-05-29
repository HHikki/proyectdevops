import React from "react";

const Fondo = () => {
  return (
    <div
      className="relative w-full h-[60vh] md:h-[70vh]  min-h-screen bg-cover bg-center bg-no-repeat flex items-center text-white"
      style={{ backgroundImage: 'url("/src/assets/Blog/background_blog.jpg")' }}
    >
      {/* Contenedor de texto alineado a la izquierda y centrado verticalmente */}
      <div className="relative z-10 px-6 md:px-50 max-w-2xl text-left flex flex-col justify-center h-full">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Blog</h1>
      </div>
    </div>
  );
};

export default Fondo;
