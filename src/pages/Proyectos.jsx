import React from "react";
import CardProyecto from "components/CardProyecto";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Proyectos = () => {
  return (
    <div className="flex flex-col justify-start items-center bg-gray-200">
      <ToastContainer />
      <div className="w-full text-center border-black border-b-2">
        <h1 className="text-6xl py-6">PROYECTOS DE INVESTIGACIÓN</h1>
      </div>
      <Link
        to="/nuevo-proyecto"
        className="border-2 border-black shadow-md flex items-center justify-center w-11/12 mt-10 rounded-lg p-3 transition duration-200 hover:bg-gray-300"
      >
        <i className="bi bi-clipboard-plus text-5xl px-1"></i>
        <p className="text-5xl px-1">NUEVO PROYECTO</p>
      </Link>
      <CardProyecto />
      <CardProyecto />
      <CardProyecto />
      <CardProyecto />
      <CardProyecto />
      <CardProyecto />
      <CardProyecto />
      <CardProyecto />
      <CardProyecto />
      <CardProyecto />
      <CardProyecto />
      <CardProyecto />
    </div>
  );
};

export default Proyectos;
