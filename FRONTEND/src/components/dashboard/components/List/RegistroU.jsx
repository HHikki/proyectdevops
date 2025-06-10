import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, Tag, message } from "antd";
import { API_KEY, API_BASE_URL } from "../../../../config/env.jsx";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const RegistroU = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("jwtToken");
        const response = await fetch(`${API_BASE_URL}/prisma/users/`, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Error al obtener usuarios");
        const data = await response.json();
        setUsuarios(
          data.map((user, idx) => ({
            key: user.id || idx,
            id: user.id,
            username: user.username || "Sin usuario",
            email: user.email || "Sin correo",
            password: "********", // Nunca mostrar la real
            role: user.is_admin ? "Administrador" : "Usuario",
          }))
        );
      } catch (error) {
        message.error("No se pudieron cargar los usuarios");
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  const handleEdit = (record) => {
    // Aquí va la lógica para editar usuario
    message.info(`Editar usuario: ${record.username}`);
  };

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(
        `${API_BASE_URL}/prisma/users/${record.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Error al eliminar usuario");
      setUsuarios((prev) => prev.filter((u) => u.id !== record.id));
      message.success("Usuario eliminado correctamente");
    } catch (error) {
      message.error("No se pudo eliminar el usuario");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Usuario",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Correo",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contraseña",
      dataIndex: "password",
      key: "password",
      render: () => "********",
    },
    {
      title: "Rol",
      dataIndex: "role",
      key: "role",
      render: (role) =>
        role === "Administrador" ? (
          <Tag color="blue">Administrador</Tag>
        ) : (
          <Tag color="default">Usuario</Tag>
        ),
    },
    {
      title: "Editar",
      key: "edit",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => handleEdit(record)}
          icon={<EditOutlined />}
        />
      ),
    },
    {
      title: "Eliminar",
      key: "delete",
      render: (_, record) => (
        <Popconfirm
          title="¿Seguro que deseas eliminar este usuario?"
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
    <Table
      columns={columns}
      dataSource={usuarios}
      loading={loading}
      pagination={{ pageSize: 10 }}
      bordered
    />
  );
};

export default RegistroU;
