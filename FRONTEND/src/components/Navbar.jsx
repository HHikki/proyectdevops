// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  /* ───────────────── 1. Estado para el menú móvil ───────────────── */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* ───────────────── 2. Ruta / hash actual (React Router) ────────── */
  const location = useLocation();
  const currentPath = location.pathname + location.hash; // p.ej. "/Nosotros" o "/#about"

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
        <a
          href="https://www.prisma.sigedu.pe/login.php?usuario"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center text-[#003049] hover:text-[#00263d] ml-4"
        >
          <User size={24} strokeWidth={2} />
        </a>

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
          <div className="container mx-auto px-4 space-y-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-sm font-medium py-2 ${
                  currentPath === href
                    ? "text-blue-600 font-bold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {label}
              </Link>
            ))}
            <button className="w-full bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100">
              <a href="#newsletter">Acceder</a>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
