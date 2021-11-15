import React from "react";
import CardUser from "components/CardUser";
const Usuarios = () => {
  return (
    <div className="flex flex-col justify-start items-center bg-gray-200">
    <div className="w-full text-center border-black border-b-2">
      <h1 className="text-6xl py-6">Usuarios</h1>
      </div>
    <CardUser/>
    <CardUser/>
    <CardUser/>
    <CardUser/>
    </div>
  );
};

export default Usuarios;
