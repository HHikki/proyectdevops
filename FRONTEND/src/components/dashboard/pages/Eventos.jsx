import React, { useEffect, useState, useContext } from "react";
import Barra from "../components/Barra";
import HeaderPublicaciones from "../components/List/HeaderP";
import SearchP from "../components/List/SearchP";
import Registro from "../components/List/Registro";
import { API_KEY, API_BASE_URL } from "../../../config/env.jsx";
import { AuthContext } from "../../../context/AuthContext.jsx";

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [filteredEventos, setFilteredEventos] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchEventos = async () => {
      const response = await fetch(`${API_BASE_URL}/prisma/post/page`, {
        headers: { "x-api-key": API_KEY },
      });
      const data = await response.json();
      console.log("Todos los posts recibidos:", data);

      const soloEventos = user?.admin
        ? data.filter((item) => item.postTypeId === 1)
        : data.filter(
            (item) => item.postTypeId === 1 && item.userId === user.id
          );
      console.log("Eventos visibles para este usuario:", soloEventos);
      setEventos(soloEventos);
      setFilteredEventos(soloEventos);
    };
    fetchEventos();
  }, [user]);

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    const result = eventos.filter((evento) => {
      const matchTitle = evento.title.toLowerCase().includes(lowerQuery);
      const fecha = evento.created_at
        ? new Date(evento.created_at).toLocaleDateString()
        : "";
      const matchFecha = fecha.includes(lowerQuery);
      return matchTitle || matchFecha;
    });
    setFilteredEventos(result);
  };

  return (
    <div className="flex-1 p-6 mt-16">
      <HeaderPublicaciones
        tipo={"Evento"}
        descripcion={"Gestiona todos los eventos en la plataforma"}
        textoBoton={"+ Nuevo Evento"}
      />
      <div className="mb-4">
        <SearchP placeholder="Buscar eventos..." onSearch={handleSearch} />
      </div>

      <Registro layoutMode={1} tipo={"Evento"} posts={filteredEventos} />
    </div>
  );
};

export default Eventos;
