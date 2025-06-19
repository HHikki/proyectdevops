import React from "react";
import Girl from "../assets/girl.png";
import { API_KEY, API_BASE_URL } from "../../src/config/env.jsx";

export default function Contact() {

  const level = "General";


  
  const handleSubmit = async (e)=>{
    e.preventDefault();

    const formData = new FormData(e.target);
    const nombre = formData.get("nombre");
    const dni = formData.get("dni");
    const telefono = formData.get("telefono");
    const correo = formData.get("correo");
    const grado = "Consultar";

    if (!nombre || !dni || !telefono || !correo) {
      alert(
        "Por favor, completa todos los campos"
      );
      return;
    }

    const data = {
      nombre,
      dni,
      telefono,
      correo,
      grado,
      nivel: level,
    };

    // Construir headers condicionalmente
        const headers = {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        };
        console.log(data)
        try {
          const response = await fetch(`${API_BASE_URL}/prisma/upform`, {
            method: "POST",
            headers,
            body: JSON.stringify(data),
          });
    
          if (!response.ok) throw new Error("Error al enviar la información");
    
          alert("¡Registro enviado correctamente!");
        } catch (error) {
          alert(`Error: ${error.message}`);
        };
  };





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
      <div className="w-full md:w-3/5 bg-gray-50 flex flex-col justify-center px-8 py-16">
        <form
          className="space-y-3 max-w-2xl w-full mx-auto"
          onSubmit={handleSubmit}
        >
          {[
            {
              label: "Nombre Completo",
              placeholder: "Insertar nombre completo",
              id: "nombre",
            },
            { label: "DNI", placeholder: "Insertar DNI", id: "dni" },
            {
              label: "Teléfono",
              placeholder: "Insertar teléfono",
              id: "telefono",
            },
            {
              label: "Correo",
              placeholder: "Insertar correo",
              id: "correo",
              type: "email",
            },
          ].map(({ label, placeholder, id, type }) => (
            <div key={id}>
              <label
                className="block text-[#003049] font-semibold mb-1 ml-1"
                htmlFor={id}
              >
                {label}
              </label>
              <input
                id={id}
                name={id}
                type={type || "text"}
                className="w-full px-4 py-2.5 rounded-xl border border-[#003049] bg-white/70 shadow-inner
                  focus:ring-2 focus:ring-[#6698BC] focus:border-[#003049] outline-none
                  placeholder-gray-400 transition-all duration-200"
                placeholder={placeholder}
                autoComplete="off"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full rounded-xl bg-[#780000] py-4 text-lg font-semibold text-white transition hover:bg-[#5e0000]"
          >
            ÚNETE
          </button>
        </form>
      </div>
    </section>
  );
}
