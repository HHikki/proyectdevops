import React from "react";
import { Button } from "../UI";

export default function HeaderPublicaciones({
  onNuevaPublicacion,
  tipo,
  descripcion,
  textoBoton = "+ Nueva Publicación",
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold mb-1">{tipo}</h1>
        <p className="text-gray-500">{descripcion}</p>
      </div>
      <Button
        className="bg-black hover:bg-gray-800 px-6 py-2 rounded-lg font-semibold"
        onClick={onNuevaPublicacion}
      >
        {textoBoton}
      </Button>
    </div>
  );
}
