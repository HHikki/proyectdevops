import { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import GradosMultiSelect from './GradosMultiSelect';

const grados = [
  '1° primaria', '2° primaria', '3° primaria', '4° primaria', '5° primaria',
  '1° secundaria', '2° secundaria', '3° secundaria', '4° secundaria', '5° secundaria'
];

export default function NewEventModal({ isOpen, onClose }) {
  const [title, setTitle] = useState('');
  const [fecha, setFecha] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [autor, setAutor] = useState('Coordinación');
  const [estado, setEstado] = useState('Borrador');
  const [resumen, setResumen] = useState('');
  const [gradosSel, setGradosSel] = useState([]);
  const [contenido, setContenido] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImage = e => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = e => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Aquí llamarías a tu API
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-semibold mb-1">Nuevo Evento</h2>
      <p className="mb-6 text-gray-500">Crea un nuevo evento para el colegio</p>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Título</label>
            <input
              type="text"
              className="mt-1 w-full border rounded px-3 py-2"
              placeholder="Título del evento"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block text-sm font-medium">Fecha del Evento</label>
              <input
                type="datetime-local"
                className="mt-1 w-full border rounded px-3 py-2"
                value={fecha}
                onChange={e => setFecha(e.target.value)}
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium">Ubicación</label>
              <input
                type="text"
                className="mt-1 w-full border rounded px-3 py-2"
                placeholder="Lugar del evento"
                value={ubicacion}
                onChange={e => setUbicacion(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block text-sm font-medium">Autor</label>
              <select
                className="mt-1 w-full border rounded px-3 py-2"
                value={autor}
                onChange={e => setAutor(e.target.value)}
              >
                <option>Administrador</option>
                <option>Coordinación</option>
                <option>Profesor</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium">Estado</label>
              <select
                className="mt-1 w-full border rounded px-3 py-2"
                value={estado}
                onChange={e => setEstado(e.target.value)}
              >
                <option>Borrador</option>
                <option>Publicado</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Resumen</label>
            <textarea
              className="mt-1 w-full border rounded px-3 py-2"
              placeholder="Breve descripción del evento"
              value={resumen}
              onChange={e => setResumen(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Grados</label>
            <GradosMultiSelect value={gradosSel} onChange={setGradosSel} />
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium">Imagen</label>
          <div
            className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:border-blue-400"
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
          >
            {preview ? (
              <img src={preview} alt="preview" className="h-32 object-contain mx-auto mb-2" />
            ) : (
              <>
                <div className="text-4xl text-gray-400 mb-2">⬆️</div>
                <div>Arrastra y suelta una imagen aquí o</div>
              </>
            )}
            <label className="text-blue-600 underline cursor-pointer block mt-2">
              Selecciona un archivo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />
            </label>
            <div className="text-xs text-gray-400 mt-1">PNG, JPG o GIF (máx. 5MB)</div>
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Contenido</label>
          <ReactQuill
            theme="snow"
            value={contenido}
            onChange={setContenido}
            className="bg-white"
            modules={{
              toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'align': [] }],
                ['link'],
                ['clean'],
                ['code-block']
              ]
            }}
          />
        </div>
        <div className="md:col-span-2 flex justify-end gap-2 pt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Crear evento
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}