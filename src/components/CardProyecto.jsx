import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { toast } from "react-toastify";
import { useUser } from "context/userContext";
import { useMutation } from "@apollo/client";
import { CREAR_INSCRIPCION } from "graphql/inscripciones/mutations";
import { ACTIVAR_PROYECTO } from "graphql/proyectos/mutations";
import { DESACTIVAR_PROYECTO } from "graphql/proyectos/mutations";
import ReactLoading from "react-loading";

const CardProyecto = ({
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
  const { userData } = useUser();
  const [showObjectiveDialog, setShowObjectiveDialog] = useState(false);
  const [generalObjectives, setGeneralObjectives] = useState([]);
  const [specificObjectives, setSpecificObjectives] = useState([]);
  const [showConfirmInscription, setShowConfirmInscription] = useState(false);

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

  const [
    nuevaInscripcion,
    {
      data: inscripcionData,
      loading: inscripcionLoading,
      error: inscripcionError,
    },
  ] = useMutation(CREAR_INSCRIPCION);

  const crearInscripcion = (e) => {
    e.preventDefault();
    nuevaInscripcion({
      variables: { proyecto: _id, estudiante: userData._id },
    })
      .then((s) => {
        console.log(s);
        toast.success("Inscripcion enviada");
      })
      .catch((e) => {
        if (e) toast.error("Erorr enviando al inscripcion");
      });
    setShowConfirmInscription(false);
  };

  const [
    activateProject,
    { data: activateData, loading: activateLoading, error: activateError },
  ] = useMutation(ACTIVAR_PROYECTO);
  const [
    deactivateProject,
    { data: deactivateData, loading: deactivateLoader, error: deactivateError },
  ] = useMutation(DESACTIVAR_PROYECTO);

  const activarProyecto = (e) => {
    e.preventDefault();
    activateProject({ variables: { id: _id } })
      .then((s) => {
        toast.success("Proyecto activado");
        setIsActive(true);
      })
      .catch((e) => toast.error("Error activando"));
  };

  const desactivarProyecto = (e) => {
    e.preventDefault();
    deactivateProject({ variables: { id: _id } })
      .then((s) => {
        toast.success("Proyecto desactivado");
        setIsActive(false);
      })
      .catch((e) => toast.error("Error desactivando"));
  };

  return (
    <div className="border-2 border-black shadow-md flex w-11/12 mt-10 rounded-lg p-3 relative">
      <div className="h-full w-full">
        <div className="w-full flex justify-around">
          <p className="text-sm">Inicio: {inicio ? inicio.toString().split("T")[0] : "No ha iniciado"}</p>
          <p className="text-sm">Presupuesto: {presupuesto}</p>
          <p className="text-sm">Fase: {fase}</p>
          <p className="text-sm">Terminacion: {terminacion ? terminacion.toString().split("T")[0] : "No ha terminado"}</p>
        </div>
        <div className="flex mt-2">
          <div className="flex flex-col w-full">
            <span className="text-md">{_id}</span>
            <span className="text-lg">{nombre}</span>
          </div>
          <div className="w-full flex items-center justify-center">
            {userData.rol === "ESTUDIANTE" ? (
              isActive ? (
              <button
                type="button"
                className="transform duration-300 bg-green-600 hover:bg-green-500 px-10 rounded-md text-white text-lg"
                onClick={() => {
                  setShowConfirmInscription(true);
                }}
              >
                Quiero Inscribirme
              </button>
              ):(
              <span className="transform duration-300 select-none bg-red-500 hover:bg-red-500 px-10 rounded-md text-white text-lg">
                No está activo el proyecto
              </span>)
            ) : (
              <span className="transform duration-300 select-none bg-red-500 hover:bg-red-500 px-10 rounded-md text-white text-lg">
                No eres estudiante
              </span>
            )}
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
              onClick={(e) => {
                isActive ? desactivarProyecto(e) : activarProyecto(e);
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
                    <li key={objective._id} className="mb-2 hover:bg-gray-200">
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
                    <li key={objective._id} className="mb-2 hover:bg-gray-200">
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
              onClick={crearInscripcion}
              className="flex items-center transform duration-300 bg-green-500 hover:bg-green-400 rounded-md px-9 py-3"
            >
              {inscripcionLoading ? (
                <ReactLoading type="spin" height={30} width={30} />
              ) : (
                <>
                  <i className="far fa-check-circle text-black text-2xl mr-3" />
                  <p className="text-white font-bold text-xl">Si</p>
                </>
              )}
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
