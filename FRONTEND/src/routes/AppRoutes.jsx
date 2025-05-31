import { Routes, Route, Navigate } from "react-router-dom";

import PanelA from "../components/dashboard/pages/PanelA";

import Home from "../pages/Home";
import Nosotros from "../pages/Nosotros";
import Blog from "../pages/Blog";
import Comunicado from "../pages/Comunicado";
import Comunidad from "../pages/Comunidad";
import Login from "../components/dashboard/pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/Nosotros" element={<Nosotros />} />
    <Route path="/Blog" element={<Blog />} />
    <Route path="/Comunicado" element={<Comunicado />} />
    <Route path="/Comunidad" element={<Comunidad />} />
    <Route path="/Login" element={<Login />} />
    <Route path="/Panel" element={<ProtectedRoute component={ PanelA } />} />

    
    <Route path="/error" element={<ErrorPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
