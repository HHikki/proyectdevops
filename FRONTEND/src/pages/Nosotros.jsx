import React from "react";
import Button_A from "../components/Button_A";
import img_map from "../assets/foto_map.png";
import { Footer } from "../components/Footer";
import { Seccion_direct } from "../components/Seccion_direct";
import { Car } from "lucide-react";
import { Carrusel } from "../components/Carrusel";

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
          className="relative w-full bg-cover bg-center min-h-screen h-150 p-24 flex items-center"
          style={{ backgroundImage: `url(${img_map})` }}
        >
          {/* 🎨 Degradado azul suave */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                "linear-gradient(to right, #0d47a1, rgba(0,0,0,0.4), transparent)",
            }}
          />

          {/* Contenido */}
          <h1 className="text-white text-6xl font-bold relative z-10">
            Ven conócenos
          </h1>

          {/* 📍 Botón de mapa flotante */}
          <a
            href="https://www.google.com/maps/place/Asociaci%C3%B3n+Educativa+Prisma+de+Chincha/@-13.3980394,-76.1247566,17z/data=!3m1!4b1!4m6!3m5!1s0x911016506c0cd3e7:0x516f937d46732c24!8m2!3d-13.3980394!4d-76.1221817!16s%2Fg%2F11hb3g_fmb?entry=ttu&g_ep=EgoyMDI1MDUyNi4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D" // Cambia este enlace por el de tu ubicación
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-6 right-6 z-10 bg-[#780000] hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition duration-300"
          >
            {/* Icono de mapa (de Heroicons) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 20.25l-4.5-2.25V4.5l4.5 2.25m0 13.5l6-3V6.75m-6 13.5V6.75m6 10.5l4.5 2.25V9l-4.5-2.25"
              />
            </svg>
          </a>
        </div>

        <div className="relative bg-[#f0e4d0] py-17 px-6 md:px-32">
          <h1 className="text-[#003049] font-bold text-3xl md:text-4xl text-center mb-12">
            NUESTRA HISTORIA, IDENTIDAD Y VISIÓN
          </h1>

          {/* Línea vertical central */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-[500px]  w-1 bg-[#003049] z-0"></div>

          <div className="flex flex-col gap-2 relative z-10">
            {valoresV.map((v, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Punto central */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                  <div className="w-5 h-5 bg-white rounded-full border-4 border-blue-800 transition duration-300 hover:bg-[#003049]"></div>
                </div>

                {/* Tarjeta */}
                <div className="w-full md:w-1/2 px-6 py-4 md:px-6">
                  <div className="bg-[#003049] border border-blue-300 rounded-xl p-6 shadow-lg backdrop-blur-md">
                    <p className="text-white text-xl font-bold mb-2">
                      {v.nombre}
                    </p>
                    <p className="text-white text-sm md:text-base">
                      {v.descripcion}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* directivos */}
        <div className="bg-blue-400 flex flex-col gap-6 items-center p-8">
          <div>
            <h2 className="text-white text-4xl font-bold">Directivos</h2>
            <p className="text-white text-lg md:text-xl mt-2">
              Esta es la plantilla del personal encargado de guiar a nuestros
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
            <h1 className="text-gray-700 font-bold text-5xl">
              UNETE AL EQUIPO GANADOR
            </h1>
            <p className="font-light">
              Esta son algunos momentos en nuestra institución
            </p>
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
