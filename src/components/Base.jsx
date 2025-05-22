import { BookOpen, ClipboardCheck, Flag } from 'lucide-react';

const pillars = [
  {
    title: 'ESTUDIO',
    description: 'Aprender con pasión para construir un futuro mejor.',
    icon: <BookOpen className="text-purple-600 w-10 h-10 mb-2" />,
  },
  {
    title: 'DISCIPLINA',
    description: 'El hábito que convierte el esfuerzo en resultados.',
    icon: <ClipboardCheck className="text-green-600 w-10 h-10 mb-2" />,
  },
  {
    title: 'SUPERACIÓN',
    description: 'El impulso para crecer, aprender y trascender.',
    icon: <Flag className="text-red-500 w-10 h-10 mb-2" />,
  },
];

export default function EducationalPillars() {
  return (
    <section className="bg-blue-900 text-white py-16 px-6 text-center w-full">
      <h2 className="text-3xl md:text-4xl font-bold mb-2">NUESTROS PILARES EDUCATIVOS</h2>
      <p className="text-sm md:text-base text-gray-300 mb-12">
        Educamos con propósito, valores y excelencia.
      </p>

      <div className="flex flex-col md:flex-row justify-center gap-8 mb-10">
        {pillars.map((pillar, index) => (
          <div
            key={index}
            className="bg-white text-black p-6 rounded-2xl shadow-lg w-full max-w-sm mx-auto transition transform hover:scale-105"
          >
            <div className="flex flex-col items-center">
              {pillar.icon}
              <h3 className="text-md font-bold mb-2">{pillar.title}</h3>
              <p className="text-sm text-center">{pillar.description}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold">¡Fuerza Prisma!</h3>
    </section>
  );
}
