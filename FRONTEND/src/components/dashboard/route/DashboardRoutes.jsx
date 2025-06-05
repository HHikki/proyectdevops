import { Routes, Route } from "react-router-dom";
import PanelA from "../pages/PanelA";
import Eventos from "../pages/Eventos";
import Publicaciones from "../pages/Publicaciones";
import Comunicados from "../pages/Comunicados";

const DashboardRoutes = () => {
  return (
    <Routes>
      {/* Ruta predeterminada */}
      <Route index element={<PanelA />} />
      <Route path="/Eventos" element={<Eventos />} />
      <Route path="/Publicaciones" element={<Publicaciones />} />
      <Route path="/Comunicados" element={<Comunicados />} />
    </Routes>
  );
};

export default DashboardRoutes;
