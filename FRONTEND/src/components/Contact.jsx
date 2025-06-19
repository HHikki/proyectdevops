import React, { useState, useEffect } from "react";
import { Mail, Phone, User, FileText, Send, CheckCircle } from "lucide-react";
import Girl from "../assets/girl.png";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Contact() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [formData, setFormData] = useState({
    nombre: "",
    dni: "",
    telefono: "",
    correo: "",
  });

  const [focusedField, setFocusedField] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFormValid = Object.values(formData).every(
    (field) => field.trim() !== ""
  );

  const fields = [
    { key: "nombre", label: "Nombre Completo", icon: User, type: "text" },
    { key: "dni", label: "DNI", icon: FileText, type: "text" },
    { key: "telefono", label: "Teléfono", icon: Phone, type: "tel" },
    { key: "correo", label: "Correo", icon: Mail, type: "email" },
  ];

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section
      id="contact"
      className="w-full flex flex-col md:flex-row bg-white"
      data-aos="fade-up"
    >
      {/* Lado izquierdo */}
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
            className="w-72 md:w-80 object-contain"
          />
        </div>
      </div>

      {/* Formulario */}
      <div className="w-full lg:w-3/5 flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-xl">
          <div className="bg-[#780000] bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 p-6 lg:p-8">
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle
                  size={64}
                  className="text-green-500 mx-auto mb-6 animate-pulse"
                />
                <h3 className="text-2xl font-bold text-white mb-4">
                  ¡Mensaje enviado!
                </h3>
                <p className="text-white/80">
                  Nos pondremos en contacto contigo pronto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    ¡Únete a nosotros!
                  </h3>
                  <p className="text-white/90">
                    Completa el formulario y empecemos a conversar
                  </p>
                </div>

                {fields.map(({ key, label, icon: Icon, type }) => (
                  <div key={key} className="relative group">
                    <div
                      className={`relative rounded-2xl border-2 transition-all duration-300 bg-white ${
                        focusedField === key
                          ? "border-purple-400 shadow-lg scale-[1.01] bg-gradient-to-r from-purple-50 to-pink-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Icon
                          size={20}
                          className={`transition-colors duration-300 ${
                            focusedField === key
                              ? "text-purple-500"
                              : "text-gray-400"
                          }`}
                        />
                      </div>

                      <input
                        type={type}
                        value={formData[key]}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        onFocus={() => setFocusedField(key)}
                        onBlur={() => setFocusedField("")}
                        placeholder={`Ingresa tu ${label.toLowerCase()}`}
                        className="w-full pl-12 pr-4 py-4 text-gray-800 placeholder-gray-400 bg-transparent rounded-2xl focus:outline-none text-lg"
                        required
                      />

                      <label
                        className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                          formData[key] || focusedField === key
                            ? "-top-3 left-4 text-sm font-medium bg-white px-2 text-purple-600"
                            : "top-1/2 transform -translate-y-1/2 text-gray-400"
                        }`}
                      >
                        {formData[key] || focusedField === key ? label : ""}
                      </label>
                    </div>
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 group relative ${
                    isFormValid
                      ? "bg-gradient-to-r from-[#780000] to-[#003049] text-white hover:scale-105 active:scale-95"
                      : " bg-[#f0e4d0] text-[#780000] "
                  }`}
                >
                  <Send
                    size={20}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                  ÚNETE AHORA
                </button>

                <p className="text-center text-sm text-white mt-6">
                  Al enviar este formulario, aceptas que nos pongamos en
                  contacto contigo.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
