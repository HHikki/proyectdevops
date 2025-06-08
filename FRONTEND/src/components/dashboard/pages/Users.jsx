import React from "react";
import Barra from "../components/Barra";
import HeaderPublicaciones from "../components/List/HeaderP";
import SearchP from "../components/List/SearchP";
import UsersView from "../components/UsersView";

const Users = () => {
  return (
    <div className="flex-1 p-6 mt-16">
      <HeaderPublicaciones tipo={"Usuarios"} />
      <div className="mb-4">
        <SearchP />
      </div>
      <UsersView isOpen={true} onClose={() => {}} />
    </div>
  );
};

export default Users;