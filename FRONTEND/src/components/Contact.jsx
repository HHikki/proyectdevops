import React from "react";
import Girl from "../assets/girl.png";

export default function Contact() {
  const fields = ["Nombre Completo", "DNI", "Teléfono", "Correo", "Grado"];

  return (
    <section id="contact" className="w-full flex flex-col md:flex-row">
      {/* ───── Franja azul ───── */}
      <div
        className="w-full md:w-2/5 flex items-center justify-center py-16"
        style={{ backgroundColor: "#f0e4d0" }}
      >
        <div className="flex flex-col items-center text-center px-6">
          <h2 className="mb-4 text-4xl md:text-5xl font-extrabold text-[#003049]">
            Conversaremos contigo
          </h2>
          <p className="mb-8 max-w-sm text-[#003049]/80 text-lg">
            Déjanos tus datos y nos comunicaremos lo más pronto posible con
            usted
          </p>
          <img
            src={Girl}
            alt="Niña usando un teléfono"
            className="w-90 md:w-100 object-contain"
          />
        </div>
      </div>

      {/* ───── Formulario ───── */}
      <div className="w-full md:w-3/5 bg-white flex flex-col justify-center px-8 py-16">
        <form className="space-y-6 max-w-2xl w-full mx-auto">
          {fields.map((label, idx) => (
            <div key={idx} className="flex flex-col space-y-1">
              {/* Etiqueta fija arriba */}
              <label
                htmlFor={`field-${idx}`}
                className="text-sm text-gray-700 font-medium px-1"
              >
                {label}
              </label>

              {/* Input con fondo blanco y placeholder temporal */}
              <input
                id={`field-${idx}`}
                type="text"
                placeholder={`Insertar ${label.toLowerCase()}`}
                className="
          w-full bg-white border border-black rounded-xl
          px-5 py-3 text-base text-gray-900
          placeholder-gray-400
          focus:outline-none focus:border-[#003049]
        "
              />
            </div>
          ))}

          <button
            type="button"
            className="w-full rounded-xl bg-[#780000] py-4 text-lg font-semibold text-white transition hover:bg-[#5e0000]"
            onClick={() => alert("Formulario visual sin envío")}
          >
            ÚNETE
          </button>
        </form>
      </div>
    </section>
  );
}
