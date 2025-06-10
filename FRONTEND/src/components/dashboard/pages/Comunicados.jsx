import React, { useEffect, useState } from "react";
import HeaderPublicaciones from "../components/List/HeaderP";
import SearchP from "../components/List/SearchP";
import Registro from "../components/List/Registro";
import { API_KEY, API_BASE_URL } from "../../../config/env.jsx";

const Comunicados = () => {
  const [comunicados, setComunicados] = useState([]);
  const [filteredComunicados, setFilteredComunicados] = useState([]);

  useEffect(() => {
    const fetchComunicados = async () => {
      const response = await fetch(`${API_BASE_URL}/prisma/post/page?tipo=3`, {
        headers: { "x-api-key": API_KEY },
      });
      const data = await response.json();
      setComunicados(data);
      setFilteredComunicados(data);
    };
    fetchComunicados();
  }, []);

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    const result = comunicados.filter((com) => {
      const matchTitle = com.title.toLowerCase().includes(lowerQuery);
      const fecha = com.created_at
        ? new Date(com.created_at).toLocaleDateString()
        : "";
      const matchFecha = fecha.includes(lowerQuery);
      return matchTitle || matchFecha;
    });
    setFilteredComunicados(result);
  };

  return (
    <div className="flex-1 p-6 mt-16">
      <HeaderPublicaciones
        tipo={"Comunicados"}
        descripcion={"Gestiona todos los comunicados en la plataforma"}
        textoBoton={"+ Nuevo Comunicado"}
      />
      <div className="mb-4">
        <SearchP placeholder="Buscar comunicados..." onSearch={handleSearch} />
      </div>
      <Registro layoutMode={3} posts={filteredComunicados} />
    </div>
  );
};

export default Comunicados;
