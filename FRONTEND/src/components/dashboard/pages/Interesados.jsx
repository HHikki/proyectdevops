import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { API_KEY, API_BASE_URL } from "../../../config/env.jsx";

export const Interesados = () => {
  const [interesados, setInteresados] = useState([]);
  const [loading, setLoading] = useState(true);

  // Se obtiene la lista de interesados al montar el componente
  useEffect(() => {
    fetchInteresados();
  }, []);

  const fetchInteresados = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`${API_BASE_URL}/prisma/getform`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Error al obtener los interesados");
      const data = await response.json();
      console.log(data);
      setInteresados(
        data.map((item, idx) => ({
          key: item.id || idx,
          ...item,
        }))
      );
    } catch (error) {
      message.error("No se pudieron cargar los interesados");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(
        `${API_BASE_URL}/prisma/delfrom/${record.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Error al eliminar");
      // Actualiza la lista eliminando el registro borrado
      setInteresados((prev) => prev.filter((item) => item.id !== record.id));
      message.success("Interesado eliminado correctamente");
    } catch (error) {
      message.error("No se pudo eliminar al interesado");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "DNI",
      dataIndex: "dni",
      key: "dni",
    },
    {
      title: "Teléfono",
      dataIndex: "telefono",
      key: "telefono",
    },
    {
      title: "Correo",
      dataIndex: "correo",
      key: "correo",
    },
    {
      title: "Grado",
      dataIndex: "grado",
      key: "grado",
    },
    {
      title: "Nivel",
      dataIndex: "nivel",
      key: "nivel",
    },
    {
      title: "Fecha de Envío",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <Popconfirm
          title="¿Seguro que deseas eliminar este interesado?"
          onConfirm={() => handleDelete(record)}
          okText="Sí"
          cancelText="No"
        >
          <Button type="link" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="w-full flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-4">Interesados</h2>
      {/* Contenedor con overflow para manejar tablas anchas en dispositivos pequeños */}
      <div className="w-full overflow-x-auto">
        <Table
          columns={columns}
          dataSource={interesados}
          loading={loading}
          pagination={{ pageSize: 5 }}
          bordered
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};
