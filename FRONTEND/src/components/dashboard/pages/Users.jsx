import React, { useState } from "react";
import { message } from "antd";
import HeaderPublicaciones from "../components/List/HeaderP";
import ModalGeneral from "../components/List/ModalGeneral";
import FormularioUsuario from "../components/List/FormularioUsuario";
import RegistroU from "../components/List/RegistroU";
import { API_KEY, API_BASE_URL } from "../../../config/env.jsx";

const Users = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [reload, setReload] = useState(false);

  const handleNuevaUsuario = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  const handleCrearUsuario = async (values) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`${API_BASE_URL}/prisma/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Usuario creado correctamente");
        setModalVisible(false);
        setReload((r) => !r); // Recarga la tabla de usuarios
      } else {
        message.error("Error al crear usuario");
      }
    } catch (error) {
      message.error("Error de conexión");
    }
  };

  return (
    <div className="flex-1 p-6 mt-16">
      <HeaderPublicaciones
        tipo="Usuarios"
        descripcion="Gestiona todos los usuarios registrados en la plataforma"
        textoBoton="+ Nuevo Usuario"
        onNuevaPublicacion={handleNuevaUsuario}
      />
      <ModalGeneral
        visible={modalVisible}
        onClose={handleCloseModal}
        destroyOnHidden
      >
        <FormularioUsuario onFinish={handleCrearUsuario} />
      </ModalGeneral>
      
      <RegistroU reload={reload} />
    </div>
  );
};

export default Users;
