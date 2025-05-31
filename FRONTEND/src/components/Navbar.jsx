// src/components/Navbar.jsx
import React, { useState, useEffect, useContext } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  /* ───────────────── 1. Estado para el menú móvil ───────────────── */
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  /* ───────────────── 2. Ruta / hash actual (React Router) ────────── */
  const location = useLocation();
  const currentPath = location.pathname + location.hash; // p.ej. "/Nosotros" o "/#about"

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  /* ───────────────── 3. Datos de navegación ─────────────────────── */
  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/Nosotros", label: "Nosotros" },
    { href: "/Blog", label: "Blog" },
    { href: "/Comunicado", label: "Eventos y Comunicados" },
    { href: "/Comunidad", label: "Comunidad" },
  ];

  /* ───────────────── 4. Backdrop / sombra al hacer scroll ───────── */
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".navbar-header");
      if (!header) return;
      if (window.scrollY >= 80) header.classList.add("scroll-header");
      else header.classList.remove("scroll-header");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ───────────────── 5. Render ───────────────────────────────────── */
  return (
    <nav className="navbar-header fixed top-0 left-0 right-0 bg-white backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
      <div className="w-full container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 md:h-16 h-12">
        {/* ─── Logo ─── */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <img
            src="/src/assets/insignia_prima.png"
            alt="Insignia del colegio"
            className="w-10 h-10 object-contain"
          />
          <span className="text-lg font-semibold" style={{ color: "#003049" }}>
            PRISMA
          </span>
        </Link>

        {/* ─── Links desktop ─── */}
        <div className="hidden md:flex items-center gap-10 ml-auto">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#003049] after:transition-all ${
                currentPath === href
                  ? "text-[#003049] font-bold after:w-full"
                  : "text-[#003049] hover:text-[#00263d]"
              }`}
            >
              {label}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              <Link
                to="/Panel"
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Panel
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                Cerrar Sesión
              </button>
            </>
          ) :   (
            <Link
              to="/Login"
              className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              <User className="h-4 w-4" />
              Iniciar Sesión
            </Link>
          )}
        </div>

        {/* ─── Botones externos (desktop) ─── */}
        <a
          href="https://www.prisma.sigedu.pe/login.php?usuario"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center justify-center w-35 h-17 bg-[#003049] text-white text-sm font-medium transition-all hover:bg-[#00263d] ml-4"
        >
          SIGEDU
        </a>
        <Link
          to="/Login"
          className="hidden md:flex items-center text-[#003049] hover:text-[#00263d] ml-4"
        >
          <User size={24} strokeWidth={2} />
        </Link>

        {/* ─── Toggle móvil ─── */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <HiX className="size-6" /> : <HiMenu />}
        </button>
      </div>

      {/* ─── Menú móvil ─── */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4">
          <div className="container mx-auto px-4 space-y-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                className={`block text-sm font-medium ${
                  currentPath === href ? "text-blue-600" : "text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link
                  to="/Panel"
                  className="block text-sm font-medium text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Panel
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-sm font-medium text-red-600"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link
                to="/Login"
                className="flex items-center gap-1 text-sm font-medium text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-4 w-4" />
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
