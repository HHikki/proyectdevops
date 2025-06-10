import React, { useEffect, useState, useContext } from "react";
import HeaderPublicaciones from "../components/List/HeaderP";
import SearchP from "../components/List/SearchP";
import Registro from "../components/List/Registro";
import { API_KEY, API_BASE_URL } from "../../../config/env.jsx";
import { AuthContext } from "../../../context/AuthContext.jsx";

const Comunicados = () => {
  const [comunicados, setComunicados] = useState([]);
  const [filteredComunicados, setFilteredComunicados] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchComunicados = async () => {
      const response = await fetch(`${API_BASE_URL}/prisma/post/page?tipo=3`, {
        headers: { "x-api-key": API_KEY },
      });
      const data = await response.json();

      // Filtra según el tipo de usuario
      let visibles = data;
      if (!user?.admin) {
        visibles = data.filter((com) => Number(com.userId) === Number(user.id));
      }

      setComunicados(visibles);
      setFilteredComunicados(visibles);
    };
    fetchComunicados();
  }, [user]);

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
      <HeaderPublicaciones tipo={"Comunicado"} />
      <div className="mb-4">
        <SearchP placeholder="Buscar comunicados..." onSearch={handleSearch} />
      </div>

      {/* REVISAR */}
      <Registro
        layoutMode={3}
        tipo={"Comunicado"}
        posts={filteredComunicados}
      />
    </div>
  );
};

export default Comunicados;
