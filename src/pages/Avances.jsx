import CardAvances from "components/CardAvances";
import CardInvestigadores from "components/CardInvestigadores";
import { nanoid } from "nanoid";
import React, { useEffect } from "react";
import { useParams } from "react-router";
const Avances = () => {
  const { _id } = useParams();
  useEffect(()=>{
    //OBTENER TODOS LOS AVANCES
  },[])
  return (
    <>
      <div className="flex w-full justify-center text-3xl bg-gray-200 p-2">
        NOMBRE DEL PROYECTO
      </div>
      <div className="flex w-full justify-around">
        <div className="flex flex-col p-5 w-4/5 h-screen bg-gray-200 border-t-2 border-gray-600">
          <div className="flex w-full justify-center p-1 text-xl m-5">
            AVANCES
          </div>
          <div>
            <div className="flex w-full justify-center m-5">
              <button className=" w-auto bg-green-400 p-3 rounded-full hover:bg-green-500 shadow-md">
                AÑADIR AVANCE
              </button>
            </div>
            <CardAvances icono="plus-circle" fecha="DD/MM/YYYY" id="111" />
            <CardAvances icono="info-circle" fecha="DD/MM/YYYY" id="123" />
          </div>
        </div>
        <div className="flex flex-col items-center p-5 w-2/5 bg-gray-200 border-t-2 border-l-2 border-gray-600">
          <div className="flex w-full justify-center p-1 text-xl m-5">
            INVESTIGADORES
          </div>
          <CardInvestigadores />
        </div>
      </div>
    </>
  );
};

export default Avances;
