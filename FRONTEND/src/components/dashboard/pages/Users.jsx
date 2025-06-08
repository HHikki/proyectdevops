import React from "react";
import Barra from "../components/Barra";
import HeaderPublicaciones from "../components/List/HeaderP";
import SearchP from "../components/List/SearchP";
import Registro from "../components/List/Registro";

const Users = () => {
  return (
    <div className="flex-1 p-6 mt-16">
      <HeaderPublicaciones tipo={"Usuarios"} />
      <div className="mb-4">
        <SearchP />
      </div>
      <p className="text-gray-400 text-5xl">Lista Aqui</p>
    </div>
  );
};

export default Users;
