import React, { useEffect, useState } from "react";

const tipoColor = {
  evento: "bg-black text-white",
  comunicado: "bg-gray-200 text-gray-800",
  noticia: "bg-blue-100 text-blue-700",
};

const estadoColor = {
  publicado: "bg-green-100 text-green-700",
  borrador: "bg-gray-100 text-gray-500",
};

const PublicacionesRecientes = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cambia la URL por la de tu API real
    fetch("http://localhost:4001/api/publicaciones")
      .then((res) => res.json())
      .then((data) => {
        setPublicaciones(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="bg-white rounded-xl shadow p-6">
        {/* Quitado mb-6 para evitar doble margen */}
        <h2 className="text-lg font-semibold mb-2">Publicaciones Recientes</h2>
        <p className="text-sm text-gray-500 mb-4">Cargando...</p>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-xl shadow p-6">
      {/* Quitado mb-6 para evitar doble margen */}
      <h2 className="text-lg font-semibold mb-2">Publicaciones Recientes</h2>
      <p className="text-sm text-gray-500 mb-4">
        Las últimas noticias, eventos y comunicados publicados
      </p>
      <ul className="space-y-4">
        {publicaciones.map((pub, idx) => (
          <li key={idx} className="border-b pb-2 last:border-b-0 last:pb-0">
            <div className="flex items-center gap-2">
              <span className="font-medium">{pub.titulo}</span>
              <span className={`ml-2 text-xs px-2 py-0.5 rounded ${tipoColor[pub.tipo]}`}>
                {pub.tipo}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              {pub.etiquetas?.map((et, i) => (
                <span key={i} className="text-xs bg-gray-100 text-gray-700 rounded px-2 py-0.5">
                  {et}
                </span>
              ))}
              <span className="text-xs text-gray-500">{pub.fecha}</span>
              <span className="text-xs text-gray-500">· {pub.autor}</span>
              <span className="text-xs text-gray-500">· {pub.vistas} vistas</span>
            </div>
            <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded ${estadoColor[pub.estado]}`}>
              {pub.estado}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PublicacionesRecientes;