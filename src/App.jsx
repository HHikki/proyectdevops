import { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Blog from "./pages/Blog";
import Comunicado from "./pages/Comunicado";
import Calendario from "./pages/Calendario";
//import express from "express";
//import second from './routes/user.controller.js';
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
        <Route path="/Calendario" element={<Calendario />} />
      </Routes>
    </>
  );
}

//const app = express();

//app.listen(PORT);
//console.log(`Server is running on port ${PORT}`);



export default App;
