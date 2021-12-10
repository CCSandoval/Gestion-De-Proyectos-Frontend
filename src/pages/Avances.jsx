import CardAvances from "components/CardAvances";
import CardInvestigadores from "components/CardInvestigadores";
import React from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { useQuery } from "@apollo/client";
import { GET_AVANCES } from "graphql/avances/querys";
import Loading from "components/Loading";
import { GET_PROYECTO } from "graphql/proyectos/querys";

const Avances = () => {
  const { _id } = useParams();

  const {
    data: proyectoData,
    error: proyectoError,
    loading: proyectoLoading,
  } = useQuery(GET_PROYECTO, { variables: { id: _id } });

  const {
    data: avancesData,
    error: avancesError,
    loading: avancesLoading,
  } = useQuery(GET_AVANCES, { variables: { id: _id } });

  if (avancesLoading || proyectoLoading) {
    return (
      <div className="flex flex-col h-screen">
        <Loading />
      </div>
    );
  }

  if (avancesError || proyectoError) {
    toast.error("Hubo un error");
  }

  return (
    <>
      <div className="flex w-full justify-center text-3xl bg-gray-200 p-2">
        {proyectoData.Proyecto.nombre}
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
            {avancesData.avancesPorProyecto.map((p) => {
              return <CardAvances fecha={p.fecha} id={p._id} key={p._id} />;
            })}
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
