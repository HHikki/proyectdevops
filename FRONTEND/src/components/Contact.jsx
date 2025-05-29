import React from "react";
import Girl from "../assets/girl.png";

export default function Contact() {
  const fields = ["Nombre Completo", "DNI", "Teléfono", "Correo", "Grado"];

  return (
    <section id="contact" className="w-full flex flex-col md:flex-row">
      {/* ───── Franja azul ───── */}
      <div
        className="w-full md:w-2/5 flex items-center justify-center py-16"
        style={{ backgroundColor: "#003049" }}
      >
        <div className="flex flex-col items-center text-center px-6">
          <h2 className="mb-4 text-4xl md:text-5xl font-extrabold text-white">
            Conversaremos contigo
          </h2>
          <p className="mb-8 max-w-sm text-white/80 text-lg">
            Déjanos tus datos y nos comunicaremos lo más pronto posible con
            usted
          </p>
          <img
            src={Girl}
            alt="Niña usando un teléfono"
            className="w-64 md:w-72 object-contain"
          />
        </div>
      </div>

      {/* ───── Formulario ───── */}
      <div className="w-full md:w-3/5 bg-white flex flex-col justify-center px-8 py-16">
        <form className="space-y-6 max-w-2xl w-full mx-auto">
          {fields.map((placeholder, idx) => (
            <div key={idx} className="relative">
              {/* Input con fondo crema */}
              <input
                id={`field-${idx}`}
                type="text"
                placeholder={placeholder}
                className="
                  peer w-full bg-[#f0e4d0]
                  border-2 border-gray-300 rounded-2xl
                  px-5 py-4 text-lg outline-none
                  placeholder-transparent
                  focus:border-[#003049] focus:ring-0
                "
              />
              {/* Etiqueta flotante */}
              <label
                htmlFor={`field-${idx}`}
                className="
                  absolute -top-2 left-4
                  bg-[#f0e4d0] px-2
                  text-gray-600 text-sm
                  transition-all
                  peer-placeholder-shown:top-4 peer-placeholder-shown:left-5
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                  peer-focus:-top-2 peer-focus:left-4
                  peer-focus:text-sm peer-focus:text-[#003049]
                  pointer-events-none
                "
              >
                {placeholder}
              </label>
            </div>
          ))}

          <button
            type="button"
            className="w-full rounded-2xl bg-[#780000] py-4 text-lg font-semibold text-white transition hover:bg-[#780000]"
            onClick={() => alert("Formulario visual sin envío")}
          >
            ÚNETE
          </button>
        </form>
      </div>
    </section>
  );
}
