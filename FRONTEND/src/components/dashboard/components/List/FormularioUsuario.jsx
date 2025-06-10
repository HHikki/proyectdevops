import React from "react";
import { Form, Input, Button, Select } from "antd";

const { Option } = Select;

const FormularioUsuario = ({ onFinish, onCancel }) => (
  <div className="p-2">
    <h2 className="text-2xl font-bold mb-0">Nuevo Usuario</h2>
    <p className="text-gray-500 mb-6">Crea un nuevo usuario en el sistema</p>
    <Form
      layout="vertical"
      onFinish={onFinish}
      className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2"
    >
      <Form.Item
        label={<span className="font-semibold">Nombre</span>}
        name="username"
        className="mb-4"
        rules={[{ required: true, message: "Ingrese el nombre de usuario" }]}
      >
        <Input size="large" placeholder="Nombre completo" />
      </Form.Item>
      <Form.Item
        label={<span className="font-semibold">Correo Electrónico</span>}
        name="email"
        className="mb-4"
        rules={[
          { required: true, message: "Ingrese el correo" },
          { type: "email", message: "Ingrese un correo válido" },
        ]}
      >
        <Input size="large" placeholder="correo@colegio.edu" />
      </Form.Item>
      <Form.Item
        label={<span className="font-semibold">Contraseña</span>}
        name="password"
        className="mb-4"
        rules={[{ required: true, message: "Ingrese la contraseña" }]}
      >
        <Input.Password size="large" placeholder="Contraseña" />
      </Form.Item>
      <Form.Item
        label={<span className="font-semibold">Rol</span>}
        name="is_admin"
        className="mb-4"
        rules={[{ required: true, message: "Seleccione el rol" }]}
      >
        <Select size="large" placeholder="Seleccione un rol">
          <Option value={true}>Administrador</Option>
          <Option value={false}>Usuario</Option>
        </Select>
      </Form.Item>
      <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4">
        {onCancel && (
          <Button onClick={onCancel} className="bg-gray-100">
            Cancelar
          </Button>
        )}
        <Button
          type="primary"
          htmlType="submit"
          className="bg-black hover:bg-gray-800"
        >
          Crear Usuario
        </Button>
      </div>
    </Form>
  </div>
);

export default FormularioUsuario;
