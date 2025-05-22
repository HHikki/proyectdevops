import React from "react";

const Hero = () => {
  return (
    <div
      className="fixed top-0 left-0 w-screen md:h-[calc(100vh-4rem)] h-[calc(100vh-3rem)] bg-cover bg-center bg-no-repeat flex items-center justify-center text-white z-0"
      style={{ backgroundImage: 'url("/src/assets/prisma_logo.jpg")' }}
    >
      {/* Overlay negro de izquierda a derecha */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-0" />

      {/* Contenedor de texto alineado a la izquierda */}
      <div className="relative z-10 h-full flex items-center">
        <div className="pl-6 md:pl-16 max-w-2xl">
          <h1 className="text-4xl font-bold text-left">
            Bienvenidos al Colegio Prisma
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
