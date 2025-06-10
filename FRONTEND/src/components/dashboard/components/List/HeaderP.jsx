import React, { useState } from "react";
import { Button } from "../UI";
import Crearinput from "../paneles/Crearinput";

export default function HeaderPublicaciones({
  tipo,
  descripcion,
  textoBoton = "+ Nueva Publicación",
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleFormSubmit = (data) => {
    console.log("Formulario enviado:", data);
    // Aquí puedes hacer una petición o guardar el estado
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold mb-1">{tipo}</h1>
        <p className="text-gray-500">{descripcion}</p>
      </div>
      <Button
        className="bg-black hover:bg-gray-800 px-6 py-2 rounded-lg font-semibold"
        onClick={handleOpenModal}
      >
        {textoBoton}
      </Button>

      <Crearinput
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        Tipo={tipo}
      />
    </div>
  );
}
