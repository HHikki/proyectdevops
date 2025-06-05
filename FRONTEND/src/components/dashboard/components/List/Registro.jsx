// Registro.jsx
import React, { useState } from "react";
import { Table } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";

const Registro = () => {
  const [data, setData] = useState([
    { key: "1", nombre: "Juan Pérez", edad: 28, correo: "juan@example.com" },
    { key: "2", nombre: "María López", edad: 32, correo: "maria@example.com" },
  ]);

  const handleDelete = (key) => {
    setData((prev) => prev.filter((item) => item.key !== key));
  };

  const handleEdit = (record) => {
    console.log("Editar", record);
    // Aquí podrías abrir un modal de edición
  };

  const columns = [
    {
      title: <span className="text-gray-700 font-semibold">Nombre</span>,
      dataIndex: "nombre",
      key: "nombre",
      render: (text) => <span className="text-gray-800">{text}</span>,
    },
    {
      title: <span className="text-gray-700 font-semibold">Edad</span>,
      dataIndex: "edad",
      key: "edad",
      render: (text) => <span className="text-gray-800">{text}</span>,
    },
    {
      title: <span className="text-gray-700 font-semibold">Correo</span>,
      dataIndex: "correo",
      key: "correo",
      render: (text) => <span className="text-gray-800">{text}</span>,
    },
    {
      title: "",
      key: "acciones",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(record)}
            className="flex items-center gap-1 px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            <FaEdit className="text-white" />
            Editar
          </button>
          <button
            onClick={() => handleDelete(record.key)}
            className="flex items-center gap-1 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
          >
            <FaTrash className="text-white" />
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Registro de Usuarios
      </h2>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        className="custom-table"
      />
    </div>
  );
};

export default Registro;
