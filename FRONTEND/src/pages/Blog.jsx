import React from "react";
import Fondo from "../components/ContBlog";
import SeccionPadres from "../components/Seccion_Padres";
import SeccionIngresantes from "../components/Seccion_Ingresantes";
import InicioEscolar from "../components/Inicioescolar";
import WelcomeVideo from "../components/sedes";
import { Footer } from "../components/Footer";

const Blog = () => {
  return (
    <div>
      <Fondo />
      <SeccionPadres />
      <SeccionIngresantes />
      <InicioEscolar />
      <WelcomeVideo />
      <Footer /> {/* Aquí está bien ubicado */}
    </div>
  );
};

export default Blog;
