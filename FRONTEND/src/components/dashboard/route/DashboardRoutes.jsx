import { Routes, Route } from "react-router-dom";
import PanelA from "../pages/PanelA";
import Eventos from "../pages/Eventos";
import Publicaciones from "../pages/Publicaciones";
import Comunicados from "../pages/Comunicados";
import ProtectedRoute from "../../ProtectedRoute";

const DashboardRoutes = () => {
  return (
    <>
      <Route path="/Panel" element={<PanelA />} />

      <ProtectedRoute>
        <Route path="/Eventos" element={<Eventos />} />
        <Route path="/Publicaciones" element={<Publicaciones />} />
        <Route path="/Comunicados" element={<Comunicados />} />
      </ProtectedRoute>
    </>
  );
};

export default DashboardRoutes;
