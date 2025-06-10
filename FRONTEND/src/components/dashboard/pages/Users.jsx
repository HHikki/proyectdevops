import React, { useState } from "react";
import HeaderPublicaciones from "../components/List/HeaderP";
import ModalGeneral from "../components/List/ModalGeneral";
import FormularioUsuario from "../components/List/FormularioUsuario";
import RegistroU from "../components/List/RegistroU";

const Users = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleNuevaUsuario = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  const handleCrearUsuario = (values) => {
    // Aquí haces la petición para crear el usuario
    // Luego cierras el modal
    setModalVisible(false);
  };

  return (
    <div className="flex-1 p-6 mt-16">
      <HeaderPublicaciones
        tipo="Usuarios"
        descripcion="Gestiona todos los usuarios registrados en la plataforma"
        textoBoton="+ Nuevo Usuario"
        onNuevaPublicacion={handleNuevaUsuario}
      />
      <ModalGeneral visible={modalVisible} onClose={handleCloseModal}>
        <FormularioUsuario onFinish={handleCrearUsuario} />
      </ModalGeneral>
      <RegistroU />
    </div>
  );
};

export default Users;
