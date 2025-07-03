import React from "react";
import { Modal } from "antd";

const ModalGeneral = ({
  visible,
  onClose,
  destroyOnHidden,
  children,
  title,
}) => (
  <Modal
    open={visible}
    onCancel={onClose}
    footer={null}
    title={title}
    destroyOnHidden={destroyOnHidden} // <-- Usa la nueva prop recomendada
  >
    {children}
  </Modal>
);

export default ModalGeneral;
