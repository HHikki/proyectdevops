import React, { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";

const roles = ["Administrador", "Editor", "Visualizador"];
const allPermissions = [
  { key: "Crear", label: "Crear publicaciones" },
  { key: "Editar", label: "Editar publicaciones" },
  { key: "Eliminar", label: "Eliminar publicaciones" },
  { key: "Admin", label: "Gestionar usuarios" },
];

export default function UserFormModal({ isOpen, onClose, onSave, user }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Editor");
  const [status, setStatus] = useState(true);
  const [permissions, setPermissions] = useState(["Crear", "Editar"]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setRole(user.role || "Editor");
      setStatus(user.status !== undefined ? user.status : true);
      setPermissions(user.permissions || []);
    } else {
      setName("");
      setEmail("");
      setRole("Editor");
      setStatus(true);
      setPermissions(["Crear", "Editar"]);
    }
  }, [user, isOpen]);

  const handlePerm = (perm) => {
    setPermissions((prev) =>
      prev.includes(perm)
        ? prev.filter((p) => p !== perm)
        : [...prev, perm]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: user?.id,
      name,
      email,
      role,
      status,
      permissions,
    });
  };

  if (!isOpen) return null;

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded">
        <h2 className="text-lg font-bold mb-4">
          {user ? "Editar Usuario" : "Nuevo Usuario"}
        </h2>
        <div className="mb-2">
          <label className="block">Nombre</label>
          <input
            className="border rounded w-full px-2 py-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <label className="block">Email</label>
          <input
            className="border rounded w-full px-2 py-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />
        </div>
        <div className="mb-2">
          <label className="block">Rol</label>
          <select
            className="border rounded w-full px-2 py-1"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Estado</label>
          <select
            className="border rounded w-full px-2 py-1"
            value={status ? "activo" : "inactivo"}
            onChange={(e) => setStatus(e.target.value === "activo")}
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Permisos</label>
          <div className="flex flex-wrap gap-2">
            {allPermissions.map((perm) => (
              <label key={perm.key} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={permissions.includes(perm.key)}
                  onChange={() => handlePerm(perm.key)}
                />
                {perm.label}
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Guardar
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}