import { useState, useEffect, useRef } from 'react';

const gradosList = [
  '1ro Primaria', '2do Primaria', '3ro Primaria', '4to Primaria', '5to Primaria',
  '6to Primaria', '1er Año', '2do Año', '3er Año', '4to Año', '5to Año'
];

export default function GradosMultiSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef();

  // Cerrar al hacer click fuera
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const filtered = query === ''
    ? gradosList
    : gradosList.filter(g => g.toLowerCase().includes(query.toLowerCase()));

  const allSelected = value.length === gradosList.length;
  const toggleAll = () => {
    if (allSelected) onChange([]);
    else onChange(gradosList);
  };

  const toggleGrado = (grado) => {
    if (value.includes(grado)) onChange(value.filter(g => g !== grado));
    else onChange([...value, grado]);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="w-full border rounded px-3 py-2 text-left bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        {value.length === 0 ? 'Seleccionar grados' : value.join(', ')}
        <svg className="w-5 h-5 text-gray-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white border rounded shadow-lg max-h-64 overflow-auto animate-modalIn">
          <div className="p-2">
            <input
              type="text"
              className="w-full border rounded px-2 py-1 mb-2 text-sm"
              placeholder="Buscar grado..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
            />
            <div
              className="flex items-center px-2 py-1 cursor-pointer hover:bg-gray-100 rounded"
              onClick={toggleAll}
            >
              <input
                type="checkbox"
                checked={allSelected}
                readOnly
                className="mr-2"
              />
              <span className="text-sm font-medium">Seleccionar todos</span>
            </div>
            <hr className="my-1" />
            {filtered.length === 0 && (
              <div className="px-2 py-1 text-gray-400 text-sm">Sin resultados</div>
            )}
            {filtered.map(grado => (
              <div
                key={grado}
                className="flex items-center px-2 py-1 cursor-pointer hover:bg-gray-100 rounded"
                onClick={() => toggleGrado(grado)}
              >
                <input
                  type="checkbox"
                  checked={value.includes(grado)}
                  readOnly
                  className="mr-2"
                />
                <span className="text-sm">{grado}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}