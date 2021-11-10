import { Dialog } from "@material-ui/core";
import React from "react";
import { useState } from "react";

const CardAvances = ({ id, fecha, ob, icono }) => {

  const [checkInfo, setCheckInfo] = useState(false);

  const Icono = ({ icono }) => {
    if (icono === "info-circle") {
      return (
        <button
          onClick={() => {
            setCheckInfo(!checkInfo);
          }}
          className="flex flex-col justify-center items-center"
        >
          <span className="text-xs">Ver Observación</span>
          <i className={`bi bi-${icono} w-1/2 text-5xl`}></i>
        </button>
      );
    } else {
      return (
        <button className="flex flex-col justify-center items-center">
          <span className="text-xs">Añadir Observación</span>
          <i className={`bi bi-${icono} w-1/2 text-5xl`}></i>
        </button>
      );
    }
  };

  return (
    <div className="flex flex-col p-2 border-2 border-gray-500 m-5 rounded-lg">
      <div className="flex w-full justify-between p-2">
        <span>{`Id del avance: ${id}`}</span>
        <span>{`Fecha ${fecha}`}</span>
      </div>
      <div className="flex w-full justify-around">
        <div className="flex w-3/4 m-1 p-1">
          <span>Aportes del Avance: </span>
          <p className="w-full">
            Luctus phasellus tincidunt eleifend porta parturient non tortor
            dictumst, aliquet vestibulum himenaeos pulvinar ullamcorper euismod
            mollis vitae platea, conubia posuere cubilia feugiat habitant
            blandit pretium.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <Icono icono={icono} />
        </div>
      </div>
      <Dialog open={checkInfo}>
        <div className='flex flex-col bg-blue-50'>
          <i
            onClick={() => {
              setCheckInfo(false);
            }}
            className="flex justify-end bi bi-x-circle cursor-pointer text-2xl p-1 m-1"
          ></i>
          <h2 className='flex justify-center p-1 m-2 font-bold'>OBSERVACIONES</h2>
          <ul className='p-3 m-3 border-2 border-gray-300 rounded-md'>
            <li>Escriba aquí las observaciones</li>
            <li>Escriba aquí las observaciones</li>
          </ul>
        </div>
      </Dialog>
    </div>
  );
};

export default CardAvances;
