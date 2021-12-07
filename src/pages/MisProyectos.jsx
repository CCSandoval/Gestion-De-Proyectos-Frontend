import CardMiProyecto from "components/CardMiProyecto";
import { useUser } from "context/userContext";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import warning from "img/warning.png";

const MisProyectos = () => {
  const navigate = useNavigate();
  const { userData } = useUser();
  const [proyectos, setProyectos] = useState([]);

  if (userData.rol === "ADMINISTRADOR") {
    return (
      <div className="h-full flex flex-col justify-center items-center ">
        <div className="h-full w-full flex flex-col border-black border-b-2">
          <div className="h-full w-full flex flex-col justify-center items-center">
            <img src={warning} alt="Imágen de error" />
            No tienes acceso a esta sección
            <button
              onClick={() => {
                navigate("/gpro/usuarios");
              }}
            >
              <span className="underline hover:text-gray-500">
                Ir a usuarios
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

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
