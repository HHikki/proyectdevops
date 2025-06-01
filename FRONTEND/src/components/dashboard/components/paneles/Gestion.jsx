import React from "react";
import { FiBookOpen, FiCalendar, FiBell } from "react-icons/fi";

const items = [
  {
    label: "Ver Todas las Publicaciones",
    desc: "Gestionar contenido existente",
    icon: <FiBookOpen size={20} />,
    onClickName: "verPublicaciones",
  },
  {
    label: "Gestionar Eventos",
    desc: "Administrar eventos del colegio",
    icon: <FiCalendar size={20} />,
    onClickName: "gestionarEventos",
  },
  {
    label: "Ver Comunicados",
    desc: "Revisar comunicados enviados",
    icon: <FiBell size={20} />,
    onClickName: "verComunicados",
  },
];

const GestionContenido = ({
  onVerPublicaciones,
  onGestionarEventos,
  onVerComunicados,
}) => {
  const handlers = {
    verPublicaciones: onVerPublicaciones,
    gestionarEventos: onGestionarEventos,
    verComunicados: onVerComunicados,
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-lg p-7 transition-all duration-200">
      <h2 className="text-xl font-bold mb-2 text-gray-800 tracking-tight">Gestión de Contenido</h2>
      <p className="text-gray-500 text-sm mb-5">
        Administrar contenido existente
      </p>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.label}>
            <button
              className="w-full flex items-center gap-3 text-left px-5 py-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition font-medium focus:outline-none focus:ring-2 focus:ring-blue-200"
              onClick={handlers[item.onClickName]}
              type="button"
            >
              <span className="text-blue-500">{item.icon}</span>
              <div>
                <span className="font-semibold text-sm">{item.label}</span>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default GestionContenido;