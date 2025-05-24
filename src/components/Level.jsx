import React from "react";

const levels = [
  {
    name: "INICIAL",
    img: "/src/assets/img1.jpg", 
  },
  {
    name: "PRIMARIA",
    img: "/src/assets/img2.jpg", 
  },
  {
    name: "SECUNDARIA",
    img: "/src/assets/img3.jpg", 
  },
];

export default function Level() {
    return (
    <section className="bg-blue-800 py-12 px-4">
    <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10 tracking-wide">
        NUESTROS NIVELES EDUCATIVOS
        </h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-10">
        {levels.map((level) => (
          <div key={level.name} className="flex flex-col items-center">
            <img
              src={level.img}
              alt={level.name}
              className="w-120 h-104 object-cover rounded-xl shadow mb-6"
            />
            <span className="bg-blue-600 text-white text-base md:text-lg font-bold rounded-lg px-8 py-3 text-center shadow hover:bg-blue-700 transition">
              {level.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}