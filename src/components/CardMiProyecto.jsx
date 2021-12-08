import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";

const CardMiProyecto = ({
  _id,
  nombre,
  lider,
  estado,
  fase,
  presupuesto,
  inicio,
  terminacion,
  objetivos,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [showObjectiveDialog, setShowObjectiveDialog] = useState(false);
  const [generalObjectives, setGeneralObjectives] = useState([]);
  const [specificObjectives, setSpecificObjectives] = useState([]);
  useEffect(() => {
    if (estado === "ACTIVO") {
      setIsActive(true);
    }
    const general = objetivos.filter((objetivo) => objetivo.tipo === "GENERAL");
    const especific = objetivos.filter(
      (objetivo) => objetivo.tipo === "ESPECIFICO"
    );
    setGeneralObjectives(general);
    setSpecificObjectives(especific);
  }, [estado, objetivos]);
  return (
    <div className="border-2 border-black shadow-md flex w-11/12 mt-10 rounded-lg p-3 relative">
      <div className="h-full w-full">
        <div className="w-full flex justify-around">
          <p className="text-sm">Inicio: {inicio}</p>
          <p className="text-sm">Presupuesto: {presupuesto}</p>
          <p className="text-sm">Fase: {fase}</p>
          <p className="text-sm">Terminacion: {terminacion}</p>
        </div>
        <div className="flex mt-2">
          <div className="flex flex-col w-full">
            <span className="text-md">{_id}</span>
            <span className="text-lg">{nombre}</span>
          </div>
          <div className="w-full flex items-center justify-center">
            <Link
              type="button"
              className="transform duration-300 bg-green-600 hover:bg-green-500 px-10 rounded-md text-white text-lg"
              to="/gpro/avances"
            >
              Ver Proyecto
            </Link>
          </div>
          <div className="flex flex-col items-end w-full">
            <span className="text-md">Lider</span>
            <span className="text-lg">{lider}</span>
          </div>
        </div>
        <div className="w-full flex justify-around px-3">
          <button
            type="button"
            className="text-2xl flex items-center hover:underline"
            onClick={() => {
              setShowObjectiveDialog(true);
            }}
          >
            <i className="bi bi-list-task text-3xl"></i>Ver los objetivos
          </button>
          <span className="text-2xl">
            {isActive ? "Activo" : "Inactivo"}
            <i
              className={`bi bi-bar-chart-fill ml-2 ${
                isActive ? "text-green-700" : "text-red-700"
              }`}
            ></i>
          </span>
        </div>
      </div>
      <Dialog
        open={showObjectiveDialog}
        onBackdropClick={() => setShowObjectiveDialog(false)}
        scroll="paper"
        maxWidth={true}
      >
        <button
          onClick={() => setShowObjectiveDialog(false)}
          className="absolute top-0 right-1 text-lg"
        >
          <i className="fas fa-times-circle text-gray-400" />
        </button>
        <div className="flex flex-col p-3">
          <h1 className="text-center font-extrabold text-xl mb-2">
            Objetivos de {nombre}
          </h1>
          <div className="flex justify-around">
            <div className="w-1/2 flex flex-col max-h-5/6 mr-1 rounded-sm border border-black py-1 px-2">
              <h2 className="text-center font-bold text-lg">Generales</h2>
              <ul className="max-h-96 overflow-y-scroll">
                {generalObjectives.map((objective) => {
                  return (
                    <li className="mb-2 hover:bg-gray-200">
                      {objective.descripcion}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="w-1/2 flex flex-col ml-1 rounded-sm border border-black py-1 px-2">
              <h2 className="text-center font-bold text-lg">Especificos</h2>
              <ul className="max-h-96 overflow-y-scroll">
                {specificObjectives.map((objective) => {
                  return (
                    <li className="mb-2 hover:bg-gray-200">
                      {objective.descripcion}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CardMiProyecto;
