import React from "react";

const Modal = ({ id, isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

return (
    <div
        className="fixed inset-0 flex items-center justify-center"
        style={{ background: "rgba(255,255,255,0.5)", backdropFilter: "blur(4px)" }}
    >
        <div className="bg-white p-6 rounded shadow-lg">
            <p className="text-lg font-semibold">¿Quieres confirmar?</p>
            <div className="mt-4 flex flex-col gap-1">
                <p className="text-center font-bold pb-2">{id}</p>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded transition duration-150 hover:bg-red-600 active:bg-red-700 focus:outline-none"
                    onClick={onConfirm}
                >
                    Confirmar
                </button>
                <button
                    className="bg-gray-500 text-white px-4 py-2 rounded transition duration-150 hover:bg-gray-600 active:bg-gray-700 focus:outline-none"
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>
        </div>
    </div>
);
};

export default Modal;
