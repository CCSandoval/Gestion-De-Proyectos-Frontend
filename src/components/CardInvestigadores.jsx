import React from "react";

const CardInvestigadores = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center p-2">
      <button className="w-3/4 bg-green-400 m-5 p-3 rounded-full hover:bg-green-500 shadow-md">
        VER INSCRIPCIONES
      </button>
      <div className="flex justify-center p-2 m-5 border-2 border-gray-500 w-3/4 rounded-full">ESTUDIANTE 1</div>
      <div className="flex justify-center p-2 m-5 border-2 border-gray-500 w-3/4 rounded-full">ESTUDIANTE 2</div>
    </div>
  );
};

export default CardInvestigadores;
