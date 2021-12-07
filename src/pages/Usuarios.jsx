import React from "react";
import CardUser from "components/CardUser";
import { useUser } from "context/userContext";
import warning from 'img/warning.png'
import { useNavigate } from "react-router";

const Usuarios = () => {
  const navigate = useNavigate()
  const {userData} = useUser()
  if(userData.rol === "ESTUDIANTE"){
    return (
      <div className="h-full flex flex-col justify-center items-center ">
        <div className="h-full w-full flex flex-col border-black border-b-2">
          <div className="h-full w-full flex flex-col justify-center items-center">
            <img src={warning} alt="Imágen de error" />
            No tienes acceso a esta sección
            <button
              onClick={() => {
                navigate("/gpro/proyectos");
              }}
            >
              <span className="underline hover:text-gray-500">
                Ir a proyectos
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
