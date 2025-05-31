import React, { useContext } from "react";
import { Button } from "../components/UI";
import { AuthContext } from "../../../context/AuthContext";

export default function PanelA() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-blue-900 via-blue-600 to-red-500">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Panel de Administración</h1>
          
          <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Bienvenido{user?.email ? `, ${user.email}` : ''}
            </h2>
            <p className="text-gray-600">
              Desde aquí podrás gestionar el contenido de la plataforma.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Gestión de Eventos</h3>
              <Button className="w-full">Administrar Eventos</Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Blog</h3>
              <Button className="w-full">Gestionar Blog</Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Comunicados</h3>
              <Button className="w-full">Administrar Comunicados</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}