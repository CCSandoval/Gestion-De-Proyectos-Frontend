import React, { useState } from "react";

const date = new Date();
const today = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
const nextYear = `${date.getDay()}/${date.getMonth()}/${
  date.getFullYear() + 1
}`;

const CardProyecto = () => {
  const [isActive, setIsActive] = useState(false);
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
            <button
              type="button"
              className="bg-green-600 px-10 rounded-md text-white text-lg"
              onClick={() => {
                alert("Seguro?");
              }}
            >
              Quiero Inscribirme
            </button>
          </div>
          <div className="flex flex-col items-end w-full">
            <span className="text-md">Lider</span>
            <span className="text-lg">NOMBRE DEL LIDER</span>
          </div>
        </div>
        <div className="w-full flex justify-around px-3">
          <button
            type="button"
            className="text-2xl flex items-center"
            onClick={() => {
              alert("Objetivos");
            }}
          >
            <i className="bi bi-list-task text-3xl"></i>Ver los objetivos
          </button>
          <button
            type="button"
            className="text-2xl"
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
    </div>
  );
};

export default CardProyecto;
