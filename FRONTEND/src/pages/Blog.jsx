import React from "react";
import Fondo from "../components/ContBlog";
import SeccionPadres from "../components/Seccion_Padres";
import SeccionIngresantes from "../components/Seccion_Ingresantes";
import InicioEscolar from "../components/Inicioescolar";
import WelcomeVideo from "../components/sedes";
import { Footer } from "../components/Footer";
import Blog_post from "../components/Blog_post";

const Blog = () => {
  return (
    <div>
      <Fondo />
      <Blog_post />
      <SeccionPadres />
      <SeccionIngresantes />
      <InicioEscolar />
      <WelcomeVideo />
      <Footer /> {/* Aquí está bien ubicado */}
    </div>
  );
};

export default Blog;
