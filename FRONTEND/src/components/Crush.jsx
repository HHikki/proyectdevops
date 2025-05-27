import React from "react";
import calendar from "../assets/calendar.jpg";

const Crush = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <img
        src={calendar}
        alt="Fondo calendario"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Sombra lateral izquierda degradada */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>

      {/* Contenido centrado */}
      <div className="absolute inset-0 flex items-center justify-start pl-10 md:pl-32">
        <h1 className="text-white text-4xl md:text-5xl font-bold z-10">
          ¡FAMILIA <br className="hidden md:block" />
          PRISMÁTICA!
        </h1>
      </div>
    </div>
  );
};

export default Crush;
