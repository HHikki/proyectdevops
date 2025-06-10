import React from "react";
import { Modal } from "antd";

const ModalGeneral = ({ visible, onClose, children, title }) => (
  <Modal open={visible} onCancel={onClose} footer={null} title={title}>
    {children}
  </Modal>
);

export default ModalGeneral;
