import React from "react";
import CardProyecto from "components/CardProyecto";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useQuery } from "@apollo/client";
import { GET_PROYECTOS } from "graphql/proyectos/querys";
import Loading from "components/Loading";
const Proyectos = () => {
  const {
    data: proyectosData,
    loading: proyectosLoading,
    error: proyectosError,
  } = useQuery(GET_PROYECTOS);

  if (proyectosLoading) {
    return (
      <div className="flex flex-col h-screen">
        <Loading />
      </div>
    );
  }

  if (proyectosError) {
    return toast.error("Error consiguiendo los proyectos");
  }

  return (
    <div className="flex flex-col justify-start items-center bg-gray-200">
      <ToastContainer />
      <div className="w-full text-center border-black border-b-2">
        <h1 className="text-6xl py-6">PROYECTOS DE INVESTIGACIÓN</h1>
      </div>
      <Link
        to="/gpro/nuevo-proyecto"
        className="border-2 border-black shadow-md flex items-center justify-center w-11/12 mt-10 rounded-lg p-3 transition duration-200 hover:bg-gray-300"
      >
        <i className="bi bi-clipboard-plus text-5xl px-1"></i>
        <p className="text-5xl px-1">NUEVO PROYECTO</p>
      </Link>
      {proyectosData.Proyectos.map((p) => {
        return (
          <CardProyecto
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

export default Proyectos;
