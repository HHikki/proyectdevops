import ModalWrapper from './ModalWrapper';

export default function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">¿Estás seguro?</h3>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={onConfirm}
          >
            Eliminar
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}