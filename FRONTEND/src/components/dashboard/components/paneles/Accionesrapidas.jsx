import React from "react";
import { FiFileText, FiCalendar, FiBell } from "react-icons/fi";

const acciones = [
  {
    label: "Nueva Publicación",
    desc: "Crear una nueva noticia",
    color: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300",
    icon: <FiFileText size={28} className="mb-2" />,
    onClickName: "nuevaPublicacion",
  },
  {
    label: "Nuevo Evento",
    desc: "Programar un evento",
    color: "bg-green-500 hover:bg-green-600 focus:ring-green-300",
    icon: <FiCalendar size={28} className="mb-2" />,
    onClickName: "nuevoEvento",
  },
  {
    label: "Nuevo Comunicado",
    desc: "Enviar comunicado",
    color: "bg-orange-500 hover:bg-orange-600 focus:ring-orange-300",
    icon: <FiBell size={28} className="mb-2" />,
    onClickName: "nuevoComunicado",
  },
];

const AccionesRapidas = ({
  onNuevaPublicacion,
  onNuevoEvento,
  onNuevoComunicado,
}) => {
  const handlers = {
    nuevaPublicacion: onNuevaPublicacion,
    nuevoEvento: onNuevoEvento,
    nuevoComunicado: onNuevoComunicado,
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-lg p-7 transition-all duration-200">
      <h2 className="text-xl font-bold mb-2 text-gray-800 tracking-tight">Acciones Rápidas</h2>
      <p className="text-gray-500 text-sm mb-5">
        Crear nuevo contenido para el colegio
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        {acciones.map((accion) => (
          <button
            key={accion.label}
            className={`flex-1 flex flex-col items-center justify-center ${accion.color} text-white rounded-xl py-6 shadow transition-all duration-150 focus:outline-none focus:ring-2 font-semibold group`}
            onClick={handlers[accion.onClickName]}
            type="button"
          >
            <span className="transition-transform group-hover:scale-110">{accion.icon}</span>
            <span className="text-base mb-1">{accion.label}</span>
            <span className="text-xs font-normal opacity-80">{accion.desc}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default AccionesRapidas;