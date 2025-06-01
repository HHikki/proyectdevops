import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const items = [
  { label: "Dashboard", to: "/dashboard/pages/PanelA", icon: "📊" },
  { label: "Publicaciones", to: "/dashboard/pages/Publicaciones", icon: "📰" },
  { label: "Eventos", to: "/dashboard/pages/Eventos", icon: "📅" },
  { label: "Comunicados", to: "/dashboard/pages/Comunicados", icon: "📢" },
];

export default function Barra() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes limpiar el estado de autenticación si lo necesitas
    navigate("/Login");
  };

  return (
    <aside className="bg-[#1a2433] text-white w-56 min-h-screen flex flex-col py-6 px-4">
      <div className="mb-8">
        <span className="font-bold text-lg">Colegio Admin</span>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {items.map(({ label, to, icon }) => (
            <li key={to}>
              <Link
                to={to}
                className={`flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                  location.pathname === to
                    ? "bg-[#23304a] font-semibold"
                    : "hover:bg-[#23304a]"
                }`}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button
        className="mt-auto flex items-center gap-2 text-sm text-red-300 hover:text-red-500 transition-colors"
        onClick={handleLogout}
      >
        <span>⏻</span>
        Cerrar Sesión
      </button>
    </aside>
  );
}