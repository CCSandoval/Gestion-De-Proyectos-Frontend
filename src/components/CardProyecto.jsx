import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { objetivos } from "dummydb";
import { toast } from "react-toastify";
import { useUser } from "context/userContext";
const date = new Date();
const today = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
const nextYear = `${date.getDay()}/${date.getMonth()}/${
  date.getFullYear() + 1
}`;

const CardProyecto = () => {
  const [isActive, setIsActive] = useState(false);
  const { userData } = useUser();

  const [showObjectiveDialog, setShowObjectiveDialog] = useState(false);
  const [generalObjectives, setGeneralObjectives] = useState([]);
  const [specificObjectives, setSpecificObjectives] = useState([]);
  useEffect(() => {
    const general = objetivos.filter((objetivo) => objetivo.tipo === "general");
    const especific = objetivos.filter(
      (objetivo) => objetivo.tipo === "especifico"
    );
    setGeneralObjectives(general);
    setSpecificObjectives(especific);
    console.log("Especificos", especific, "\n", "Generales", general);
  }, []);

  const [showConfirmInscription, setShowConfirmInscription] = useState(false);

  return (
    <div className="border-2 border-black shadow-md flex w-11/12 mt-10 rounded-lg p-3 relative">
      <div className="h-full w-full">
        <div className="w-full flex justify-around">
          <p className="text-sm">Inicio: {today}</p>
          <p className="text-sm">Presupuesto: $9'999'999</p>
          <p className="text-sm">Fase: Desarrollo</p>
          <p className="text-sm">Terminacion: {nextYear}</p>
        </div>
        <div className="flex mt-2">
          <div className="flex flex-col w-full">
            <span className="text-md">ID DEL PROYECTO</span>
            <span className="text-lg">NOMBRE DEL PROYECTO</span>
          </div>
          <div className="w-full flex items-center justify-center">
            {userData.rol === "ESTUDIANTE" ? (
              <button
                type="button"
                className="transform duration-300 bg-green-600 hover:bg-green-500 px-10 rounded-md text-white text-lg"
                onClick={() => {
                  setShowConfirmInscription(true);
                }}
              >
                Quiero Inscribirme
              </button>
            ) : (
              <span className="transform duration-300 select-none bg-red-500 hover:bg-red-500 px-10 rounded-md text-white text-lg">No eres estudiante</span>
            )}
          </div>
          <div className="flex flex-col items-end w-full">
            <span className="text-md">Lider</span>
            <span className="text-lg">NOMBRE DEL LIDER</span>
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
          {userData.rol !== "ADMINISTRADOR" ? (
            <span className="text-2xl">
              {isActive ? "Activo" : "Inactivo"}
              <i
                className={`bi bi-bar-chart-fill ml-2 ${
                  isActive ? "text-green-700" : "text-red-700"
                }`}
              ></i>
            </span>
          ) : (
            <button
              type="button"
              className="text-2xl hover:underline"
              onClick={() => {
                setIsActive(!isActive);
              }}
            >
              {isActive ? "Activo" : "Inactivo"}
              <i
                className={`bi bi-bar-chart-fill ml-2 ${
                  isActive ? "text-green-700" : "text-red-700"
                }`}
              ></i>
            </button>
          )}
        </div>
      </div>
      <button
        type="button"
        className="text-2xl absolute bottom-1 right-2"
        onClick={() => {
          alert("Falta por hacer esto");
        }}
      >
        <i className="bi bi-pencil-square"></i>
      </button>
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
            Objetivos de [Nombre del proyecto]
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
      <Dialog
        open={showConfirmInscription}
        onBackdropClick={() => setShowConfirmInscription(false)}
      >
        <div className="py-3 px-6">
          <h1 className="text-2xl font-extrabold">
            Seguro que quieres inscribirte?
          </h1>
          <div className="flex justify-around my-3">
            <button
              onClick={() => {
                setShowConfirmInscription(false);
                toast.success("Inscripcion confirmada", {
                  position: "top-right",
                  autoClose: 2000,
                });
              }}
              className="flex items-center transform duration-300 bg-green-500 hover:bg-green-400 rounded-md px-9 py-3"
            >
              <i className="far fa-check-circle text-black text-2xl mr-3" />
              <p className="text-white font-bold text-xl">Si</p>
            </button>
            <button
              onClick={() => {
                setShowConfirmInscription(false);
              }}
              className="flex items-center transform duration-300  bg-red-500 hover:bg-red-400 rounded-md px-9 py-3"
            >
              <p className="text-white font-bold text-xl">No</p>
              <i className="far fa-times-circle text-black text-2xl ml-3" />
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CardProyecto;
