// Registro.jsx
import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import { API_KEY, API_BASE_URL } from "../../../../config/env.jsx"; // Asegúrate de que la ruta sea correcta

const Registro = ({ layoutMode = 0 }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const procesarFechas = (fechaString) => {
    if (!fechaString) return "Fecha no disponible"; // Manejo de valores nulos

    // Extraer fechas sin importar si tienen "Z" o no
    const fechas =
      fechaString.match(
        /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3}|\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/g
      ) || [];

    return fechas
      .map((fecha) => {
        const date = new Date(fecha);
        return `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
      })
      .join(" - ");
  };

  // Simulamos un fetch desde un archivo o endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(`${API_BASE_URL}/prisma/post/page`, {
          headers: {
            "x-api-key": API_KEY, // Agregar la API Key en los headers
          },
          cache: "no-cache",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Datos obtenidos:", data);
            setData(
              data.filter(item => item.postTypeId === layoutMode) // Filtrar solo eventos
              .map((item, index) => ({
                key: index,
                titulo: item.title || "Título no disponible",
                autor: item.user.username || "Autor no disponible",
                fecha: procesarFechas(item.created_at) || "Fecha no disponible",
                duracion:
                  procesarFechas(item.start_at) +
                    " - " +
                    procesarFechas(item.start_at) || "Fecha no disponible",
              }))
            );
          })
          .catch((error) => console.error("Error al obtener datos:", error));
      } catch (error) {
        console.error("Error en fetch:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
          onClick={() => console.log("Eliminar:", record)}
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
        dataSource={data}
        pagination={false}
        loading={loading}
        className="w-full"
      />
    </div>
  );
};

export default Registro;
