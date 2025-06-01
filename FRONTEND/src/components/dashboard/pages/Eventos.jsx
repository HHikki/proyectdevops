import React from "react";
import Barra from "../components/Barra";
import HeaderPublicaciones from "../components/List/HeaderP";
import SearchP from "../components/List/SearchP";
import RegistroE from "../components/ListE/RegistroE";

const Eventos = () => {
  return (
    <div className="flex min-h-screen">
      <Barra />
      <div className="flex-1 p-6 mt-16">
              <HeaderPublicaciones />
        <div className="mb-4">
          <SearchP />
        </div>
        <RegistroE />
      </div>
    </div>
  );
};

export default Eventos;