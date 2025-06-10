import React, { useContext, useState } from "react";
import { Table, message } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../Modal.jsx";
import { API_KEY, API_BASE_URL } from "../../../../config/env.jsx";
import { AuthContext } from "../../../../context/AuthContext.jsx";

const Registro = ({ layoutMode = 0, posts = [] }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { user, admin } = useContext(AuthContext);
  const [selectedKey, setSelectedKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("jwtToken");

  const handleOpenModal = (record) => {
    if (record) {
      setSelectedKey(record);
      setModalOpen(true);
    }
  };

  const handleConfirm = async () => {
    if (!selectedKey) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/prisma/post/${selectedKey.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Error al eliminar el registro");

      message.success("Registro eliminado correctamente");
      setModalOpen(false);
      // Aquí podrías emitir un evento o pedir al padre que recargue los datos si lo necesitas
    } catch (error) {
      console.error("Error:", error);
      message.error("No se pudo eliminar el registro");
    } finally {
      setLoading(false);
    }
  };

  const procesarFechas = (fechaString) => {
    if (!fechaString) return "Fecha no disponible";
    try {
      const fecha = new Date(fechaString);
      if (isNaN(fecha.getTime())) return "Fecha inválida";
      return fecha.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch (error) {
      console.error("Error al procesar fecha:", error);
      return "Error en formato de fecha";
    }
  };

  // Procesa los datos recibidos por props
  const processedData = posts
    .filter((item) => item.postTypeId === layoutMode || layoutMode === 0)
    .map((item, index) => ({
      key: item.id || index,
      id: item.id,
      titulo: item.title || "Título no disponible",
      autor: item.user?.username || item.autor || "Autor no disponible",
      fecha: procesarFechas(item.created_at),
      duracion:
        item.start_at && item.end_at
          ? `${procesarFechas(item.start_at)} - ${procesarFechas(item.end_at)}`
          : "Duración no disponible",
    }));

  // Columnas comunes
  const commonColumns = {
    titulo: {
      title: "Título",
      dataIndex: "titulo",
      key: "titulo",
    },
    autor: {
      title: "Autor",
      dataIndex: "autor",
      key: "autor",
    },
    fecha: {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
    },
    duracion: {
      title: "Duración",
      dataIndex: "duracion",
      key: "duracion",
    },
    edit: {
      title: "Editar",
      key: "edit",
      render: (_, record) => (
        <button
          onClick={() => console.log("Editar:", record)}
          className="text-blue-600 hover:text-blue-800"
        >
          <FaEdit />
        </button>
      ),
    },
    delete: {
      title: "Eliminar",
      key: "delete",
      render: (_, record) => (
        <button
          onClick={() => handleOpenModal(record)}
          className="text-red-600 hover:text-red-800"
        >
          <FaTrash />
        </button>
      ),
    },
  };

  const columns =
    layoutMode === 1
      ? [
          commonColumns.titulo,
          commonColumns.autor,
          commonColumns.fecha,
          commonColumns.duracion,
          commonColumns.edit,
          commonColumns.delete,
        ]
      : [
          commonColumns.titulo,
          commonColumns.autor,
          commonColumns.fecha,
          commonColumns.edit,
          commonColumns.delete,
        ];

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <Table
        columns={columns}
        dataSource={processedData}
        pagination={false}
        loading={loading}
        locale={{
          emptyText: loading ? "Cargando..." : "No hay datos disponibles",
        }}
        className="w-full"
      />

      {selectedKey && (
        <Modal
          id={selectedKey.titulo}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default Registro;
