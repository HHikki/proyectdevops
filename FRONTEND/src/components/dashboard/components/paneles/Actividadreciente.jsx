import React, { useEffect, useState } from "react";

const ActividadReciente = () => {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cambia la URL por la de tu API real
    fetch("http://localhost:4001/api/actividad")
      .then((res) => res.json())
      .then((data) => {
        setActividades(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Actividad Reciente</h2>
        <p className="text-sm text-gray-500 mb-4">Cargando...</p>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-2">Actividad Reciente</h2>
      <p className="text-sm text-gray-500 mb-4">
        Últimas acciones realizadas en el sistema
      </p>
      <ul className="space-y-2">
        {actividades.map((act, idx) => (
          <li key={idx} className="text-xs text-gray-700 flex items-center gap-2">
            <span className="font-bold">{act.usuario}</span>
            <span>{act.accion}</span>
            <span className="font-medium">"{act.objeto}"</span>
            <span className="text-gray-400">{act.tiempo}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ActividadReciente;