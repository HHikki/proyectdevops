import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Button_A from "./components/Button_A";
import Button_l from "./components/Button_l";

function App() {

  return (
    <>
      <h1>Bienvenido a mi aplicación</h1>
      <Navbar />
      <Button_A />
      <div className="flex items-center justify-center h-[400px]">
        <Button_l>Hola mundo soy un boton</Button_l>
      </div>
      
    </>
  );
}

export default App;
