import { Dialog, Tooltip } from "@material-ui/core";
import React from "react";
import { useState, useEffect } from "react";
import { useUser } from "context/userContext";
import { useMutation } from "@apollo/client";
import { EDITAR_AVANCE } from "graphql/avances/mutations";
import { toast, ToastContainer } from "react-toastify";
import { NUEVA_OBSERVACION } from "graphql/avances/mutations";

const CardAvances = ({ id, fecha, descripcion, estudiante, observaciones }) => {
  const { userData } = useUser();
  const [checkInfo, setCheckInfo] = useState(false);
  const [isediting, setIsediting] = useState(false);
  const [descripcionState, setDescripcionState] = useState(descripcion);
  const [editarAvance, { data: editAvanceData, loading, error }] =
    useMutation(EDITAR_AVANCE);
  const [
    nuevaObservacion,
    {
      data: nuevaObservacionData,
      loading: nuevaObservacionLoading,
      error: nuevaObservacionError,
    },
  ] = useMutation(NUEVA_OBSERVACION);
  const [showCrearObservacion, setShowCrearObservacion] = useState(false);
  const [observacion, setObservacion] = useState("");

  const editAvance = () => {
    editarAvance({
      variables: {
        id: id,
        descripcion: descripcionState,
      },
    });
  };

  const CrearObservacion = () => {
    observacion
      ? nuevaObservacion({ variables: { id: id, observacion: observacion } })
          .then((s) => {
            console.log(s);
            toast.success("Observación creada con éxito");
            setObservacion("");
            setShowCrearObservacion(false)
          })
          .catch((e) => {
            console.log(e);
            toast.error("Error creando la observación");
            setObservacion("");
            setShowCrearObservacion(false)
          })
      : toast.error("Ingresa una observacion");
  };

  useEffect(() => {
    if (editAvanceData) {
      toast.success("Avance Editado con éxito");
    }
  }, [editAvanceData]);

  const Icono = () => {
    if (userData.rol !== "LIDER") {
      return (
        <button
          onClick={() => {
            setCheckInfo(!checkInfo);
          }}
          className="flex flex-col justify-center items-center"
        >
          <span className="text-xs">Ver Observación</span>
          <i className={`bi bi-info-circle w-1/2 text-5xl`}></i>
        </button>
      );
    } else {
      return (
        <button
          onClick={() => setShowCrearObservacion(true)}
          className="flex flex-col justify-center items-center"
        >
          <span className="text-xs">Añadir Observación</span>
          <i className={`bi bi-plus-circle w-1/2 text-5xl`}></i>
        </button>
      );
    }
  };

  return (
    <div className="flex flex-col p-2 border-2 border-gray-500 m-5 rounded-lg">
      <div className="flex w-full justify-between p-2">
        <span>{`Id del avance: ${id}`}</span>
        <span>{`Responsable: ${estudiante}`}</span>
        <span>{`Fecha ${fecha.toString().split("T")[0]}`}</span>
      </div>
      <div className="flex w-full justify-around">
        {isediting ? (
          <div className="flex w-3/4 m-1 p-1">
            <div className="flex flex-col">
              <span>Aportes del Avance: </span>
              <div className="flex flex-row">
                <Tooltip title="Confirmar edición" arrow>
                  <i
                    className="bi bi-check-circle-fill cursor-pointer m-1 text-xl text-green-500 font-bold hover:text-green-700 shadow-md"
                    onClick={() => {
                      editAvance();
                      setIsediting(false);
                    }}
                  ></i>
                </Tooltip>
                <Tooltip title="Cancelar edición" arrow>
                  <i
                    className="bi bi-x-circle-fill cursor-pointer m-1 text-xl text-red-500 font-bold hover:text-red-700 shadow-md"
                    onClick={() => {
                      setDescripcionState(descripcion);
                      setIsediting(false);
                    }}
                  ></i>
                </Tooltip>
              </div>
            </div>
            <textarea
              type="text"
              value={descripcionState}
              onChange={(e) => {
                setDescripcionState(e.target.value);
              }}
              className="w-full p-1 m-1 overflow-y-scroll rounded-md focus:outline-none focus:ring"
            ></textarea>
          </div>
        ) : (
          <div className="flex w-3/4 m-1 p-1">
            <div className="flex flex-col">
              <span>Aportes del Avance: </span>
              <div className="flex flex-row">
                <Tooltip title="Editar avance" arrow>
                  <i
                    className="w-auto bi bi-pencil-fill cursor-pointer font-bold text-blue-500 hover:text-blue-700 shadow-md"
                    onClick={() => {
                      setIsediting(true);
                    }}
                  ></i>
                </Tooltip>
              </div>
            </div>
            <p className="w-full">{descripcion}</p>
          </div>
        )}
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <Icono />
        </div>
      </div>
      <Dialog open={checkInfo}>
        <div className="flex flex-col bg-blue-50">
          <i
            onClick={() => {
              setCheckInfo(false);
            }}
            className="flex justify-end bi bi-x-circle cursor-pointer text-2xl p-1 mx-1"
          ></i>
          <h2 className="flex justify-center p-1 mx-2 text-2xl font-bold">
            OBSERVACIONES
          </h2>
          <ul className="p-3 m-3 border-2 border-gray-300 rounded-md">
            {observaciones.length ? (
              observaciones.map((observacion) => {
                return <li>{observacion}</li>;
              })
            ) : (
              <li>Todavia no hay observaciones</li>
            )}
          </ul>
        </div>
      </Dialog>
      <Dialog
        open={showCrearObservacion}
        onBackdropClick={() => {
          setShowCrearObservacion(false);
        }}
      >
        <div className="py-4 px-8 flex flex-col">
          <h1 className="text-3xl font-extrabold text-center mx-16 m-6">
            Añadir observación
          </h1>
          <textarea
            value={observacion}
            onChange={(e) => {
              setObservacion(e.target.value);
            }}
            className="p-3 border-2 border-black rounded-md"
            placeholder="Ingresa tu avance..."
            cols="30"
            rows="10"
          ></textarea>
          <div className="flex w-full justify-around mt-3">
            <button
              type="submit"
              className="text-4xl"
              onClick={() => CrearObservacion()}
            >
              <i className="bi bi-check-circle-fill duration-200 hover:text-green-500 text-green-600"></i>
            </button>
            <button
              className="text-4xl"
              onClick={() => {
                setShowCrearObservacion(false);
                setObservacion("");
              }}
            >
              <i className="bi bi-x-circle-fill duration-200 hover:text-red-400 text-red-600"></i>
            </button>
          </div>
        </div>
      </Dialog>
      <ToastContainer position="bottom-center" autoClose={5000} />
    </div>
  );
};

export default CardAvances;
