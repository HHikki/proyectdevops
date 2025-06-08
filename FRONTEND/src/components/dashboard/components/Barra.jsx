import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { FiLogOut } from "react-icons/fi";

const items = [
  { label: "Dashboard", to: "/Panel", icon: "📊" },
  { label: "Publicaciones", to: "/Panel/Publicaciones", icon: "📰" },
  { label: "Eventos", to: "/Panel/Eventos", icon: "📅" },
  { label: "Comunicados", to: "/Panel/Comunicados", icon: "📢" },
  { label: "Usuarios", to: "/Panel/Usuarios", icon: "👩‍🏫" },
];

export default function Barra() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const { admin } = useContext(AuthContext);


  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <aside
      className="bg-[#1a2433] text-white w-56 min-h-screen flex flex-col py-6 px-4 sticky top-0 h-screen"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        overflowY: "auto",
      }}
    >
      <style>
        {`
          aside::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <div className="mb-8">
        <span className="font-bold text-lg">Colegio Admin</span>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {items
            .filter((_, index) => (!admin ? index !== 4 : true)) // Exclude the "Usuarios" item
            .map(({ label, to, icon }) => (
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
        <FiLogOut size={18} />
        Cerrar Sesión
      </button>
      <footer className="mt-6 text-xs text-gray-400 text-center">
        © {new Date().getFullYear()} Colegio Admin
      </footer>
    </aside>
  );
}