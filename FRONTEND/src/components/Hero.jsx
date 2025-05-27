import React from "react";

const Hero = () => {
  return (
    <div
      className="relative w-full h-[60vh] md:h-[70vh] bg-cover bg-center bg-no-repeat flex items-center justify-center text-white"
      style={{ backgroundImage: 'url("/src/assets/prisma_logo.jpg")' }}
    >
      {/* Overlay negro de izquierda a derecha */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-0" />

      {/* Contenedor de texto centrado */}
      <div className="relative z-10 px-6 md:px-16 max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
          Bienvenidos al Colegio Prisma
        </h1>
      </div>
    </div>
  );
};

export default Hero;