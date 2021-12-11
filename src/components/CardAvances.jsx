import { Dialog, Tooltip } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useUser } from "context/userContext";

const CardAvances = ({ id, fecha, ob, estudiante }) => {
  const { userData } = useUser();
  const [checkInfo, setCheckInfo] = useState(false);
  const [isediting, setIsediting] = useState(false);
  const [descripcion, setDescripcion] = useState(ob);
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
        <button className="flex flex-col justify-center items-center">
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
                      setIsediting(false);
                    }}
                  ></i>
                </Tooltip>
                <Tooltip title="Cancelar edición" arrow>
                  <i
                    className="bi bi-x-circle-fill cursor-pointer m-1 text-xl text-red-500 font-bold hover:text-red-700 shadow-md"
                    onClick={() => {
                      setDescripcion(ob)
                      setIsediting(false);
                    }}
                  ></i>
                </Tooltip>
              </div>
            </div>
            <textarea
              type="text"
              value={descripcion}
              onChange={(e) => {
                setDescripcion(e.target.value);
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
            className="flex justify-end bi bi-x-circle cursor-pointer text-2xl p-1 m-1"
          ></i>
          <h2 className="flex justify-center p-1 m-2 font-bold">
            OBSERVACIONES
          </h2>
          <ul className="p-3 m-3 border-2 border-gray-300 rounded-md">
            <li>Escriba aquí las observaciones</li>
            <li>Escriba aquí las observaciones</li>
          </ul>
        </div>
      </Dialog>
    </div>
  );
};

export default CardAvances;
