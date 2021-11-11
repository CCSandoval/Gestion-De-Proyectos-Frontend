import CardMiProyecto from "components/CardMiProyecto";
import React from "react";

const MisProyectos = () => {
  return (
    <div className="flex flex-col justify-start items-center bg-gray-200">
      <div className="w-full text-center border-black border-b-2">
        <h1 className="text-6xl py-6">MIS PROYECTOS</h1>
      </div>
      <CardMiProyecto />
      <CardMiProyecto />
      <CardMiProyecto />
      <CardMiProyecto />
      <CardMiProyecto />
      <CardMiProyecto />
      <CardMiProyecto />
      <CardMiProyecto />
      <CardMiProyecto />
      <CardMiProyecto />
      <CardMiProyecto />
      <CardMiProyecto />
    </div>
  );
};

export default MisProyectos;
