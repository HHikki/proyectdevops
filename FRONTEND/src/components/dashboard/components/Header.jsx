import React from "react";

const Header = ({ user }) => {
  return (
    <header className="w-full bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
      <h1 className="text-xl font-semibold text-gray-800">
        Panel de Administración de {user}
      </h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600 text-sm">Administrador</span>
        <img
          src="https://ui-avatars.com/api/?name=Admin"
          alt="Avatar"
          className="w-9 h-9 rounded-full border"
        />
      </div>
    </header>
  );
};

export default Header;
