import React from "react";
import Button_A from "../components/Button_A";
import img_map from "../assets/foto_map.png";
import { Footer } from "../components/Footer";
import { Seccion_direct } from "../components/Seccion_direct";
import { Car } from "lucide-react";
import { Carrusel } from "../components/carrusel";

const Nosotros = () => {
  const valoresV = [
    {
      nombre: "Fundacion",
      descripcion:
        "Los valores son principios, virtudes o cualidades que caracterizan a una persona o acción, considerados positivos y de gran importancia para un grupo social.",
    },
    {
      nombre: "Misión",
      descripcion:
        "Los valores son principios, virtudes o cualidades que caracterizan a una persona o acción, considerados positivos y de gran importancia para un grupo social.",
    },
    {
      nombre: "Vision",
      descripcion:
        "Los valores son principios, virtudes o cualidades que caracterizan a una persona o acción, considerados positivos y de gran importancia para un grupo social.",
    },
  ];

  return (
    <>
      <div>
        <div
          style={{ backgroundImage: `url(${img_map})` }}
          className="w-full bg-cover bg-center h-150 p-24 flex  items-center"
        >
          <h1 className="text-blue-900 text-6xl font-bold">Ven conocenos</h1>
        </div>

        <div className="h-150 bg-blue-800 flex p-32 flex-col">
          <div className=" w-5xl">
            <h1 className="text-blue-50 font-bold text-3xl">
              NUESTRA HISTORIA, IDENTIDAD Y VISION
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-6 px-4">
            {valoresV.map((v, index) => (
              <div key={index} className="p-4 md:p-8 max-w-sm md:max-w-md">
                <p className="text-white text-lg md:text-2xl font-bold text-center md:text-left">
                  {v.nombre}
                </p>
                <p className="text-white text-sm md:text-2xl leading-tight md:leading-normal">
                  {v.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* directivos */}
        <div className="bg-blue-400 flex flex-col gap-6 items-center p-8">
          <div>
            <h2 className="text-white text-4xl font-bold">Directivos</h2>
            <p className="text-white text-lg md:text-xl mt-2">
              Esta es la plantilla del perosnal encargado de guiar a nuestros
              queridos alumnos.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            {<Seccion_direct />}
            {<Seccion_direct />}
            {<Seccion_direct />}
            {<Seccion_direct />}
          </div>
        </div>
        {/* Carrusel */}
        <div className="bg-white flex flex-col gap-6 items-center p-8">
          <div className="text-left text-blue-800">
            <h3 className="font-bold">Conocenos</h3>
            <h1 className="text-gray-700 font-bold text-5xl">UNETE AL EQUIPO GANADOR</h1>
            <p className="font-light">Esta son algunos momentos en nuestra institución</p>
          </div>
          <Carrusel />
        </div>
      </div>
      <div className=" bg-blue-800 flex flex-col gap-6 items-center p-8 h-150">
        <div className="text-center text-white ">
          <h1 className="text-4xl font-bold">
            "El colegio tiene como patrona a la Virgen de Guadalupe"
          </h1>
          <p>HIMNO</p>
        </div>
        <div className="w-full max-w-3xl mx-auto">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/KZJvRU4JJak"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Nosotros;
