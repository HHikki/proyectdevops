import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import UserFormModal from "./UserFormModal";
import ConfirmModal from "./ConfirmModal";

// Funciones API
const API_URL = "http://localhost:4000/api/users";

async function fetchUsers() {
  const res = await fetch(API_URL);
  return res.json();
}
async function createUser(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
async function updateUser(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
async function deleteUser(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}

export default function UsersView({ isOpen, onClose }) {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleAdd = () => {
    setEditUser(null);
    setModalOpen(true);
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setModalOpen(true);
  };

  const handleSave = async (user) => {
    if (user.id) {
      await updateUser(user.id, user);
    } else {
      await createUser(user);
    }
    setModalOpen(false);
    fetchUsers().then(setUsers);
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    await deleteUser(userToDelete.id);
    setConfirmOpen(false);
    setUserToDelete(null);
    fetchUsers().then(setUsers);
  };

  if (!isOpen) return null;

  return (
    <div>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleAdd}
      >
        Nuevo Usuario
      </button>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Nombre</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Rol</th>
            <th className="border px-2 py-1">Estado</th>
            <th className="border px-2 py-1">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border px-2 py-1">{u.name}</td>
              <td className="border px-2 py-1">{u.email}</td>
              <td className="border px-2 py-1">{u.role}</td>
              <td className="border px-2 py-1">
                {u.status ? "Activo" : "Inactivo"}
              </td>
              <td className="border px-2 py-1">
                <button
                  className="text-blue-600 mr-2"
                  onClick={() => handleEdit(u)}
                >
                  Editar
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(u)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UserFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        user={editUser}
      />
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        message={`¿Eliminar usuario "${userToDelete?.name}"?`}
      />
    </div>
  );
}