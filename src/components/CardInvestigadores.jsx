import { Dialog } from "@material-ui/core";
import React from "react";
import { useState } from "react";

const CardInvestigadores = () => {
  const [inscription, setInscription] = useState(false);
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className='flex w-full justify-center'>
        <button
          onClick={() => {
            setInscription(!inscription);
          }}
          className="w-auto bg-green-400 p-3 m-5 rounded-full hover:bg-green-500 shadow-md"
        >
          VER INSCRIPCIONES
        </button>
      </div>
      <div className="flex justify-center p-2 m-5 border-2 border-gray-500 w-3/4 rounded-full">
        ESTUDIANTE 1
      </div>
      <div className="flex justify-center p-2 m-5 border-2 border-gray-500 w-3/4 rounded-full">
        ESTUDIANTE 2
      </div>
      <Dialog open={inscription}>
        <div className="flex flex-col p-1 bg-blue-50">
          <i
            onClick={() => {
              setInscription(false);
            }}
            className="flex justify-end p-1 bi bi-x-circle cursor-pointer text-xl"
          ></i>

          <h2 className="flex justify-center m-3">
            Inscripciones a (nombre del proyecto)
          </h2>
          <div className="flex justify-between items-center m-3 border-2 border-gray-300 rounded-full">
            <span className="m-3">Nombre del estudiante</span>
            <div className="m-3">
              <i className="bi bi-check-circle-fill text-green-500 text-3xl m-3"></i>
              <i className="bi bi-x-circle-fill text-red-500 text-3xl"></i>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CardInvestigadores;
