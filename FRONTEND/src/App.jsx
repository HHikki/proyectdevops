import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Blog from "./pages/Blog";
import Comunicado from "./pages/Comunicado";
import Comunidad from "./pages/Comunidad";
import { Projector } from "lucide-react";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Nosotros" element={<Nosotros />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Comunicado" element={<Comunicado />} />
        <Route path="/Comunidad" element={<Comunidad />} />
      </Routes>
    </>
  );
}

export default App;
