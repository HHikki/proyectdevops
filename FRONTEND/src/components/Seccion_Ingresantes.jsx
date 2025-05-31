import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import img1 from '../assets/Blog/ingresantes3.jpg';
import img2 from '../assets/Blog/ingresantes2.jpg';
import img3 from '../assets/Blog/ingresantes4.jpg';
import img4 from '../assets/Blog/ingresantes1.jpg';

const beige = '#f6e7cf'; // beige suave

const redes = [
  { icon: <FaFacebookF />, color: 'bg-[#4267B2] hover:bg-[#365899]' },      // Facebook
  { icon: <FaInstagram />, color: 'bg-[#E1306C] hover:bg-[#C13584]' },      // Instagram
  { icon: <FaTwitter />, color: 'bg-[#1DA1F2] hover:bg-[#0e8ddb]' }         // Twitter/X
];

const colores = [
  { border: 'border-[#D7263D]', name: 'text-[#D7263D]' },
  { border: 'border-[#A6122E]', name: 'text-[#A6122E]' },
  { border: 'border-[#5D8CA9]', name: 'text-[#5D8CA9]' },
  { border: 'border-[#3B4D61]', name: 'text-[#3B4D61]' },
];

const ingresantes = [
  {
    nombre: 'KERVIN HERRERA',
    carrera: 'Ingeniería de Telecomunicaciones',
    imagen: img1,
  },
  {
    nombre: 'RODNEY ASCORNAO',
    carrera: 'Ingeniería Mecatrónica',
    imagen: img2,
  },
  {
    nombre: 'CESAR CHOQUEZ',
    carrera: 'Ingeniería de Alimentos',
    imagen: img3,
  },
  {
    nombre: 'FABIAN CAMACHO',
    carrera: 'Ingeniería Eléctrica',
    imagen: img4,
  },
];

const StudentCard = ({ student, color }) => (
  <div
    className={`rounded-2xl shadow-md ${color.border} border-2`}
    style={{
      background: beige,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}
  >
    <img
      src={student.imagen}
      alt={student.nombre}
      className="w-full h-60 object-cover"
      loading="lazy"
    />
    <div className="flex-1 flex flex-col justify-between px-6 py-5 text-center">
      <h3 className={`font-bold text-lg mb-2 uppercase tracking-wide ${color.name}`}>
        {student.nombre}
      </h3>
      <span className="inline-block mb-2 px-3 py-1 rounded-full bg-[#f2e3d1] border border-gray-200 text-xs font-medium text-gray-600">
        INGRESANTE 2025
      </span>
      <p className="font-semibold text-base text-gray-700 mb-4">{student.carrera}</p>
      <div className="flex justify-center gap-3 mt-auto">
        {redes.map((r, idx) => (
          <a
            key={idx}
            href="#"
            className={`rounded-full w-10 h-10 flex items-center justify-center text-xl text-white shadow transition ${r.color}`}
            aria-label={["Facebook", "Instagram", "Twitter"][idx]}
          >
            {r.icon}
          </a>
        ))}
      </div>
    </div>
  </div>
);

const NuevosIngresantes = () => (
  <section style={{ background: beige }} className="py-20 px-4 min-h-screen">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-6xl font-black mb-4 text-[#3B4D61] tracking-wide uppercase">
          Nuevos Ingresantes 2025
        </h1>
        <div className="w-20 h-1 bg-[#5D8CA9] mx-auto mb-4 rounded-full"></div>
        <p className="text-lg md:text-2xl text-[#3B4D61] max-w-2xl mx-auto">
          Damos la más cordial bienvenida a nuestros ingresantes, quienes inician una nueva etapa llena de aprendizajes, retos y grandes experiencias.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {ingresantes.map((student, idx) => (
          <StudentCard key={idx} student={student} color={colores[idx % colores.length]} />
        ))}
      </div>
      <div className="text-center mt-16">
        <p className="text-xl font-bold text-[#D7263D]">
          ¡El futuro los espera!
        </p>
      </div>
    </div>
  </section>
);

export default NuevosIngresantes;
