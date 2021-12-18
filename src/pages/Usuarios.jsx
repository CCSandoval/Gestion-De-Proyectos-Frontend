import React from "react";
import CardUser from "components/CardUser";
import { useUser } from "context/userContext";
import warning from 'img/warning.png';
import { toast } from "react-toastify";
import Loading from "components/Loading";
import { useNavigate } from "react-router";
import { useQuery } from "@apollo/client";
import { GET_USUARIOS } from "graphql/usuarios/querys";

const Usuarios = () => {
  const {
    data: usuariosData,
    loading: usuariosLoading,
    error: usuariosError,
  } = useQuery(GET_USUARIOS);
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
  if (usuariosLoading) {
    return (
      <div className="flex flex-col h-screen">
        <Loading />
      </div>
    );
  }

  if (usuariosError) {
    return toast.error("Error consiguiendo los usuarios");
  }

  
  return (
    <div className="flex flex-col justify-start items-center bg-gray-200">
    <div className="w-full text-center border-black border-b-2">
      <h1 className="text-6xl py-6">Usuarios</h1>
      </div>
      {usuariosData.Usuarios.map((u) => {
        return (
          <CardUser
            key={u._id}
            _id={u._id}
            identificacion={u.identificacion}
            nombres={u.nombres}
            apellidos={u.apellidos}
            estado={u.estado}
            correo={u.correo}
            rol={u.rol}
          />
        );
      })}
    </div>
  );
};

export default Usuarios;
