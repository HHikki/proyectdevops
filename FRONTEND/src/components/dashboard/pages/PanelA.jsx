import React, { useContext, useState, useEffect } from "react";
import { Button } from "../components/UI";
import { AuthContext } from "../../../context/AuthContext.jsx";

import Barra from "../components/Barra";
import Header from "../components/Header";
import Stats from "../components/paneles/Stats";
import PublicacionesRecientes from "../components/paneles/Publicacionreciente";
import ActividadReciente from "../components/paneles/Actividadreciente";
import AccionesRapidas from "../components/paneles/Accionesrapidas";
import GestionContenido from "../components/paneles/Gestion";
// import RegistroP from "../components/List/RegistroP";
import { API_BASE_URL, API_KEY } from "../../../config/env.jsx";

export default function PanelA() {
  const { user, name, admin , loading } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("jwtToken");
  console.log("name:", name, "user:", user, "admin:", admin);
  useEffect(() => {
    if (loading) return; // Esperar a que el contexto esté completamente cargado

    const fetchPosts = async () => {
      try {
        const url = admin
          ? `${API_BASE_URL}/prisma/post/`
          : `${API_BASE_URL}/prisma/post/${user}`;

        console.log("URL de fetch:", url);

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los posts");
        }

        const data = await response.json();
        console.log("Datos obtenidos:", data);

        setPosts([
          {
            type: 1,
            count: data.filter((item) => item.postTypeId === 1).length,
          },
          {
            type: 2,
            count: data.filter((item) => item.postTypeId === 2).length,
          },
          {
            type: 3,
            count: data.filter((item) => item.postTypeId === 3).length,
          },
        ]);
      } catch (error) {
        console.error("Error en fetch:", error.message);
      }
    };

    fetchPosts();
  }, [token, admin, user, loading]);

  if (loading) {
    return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras el contexto se inicializa
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex flex-col mt-16 ml-4">
        <Header user={name} />
        <Stats posts={posts.map((item) => item.count)} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <PublicacionesRecientes />
            <ActividadReciente />
          </div>
          <div className="flex flex-col gap-6">
            <AccionesRapidas />
            <GestionContenido />
            {/* <RegistroP /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
