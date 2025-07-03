import React from "react";

export const Card = ({ carro }) => {
  return (
    <div className="w-full max-w-[400px] m-2 flex-shrink-0 cursor-pointer">
      <div className="rounded-lg border border-gray-300 overflow-hidden relative">
        <img
          src={`/src/assets/Carrusel/C_${carro}.jpeg`}
          alt=""
          className="w-full h-auto block"
        />
      </div>
    </div>
  );
};
