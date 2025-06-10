import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../context/AuthContext.jsx";
import MDEditor from "@uiw/react-md-editor";
import { MdCloudUpload, MdClose } from "react-icons/md";
import { supabase } from "../../../../supas/supabaseClient.js";
import { API_BASE_URL, API_KEY } from "../../../../config/env.jsx";

export default function EditarInput({
  id,
  isOpen,
  onClose,
  onSubmit,
  Tipo = "</>",
}) {
  const [title, setTitle] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [images, setImages] = useState([]); // Archivos nuevos seleccionados
  const [previews, setPreviews] = useState([]); // URLs para preview de archivos nuevos
  const [existingImages, setExistingImages] = useState([]); // Imágenes existentes del post
  const [value, setValue] = useState("**Hola Mundo**");
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imagesToDelete, setImagesToDelete] = useState([]); // URLs de imágenes a eliminar
  
  const token = localStorage.getItem("jwtToken");
  const { user } = useContext(AuthContext);
  
  const tipo_pub = {
    Evento: 1,
    Blog: 2,
    Comunicado: 3,
  }[Tipo] || 0;

  // Cargar datos del post cuando se abre el modal
  useEffect(() => {
    if (isOpen && id) {
      loadPostData();
    }
  }, [isOpen, id]);

  // Función para cargar los datos del post existente
  const loadPostData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/prisma/post/e/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const postData = await response.json();
      
      // Llenar los campos con los datos existentes
      setTitle(postData.title || "");
      setValue(postData.content || "**Hola Mundo**");
      setFechaInicio(postData.start_at ? new Date(postData.start_at).toISOString().slice(0, 16) : "");
      setFechaFin(postData.end_at ? new Date(postData.end_at).toISOString().slice(0, 16) : "");
      
      // Cargar imágenes existentes
      if (postData.images && postData.images.length > 0) {
        setExistingImages(postData.images);
      }
      
    } catch (error) {
      console.error("Error al cargar datos del post:", error);
      alert(`Error al cargar ${Tipo}: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  // Función para subir una imagen individual a Supabase
  async function subirImagen(file) {
    try {
      console.log("Iniciando subida de archivo:", file.name);
      
      if (!file || file.size === 0) {
        throw new Error("Archivo inválido o vacío");
      }
      
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("El archivo es demasiado grande (máximo 5MB)");
      }
      
      if (!file.type.startsWith("image/")) {
        throw new Error("Solo se permiten imágenes");
      }

      const fileExtension = file.name.split(".").pop();
      const nombreArchivo = `${Date.now()}_${Math.random()
        .toString(36)
        .substring(2)}.${fileExtension}`;

      const { data, error } = await supabase.storage
        .from("mediaprisma")
        .upload(nombreArchivo, file);

      if (error) {
        console.error("Error de Supabase Storage:", error);
        throw new Error(`Error al subir ${file.name}: ${error.message}`);
      }

      const { data: urlData } = await supabase.storage
        .from("mediaprisma")
        .getPublicUrl(nombreArchivo);

      if (!urlData.publicUrl) {
        throw new Error("No se pudo generar la URL pública");
      }

      return urlData.publicUrl;
    } catch (error) {
      console.error("Error completo en subirImagen:", error);
      throw error;
    }
  }

  // Función para eliminar imagen de Supabase
  async function eliminarImagenSupabase(imageUrl) {
    try {
      // Extraer el nombre del archivo de la URL
      const fileName = imageUrl.split('/').pop();
      
      const { error } = await supabase.storage
        .from("mediaprisma")
        .remove([fileName]);

      if (error) {
        console.error("Error al eliminar imagen de Supabase:", error);
      }
    } catch (error) {
      console.error("Error eliminando imagen:", error);
    }
  }

  // Función principal para actualizar el post
  const handUpdate = async () => {
    try {
      setIsUploading(true);

      // Eliminar imágenes marcadas para eliminar
      for (const imageUrl of imagesToDelete) {
        await eliminarImagenSupabase(imageUrl);
      }

      // Subir nuevas imágenes
      const newImageUrls = [];
      for (const image of images) {
        try {
          const url = await subirImagen(image);
          newImageUrls.push(url);
        } catch (error) {
          console.error("Error subiendo imagen:", error);
        }
      }

      // Combinar imágenes existentes (no eliminadas) con las nuevas
      const remainingExistingImages = existingImages.filter(
        img => !imagesToDelete.includes(img.image_url)
      );
      
      const allImages = [
        ...remainingExistingImages,
        ...newImageUrls.map((url) => ({ image_url: url, is_cover: false }))
      ];

      // Preparar datos para actualizar
      const updateData = {
        title: title,
        content: value,
        start_at: fechaInicio || null,
        end_at: fechaFin || null,
        images: allImages,
      };

      console.log("Datos de actualización:", updateData);

      // Realizar la actualización
      const response = await fetch(`${API_BASE_URL}/prisma/post/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const result = await response.json();
      
      // Llamar a la función onSubmit del padre si todo sale bien
      if (onSubmit) {
        onSubmit(result);
      }
      
      // Cerrar el modal
      onClose();
      
      // Limpiar el formulario
      resetForm();
      
    } catch (error) {
      console.error("Error al actualizar publicación:", error);
      alert(`Error al actualizar ${Tipo}: ${error.message}`);
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
    setExistingImages([]);
    setImagesToDelete([]);
    setValue("**Hola Mundo**");
  };

  // Manejo de selección de nuevas imágenes
  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = existingImages.length + images.length;
    const availableSlots = 3 - totalImages;
    const selectedFiles = files.slice(0, availableSlots);

    if (files.length > selectedFiles.length) {
      alert(
        `Solo puedes tener máximo 3 imágenes en total. Se seleccionaron las primeras ${selectedFiles.length}.`
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

  // Manejo de drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    
    const totalImages = existingImages.length + images.length;
    const availableSlots = 3 - totalImages;
    const selectedFiles = files.slice(0, availableSlots);

    if (files.length > selectedFiles.length) {
      alert(
        `Solo puedes tener máximo 3 imágenes en total. Se seleccionaron las primeras ${selectedFiles.length}.`
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

  // Función para eliminar una nueva imagen seleccionada
  const removeNewImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    
    URL.revokeObjectURL(previews[index]);
    setImages(newImages);
    setPreviews(newPreviews);
  };

  // Función para marcar una imagen existente para eliminar
  const markExistingImageForDeletion = (imageUrl) => {
    setImagesToDelete([...imagesToDelete, imageUrl]);
    setExistingImages(existingImages.filter(img => img.image_url !== imageUrl));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handUpdate();
  };

  const totalImages = existingImages.length + images.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm p-4 overflow-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6 md:p-10 relative transform transition-all duration-300 animate-modalIn">
        <h2 className="text-xl font-bold mb-6 text-center">Editar {Tipo}</h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-lg">Cargando datos...</div>
          </div>
        ) : (
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
                
                {/* Área de manejo de imágenes */}
                <div className="w-full md:w-2/3 md:ml-6">
                  <label className="block text-sm font-medium mb-2">
                    Imágenes ({totalImages}/3)
                  </label>
                  
                  {/* Imágenes existentes */}
                  {existingImages.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Imágenes actuales:</h4>
                      <div className="space-y-2">
                        {existingImages.map((imgData, index) => (
                          <div
                            key={`existing-${index}`}
                            className="flex items-center justify-between bg-blue-50 rounded-lg p-3 border border-blue-200"
                          >
                            <div className="flex items-center space-x-3">
                              <img
                                src={imgData.image_url}
                                alt={`Imagen existente ${index + 1}`}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  Imagen existente {index + 1}
                                </p>
                                <p className="text-xs text-blue-600">Guardada</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => markExistingImageForDeletion(imgData.image_url)}
                              className="text-red-500 hover:text-red-700 p-1"
                              title="Eliminar imagen"
                            >
                              <MdClose size={20} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Nuevas imágenes seleccionadas */}
                  {images.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Nuevas imágenes:</h4>
                      <div className="space-y-2">
                        {images.map((file, index) => (
                          <div
                            key={`new-${index}`}
                            className="flex items-center justify-between bg-green-50 rounded-lg p-3 border border-green-200"
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
                                <p className="text-xs text-green-600">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB - Nueva
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeNewImage(index)}
                              className="text-red-500 hover:text-red-700 p-1"
                              title="Eliminar imagen"
                            >
                              <MdClose size={20} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Área de drag and drop para nuevas imágenes */}
                  {totalImages < 3 && (
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
                      onDrop={handleDrop}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <div className="text-4xl text-gray-400 mb-2">
                        <MdCloudUpload />
                      </div>
                      <div className="text-gray-600 mb-2">
                        Arrastra y suelta nuevas imágenes aquí o
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
                        PNG, JPG o GIF (máx. 5MB) - Máximo 3 imágenes total
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
                  className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isUploading}
                >
                  {isUploading ? "Actualizando..." : `Actualizar ${Tipo}`}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}