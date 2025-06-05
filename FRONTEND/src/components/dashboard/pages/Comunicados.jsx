import React from "react";
import { Button } from "../components/UI";
import Barra from "../components/Barra";
import HeaderPublicaciones from "../components/List/HeaderP";
import SearchP from "../components/List/SearchP";
import Registro from "../components/List/Registro";

const Comunicados = () => {
  return (
    <div className="flex-1 p-6 mt-16">
      <HeaderPublicaciones tipo={"Comunicados"} />
      <div className="mb-4">
        <SearchP />
      </div>
      <Registro />
    </div>
  );
};

export default Comunicados;