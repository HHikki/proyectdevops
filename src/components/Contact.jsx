import React from "react";
import Girl from "../assets/girl.png"; // Asegúrate de que esta ruta sea la correcta

export default function Contact() {
  return (
    <section id="contact" className="bg-[#5063a3] py-16">
      <div className="mx-auto max-w-6xl px-6 grid gap-12 md:grid-cols-2">
        {/* -------- COLUMNA IZQUIERDA -------- */}
        <div className="flex flex-col items-center text-center">
          <h2 className="mb-2 text-4xl font-extrabold text-white md:text-5xl">
            Conversaremos contigo
          </h2>
          <p className="mb-8 max-w-sm text-white/80">
            Déjanos tus datos y nos comunicaremos lo más pronto posible con
            usted
          </p>

          <div className="w-full flex justify-center">
            <img
              src={Girl}
              alt="Niña usando un teléfono"
              className="w-64 md:w-80 object-contain"
            />
          </div>
        </div>

        {/* -------- COLUMNA DERECHA (inputs visuales) -------- */}
        <div className="space-y-4 rounded-lg bg-white p-6 shadow-md">
          <input
            type="text"
            placeholder="Nombre Completo"
            className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="DNI"
            className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            placeholder="Teléfono"
            className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Correo"
            className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Grado"
            className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            className="w-full rounded-md bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            onClick={() => alert("Formulario visual sin envío")}
          >
            Únetenos
          </button>
        </div>
      </div>
    </section>
  );
}
