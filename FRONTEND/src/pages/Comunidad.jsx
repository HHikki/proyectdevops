import React from "react";
import Crush from "../components/Crush";
import alumnosImg from "../assets/calendar2.jpg";
import docentesImg from "../assets/calendar3.jpg";
import padre1 from "../assets/padre1.jpg";
import padre2 from "../assets/padre2.jpg";
import galeria1 from "../assets/galeria1.jpg";
import galeria2 from "../assets/galeria2.jpg";
import galeria3 from "../assets/galeria3.jpg";
import galeria4 from "../assets/galeria4.jpg";
import galeria5 from "../assets/galeria5.jpg";
import galeria6 from "../assets/galeria6.jpg";
import pict from "../assets/calendar.jpg";

const Comunidad = () => {
  return (
    <div className="bg-white">
      <Crush pict={pict}/>

      <section className="bg-blue-950 text-white py-20 px-4 sm:px-8 lg:px-24">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">ALUMNOS - PERFIL</h2>
            <p className="mb-10 text-gray-300 text-base md:text-lg leading-relaxed">
              Celebramos a los verdaderos protagonistas de nuestra institución: nuestros alumnos.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Investigan de manera rigurosa y buscan la verdad desde una perspectiva holística.",
                "Tienen un profundo arraigo y amor por su país, su familia, su colegio y el mundo.",
                "Son conscientes de su identidad y como cristianos en el mundo.",
                "Son equilibrados, educados en el buen uso de su libertad.",
                "the quick fox jumps over the lazy dog",
                "the quick fox jumps over the lazy dog",
              ].map((text, index) => (
                <div
                  key={index}
                  className="bg-white text-black flex items-center gap-3 px-5 py-5 rounded-md shadow hover:shadow-lg transition"
                >
                  <span className="text-violet-600 font-bold text-xl">›</span>
                  <p className="text-base leading-snug">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[340px] xl:w-[400px] flex-shrink-0">
            <img src={alumnosImg} alt="Foto alumnos" className="w-full rounded-lg shadow-lg" />
            <p className="text-xs text-center mt-3 tracking-widest text-gray-300">I.E.P. GANADOR</p>
          </div>
        </div>
      </section>

      <section className="bg-[#445da7] text-white py-20 px-4 sm:px-8 lg:px-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-wide">NUESTROS PROFESORES</h2>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <img src={docentesImg} alt="Foto docentes" className="rounded-md shadow-md w-full" />
          </div>
          <div className="w-full md:w-1/2">
            <div className="w-12 h-1 bg-red-500 mb-4"></div>
            <h3 className="text-2xl font-bold mb-4">Nuestro Equipo</h3>
            <p className="text-sm md:text-base leading-relaxed text-gray-100">
              Contamos con un equipo de profesionales comprometidos con la educación y formación
              integral de nuestros estudiantes. En esta sección podrás conocer a nuestros profesores,
              sus especialidades y cómo se involucran día a día en el crecimiento de nuestra comunidad educativa.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#253367] text-white py-20 px-4 sm:px-8 lg:px-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Padres de familia</h2>
        <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
          Reconocemos y valoramos el rol fundamental que cumplen los padres en el desarrollo integral de nuestros estudiantes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[{
            img: padre1,
            texto: "Mi hijo era todo un desastre con sus tareas en su colegio anterior, ahora es todo un campeón, Prisma canalizó su mayor pasión.",
          }, {
            img: padre2,
            texto: "Me gustó el colegio, ahora mi hijo es todo un profesional, se convirtió en panadero nuclear en Francia.",
          }].map((padre, index) => (
            <div key={index} className="bg-white text-black rounded-lg shadow p-6 text-center">
              <img src={padre.img} className="mx-auto rounded-full w-20 h-20 object-cover mb-4" />
              <p className="text-sm mb-4">{padre.texto}</p>
              <div className="text-yellow-400 text-xl mb-2">★★★★☆</div>
              <p className="font-bold">Regina Miles</p>
              <p className="text-sm text-gray-500">Designer</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#445da7] text-white py-20 px-4 sm:px-8 lg:px-24">
        <h2 className="text-3xl font-bold mb-8">Galería</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {[galeria1, galeria2, galeria3, galeria4, galeria5, galeria6].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Galería ${i + 1}`}
              className="w-full h-52 object-cover rounded-md shadow-md"
            />
          ))}
        </div>
      </section>

      <footer className="bg-[#1c2540] text-white py-16 px-6 md:px-24">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
          <div>
            <h3 className="font-bold mb-3">Company Info</h3>
            <ul className="space-y-1 text-gray-300">
              <li>About Us</li>
              <li>Carrier</li>
              <li>We are hiring</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Legal</h3>
            <ul className="space-y-1 text-gray-300">
              <li>About Us</li>
              <li>Carrier</li>
              <li>We are hiring</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Features</h3>
            <ul className="space-y-1 text-gray-300">
              <li>Business Marketing</li>
              <li>User Analytic</li>
              <li>Live Chat</li>
              <li>Unlimited Support</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Resources</h3>
            <ul className="space-y-1 text-gray-300">
              <li>IOS & Android</li>
              <li>Watch a Demo</li>
              <li>Customers</li>
              <li>API</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Get In Touch</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-center gap-2">
                <span>📞</span> (480) 555-0103
              </li>
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>4577 Washington Ave. Manchester, Kentucky 39495</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span> debra.holt@example.com
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Comunidad;
