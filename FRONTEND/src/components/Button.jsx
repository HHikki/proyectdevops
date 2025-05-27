export default function Button({ children, onClick }) {
  return (
    <div className="h-screen flex items-center justify-center">
      <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
        Botón Comunicado
      </button>
    </div>
  );
}
