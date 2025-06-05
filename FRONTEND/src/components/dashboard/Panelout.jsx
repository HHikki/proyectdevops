import React from "react";
import DashboardRoutes from "./route/DashboardRoutes";
import Barra from "./components/Barra";
import { AuthProvider } from "../../context/AuthContext";

export const Panelout = () => {
  return (
    <div className="flex flex-row min-h-screen">
      <AuthProvider>
        {/* Aquí puedes agregar un Navbar si es necesario */}
        <Barra />
        <DashboardRoutes />
      </AuthProvider>
    </div>
  );
};
