import CardMiProyecto from "components/CardMiProyecto";
import { useUser } from "context/userContext";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import warning from "img/warning.png";
import { useQuery } from "@apollo/client";
import { GET_PROYECTOS_LIDER } from "graphql/proyectos/querys";
import { toast } from "react-toastify";
import Loading from "components/Loading";
import CardProyecto from "components/CardProyecto";
const ProyectosLiderados = () => {
  const navigate = useNavigate();
  const { userData } = useUser();
  const {
    data,
    loading: loadingLider,
    error: errorLider,
  } = useQuery(GET_PROYECTOS_LIDER, {
    variables: { id: userData._id },
  });

  if (loadingLider) {
    return (
      <div className="flex flex-col h-screen">
        <Loading />
      </div>
    );
  }

  if (errorLider) {
    toast.error("Error");
  }

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
      {data.proyectosLider.map((p) => {
        return (
          <CardMiProyecto
            key={p._id}
            _id={p._id}
            nombre={p.nombre}
            lider={`${p.lider.nombres} ${p.lider.apellidos}`}
            estado={p.estado}
            fase={p.fase}
            presupuesto={p.presupuesto}
            inicio={p.fechaInicio}
            terminacion={p.fechaFin}
            objetivos={p.objetivos}
          />
        );
      })}
    </div>
  );
};

export default ProyectosLiderados;
