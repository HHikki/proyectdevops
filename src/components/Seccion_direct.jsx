import React from "react";
import DIR from "../assets/foto_random.jpg";

export const Seccion_direct = () => {
  return (
    <>
      <div className="w-70 rounded-lg shadow-lg overflow-hidden">
        <section className="grid gap-5 bg-amber-50 grid-cols-2 md:grid-cols-1">
          <div>
            <img src={DIR} alt="directivo" className="h-full" />
          </div>
          <div className=" text-left md:text-center p-4">
            <p className="text-2xl font-medium mb-2">
              Fulano Sutano Mengano Soprano
            </p>
            <p className="text-gray-600 font-light">Director</p>
          </div>
        </section>
      </div>
    </>
  );
};
