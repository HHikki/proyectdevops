import React from "react";
import Button_A from "../components/Button_A";
import img_map from "../assets/foto_map.png";

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
            <h1 className="text-blue-50 font-bold text-6xl">
              NUESTRA HISTORIA, IDENTIDAD Y VISION
            </h1>
          </div>

          <div className="flex">
            {valoresV.map((v, index) => (
              <div key={index} className="p-8">
                <p className="text-white text-3xl font-bold ">
                  {v.nombre}
                </p>
                <p className="text-white">{v.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Nosotros;
