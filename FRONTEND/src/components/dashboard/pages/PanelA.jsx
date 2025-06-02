import React, { useContext, useState, useEffect } from "react";
import { Button } from "../components/UI";
import { AuthContext } from "../../../context/AuthContext";

import Barra from "../components/Barra";
import Header from "../components/Header";
import Stats from "../components/paneles/Stats";
import PublicacionesRecientes from "../components/paneles/Publicacionreciente";
import ActividadReciente from "../components/paneles/Actividadreciente";
import AccionesRapidas from "../components/paneles/Accionesrapidas";
import GestionContenido from "../components/paneles/Gestion";
// import RegistroP from "../components/List/RegistroP";

const API_BASE_URL = "http://localhost:4001";

export default function PanelA() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch(`${API_BASE_URL}/prisma/post`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        
        if (!response.ok) {
          throw new Error('No se pudieron cargar los posts');
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Barra />
      <div className="flex-1 flex flex-col mt-16 ml-4">
        <Header />
        <Stats />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <PublicacionesRecientes />
            <ActividadReciente />
          </div>
          <div className="flex flex-col gap-6">
            <AccionesRapidas/>
            <GestionContenido />
            {/* <RegistroP /> */}
          </div>
        </div>
      </div>
    </div>
  );
}