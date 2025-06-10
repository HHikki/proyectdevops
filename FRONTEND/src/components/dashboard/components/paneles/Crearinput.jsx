import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext.jsx";
import MDEditor from "@uiw/react-md-editor";
import { MdCloudUpload, MdClose } from "react-icons/md";
import { supabase } from "../../../../supas/supabaseClient.js";
import { API_BASE_URL, API_KEY } from "../../../../config/env.jsx";

export default function Crearinput({
  isOpen,
  onClose,
  onSubmit,
  Tipo = "</>",
}) {
  const [title, setTitle] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [images, setImages] = useState([]); // Archivos seleccionados
  const [previews, setPreviews] = useState([]); // URLs para preview
  const [value, setValue] = useState("**Hola Mundo**");
  const [isUploading, setIsUploading] = useState(false); // Estado de carga
  const token = localStorage.getItem("jwtToken");
  const { user } = useContext(AuthContext);
  const tipo_pub =
    {
      Evento: 1,
      Blog: 2,
      Comunicado: 3,
    }[Tipo] || 0;

  if (!isOpen) return null;

  // Función para subir una imagen individual a Supabase
  async function subirImagen(file) {
    try {
      console.log("Iniciando subida de archivo:", file.name);

      // Validar el archivo
      if (!file || file.size === 0) {
        throw new Error("Archivo inválido o vacío");
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("El archivo es demasiado grande (máximo 5MB)");
      }

      // Validar tipo de archivo
      if (!file.type.startsWith("image/")) {
        throw new Error("Solo se permiten imágenes");
      }

      // Crear nombre único para el archivo
      const fileExtension = file.name.split(".").pop();
      const nombreArchivo = `${Date.now()}_${Math.random()
        .toString(36)
        .substring(2)}.${fileExtension}`;

      console.log("Subiendo archivo como:", nombreArchivo);

      // Subir archivo a Supabase Storage
      const { data, error } = await supabase.storage
        .from("mediaprisma")
        .upload(nombreArchivo, file);

      if (error) {
        console.error("Error de Supabase Storage:", error);
        throw new Error(`Error al subir ${file.name}: ${error.message}`);
      }

      console.log("Archivo subido exitosamente:", data);

      // Obtener URL pública
      const { data: urlData } = await supabase.storage
        .from("mediaprisma")
        .getPublicUrl(nombreArchivo);

      console.log("URL pública generada:", urlData.publicUrl);

      // Verificar que la URL sea válida
      if (!urlData.publicUrl) {
        throw new Error("No se pudo generar la URL pública");
      }

      return urlData.publicUrl;
    } catch (error) {
      console.error("Error completo en subirImagen:", error);
      throw error;
    }
  }

  // Función principal para enviar datos a la base de datos
  const handPost = async () => {
    try {
      setIsUploading(true);

      // Primero subimos todas las imágenes a Supabase
      const imageUrls = [];

      for (const image of images) {
        try {
          const url = await subirImagen(image);
          imageUrls.push(url);
        } catch (error) {
          console.error("Error subiendo imagen:", error);
          // Continúa con las demás imágenes aunque una falle
        }
      }

      // Preparamos los datos para enviar a la base de datos
      const postData = {
        userId: user.id,
        postType: tipo_pub,
        title: title,
        content: value, // El contenido del editor markdown
        start_at: fechaInicio || null,
        end_at: fechaFin || null,
        images: imageUrls.map((url) => ({ image_url: url, is_cover: false })), // Array de URLs de las imágenes
      };

      console.log(postData);

      // Realizamos el fetch a tu API local
      const response = await fetch(`${API_BASE_URL}/prisma/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const result = await response.json();

      // Llamamos a la función onSubmit del padre si todo sale bien
      onSubmit(result);

      // Cerramos el modal
      onClose();

      // Limpiamos el formulario
      resetForm();
    } catch (error) {
      console.error("Error al crear publicación:", error);
      alert(`Error al crear ${Tipo}: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  // Función para limpiar el formulario
  const resetForm = () => {
    setTitle("");
    setFechaInicio("");
    setFechaFin("");
    setImages([]);
    setPreviews([]);
    setValue("**Hola Mundo**");
  };

  // Manejo de selección de imágenes con límite de 3
  const handleImage = (e) => {
    const files = Array.from(e.target.files);

    // Limitar a 3 imágenes máximo
    const selectedFiles = files.slice(0, 3 - images.length);

    if (files.length > selectedFiles.length) {
      alert(
        `Solo puedes subir máximo 3 imágenes. Se seleccionaron las primeras ${selectedFiles.length}.`
      );
    }

    if (selectedFiles.length > 0) {
      const newImages = [...images, ...selectedFiles];
      const newPreviews = [
        ...previews,
        ...selectedFiles.map((file) => URL.createObjectURL(file)),
      ];

      setImages(newImages);
      setPreviews(newPreviews);
    }
  };

  // Manejo de drag and drop con límite de 3
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    // Limitar a 3 imágenes máximo
    const selectedFiles = files.slice(0, 3 - images.length);

    if (files.length > selectedFiles.length) {
      alert(
        `Solo puedes subir máximo 3 imágenes. Se seleccionaron las primeras ${selectedFiles.length}.`
      );
    }

    if (selectedFiles.length > 0) {
      const newImages = [...images, ...selectedFiles];
      const newPreviews = [
        ...previews,
        ...selectedFiles.map((file) => URL.createObjectURL(file)),
      ];

      setImages(newImages);
      setPreviews(newPreviews);
    }
  };

  // Función para eliminar una imagen específica
  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);

    // Liberar memoria del URL del objeto
    URL.revokeObjectURL(previews[index]);

    setImages(newImages);
    setPreviews(newPreviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handPost(); // Llamamos a nuestra función de envío
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm p-4 overflow-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6 md:p-10 relative transform transition-all duration-300 animate-modalIn">
        <h2 className="text-xl font-bold mb-6 text-center">Crear {tipo_pub}</h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Título */}
            <div className="flex flex-col md:flex-row justify-between">
              <div className="w-full md:w-1/3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    placeholder={`Título del ${Tipo}`}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Fechas si es Evento */}
                {tipo_pub === 1 && (
                  <div className="flex flex-col gap-4 mt-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">
                        Fecha de Inicio
                      </label>
                      <input
                        type="datetime-local"
                        className="w-full border rounded px-3 py-2 text-sm"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">
                        Fecha de Finalización
                      </label>
                      <input
                        type="datetime-local"
                        className="w-full border rounded px-3 py-2 text-sm"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Área de subida de imágenes */}
              <div className="w-full md:w-2/3 md:ml-6">
                <label className="block text-sm font-medium mb-2">
                  Imágenes ({images.length}/3)
                </label>

                {/* Lista de imágenes seleccionadas */}
                {images.length > 0 && (
                  <div className="mb-4 space-y-2">
                    {images.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={previews[index]}
                            alt={`Preview ${index + 1}`}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900 truncate max-w-48">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Eliminar imagen"
                        >
                          <MdClose size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Área de drag and drop */}
                {images.length < 3 && (
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <div className="text-4xl text-gray-400 mb-2">
                      <MdCloudUpload />
                    </div>
                    <div className="text-gray-600 mb-2">
                      Arrastra y suelta imágenes aquí o
                    </div>
                    <label className="text-blue-600 underline cursor-pointer text-sm">
                      Seleccionar archivos
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImage}
                      />
                    </label>
                    <div className="text-xs text-gray-400 mt-2">
                      PNG, JPG o GIF (máx. 5MB) - Máximo 3 imágenes
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Editor de contenido */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Contenido
              </label>
              <MDEditor value={value} onChange={setValue} />
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
              <button
                type="button"
                className="w-full sm:w-auto px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                onClick={onClose}
                disabled={isUploading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isUploading}
              >
                {isUploading ? "Creando..." : `Crear ${Tipo}`}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
