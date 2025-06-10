import React from "react";
import Barra from "../components/Barra";
import HeaderPublicaciones from "../components/List/HeaderP";
import SearchP from "../components/List/SearchP";
import Registro from "../components/List/Registro";

const Publicaciones = () => {
  return (
    <div className="flex-1 p-6 mt-16">
      <HeaderPublicaciones tipo={"Blog"} />
      <div className="mb-4">
        <SearchP />
      </div>
      <Registro layoutMode={2} tipo={"Blog"} />
    </div>
  );
};

export default Publicaciones;