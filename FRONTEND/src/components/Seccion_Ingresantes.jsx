import React from "react";
import img1 from "../assets/Blog/ingresantes3.jpg";
import img2 from "../assets/Blog/ingresantes2.jpg";
import img3 from "../assets/Blog/ingresantes4.jpg";
import img4 from "../assets/Blog/ingresantes1.jpg";

const ingresantes = [
  {
    nombre: "KERVIN HERRERA",
    carrera: "Ingeniería de Telecomunicaciones",
    imagen: img1,
  },
  {
    nombre: "RODNEY ASCORNAO",
    carrera: "Ingeniería Mecatrónica",
    imagen: img2,
  },
  {
    nombre: "CESAR CHOQUEZ",
    carrera: "Ingeniería de Alimentos",
    imagen: img3,
  },
  {
    nombre: "FABIAN CAMACHO",
    carrera: "Ingeniería Eléctrica",
    imagen: img4,
  },
];

const NuevosIngresantes = () => {
  return (
    <section className="bg-gradient-to-br from-[#5b6aa4] to-[#1C2D5A] text-white py-14 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-purple-200 text-base font-semibold tracking-widest uppercase mb-2 text-center">
          Conócenos
        </h2>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-5 text-center drop-shadow-lg">
          NUEVOS INGRESANTES 2025
        </h1>
        <p className="mb-10 max-w-3xl mx-auto text-center text-lg md:text-xl text-purple-100">
          Damos la más cordial bienvenida a nuestros cachimbos, quienes inician una nueva etapa llena de aprendizajes, retos y grandes experiencias. ¡Esta es su casa, y juntos construiremos un gran camino!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {ingresantes.map((item, i) => (
            <div
              key={i}
              className="bg-white/90 text-black rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group flex flex-col h-full"
            >
              <div className="overflow-hidden">
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="w-full h-52 md:h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between p-4 text-center">
                <div>
                  <h3 className="font-bold text-lg mb-1">{item.nombre}</h3>
                  <p className="text-gray-500 text-xs tracking-widest mb-1">INGRESANTE</p>
                  <p className="text-purple-700 font-medium mb-2">{item.carrera}</p>
                </div>
                <div className="flex justify-center gap-4 mt-2 text-purple-600 text-lg">
                  <a href="#" className="hover:text-blue-700 transition-colors duration-200">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="hover:text-pink-600 transition-colors duration-200">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="hover:text-blue-400 transition-colors duration-200">
                    <i className="fab fa-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NuevosIngresantes;