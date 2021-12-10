import { Dialog } from "@material-ui/core";
import CardAvances from "components/CardAvances";
import CardInvestigadores from "components/CardInvestigadores";
import React, { useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { useQuery } from "@apollo/client";
import { GET_AVANCES } from "graphql/avances/querys";
import Loading from "components/Loading";
import { GET_PROYECTO } from "graphql/proyectos/querys";

const Avances = () => {
  const { _id } = useParams();
  const [inscription, setInscription] = useState(false);

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
          <div className="w-full flex flex-col justify-center items-center">
            <div className="flex w-full justify-center">
              <button
                onClick={() => {
                  setInscription(!inscription);
                }}
                className="w-auto bg-green-400 p-3 m-5 rounded-full hover:bg-green-500 shadow-md"
              >
                VER INSCRIPCIONES
              </button>
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
                  Inscripciones a {proyectoData.Proyecto.nombre}
                </h2>
                <div className="flex flex-col justify-between items-center m-3 border-2 border-gray-300">
                  {proyectoData.Proyecto.inscripciones.map((i) => {
                    if (i.estado !== "ACEPTADA") {
                      return (
                        <div className="m-3 w-full flex justify-around">
                          <span>{`${i.estudiante.nombres} ${i.estudiante.apellidos}`}</span>
                          <div>
                            <button>
                              <i className="bi bi-check-circle-fill text-green-500 text-3xl mx-1"></i>
                            </button>
                            <button>
                              <i className="bi bi-x-circle-fill text-red-500 text-3xl"></i>
                            </button>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </Dialog>
          </div>
          {proyectoData.Proyecto.usuarios.map((u) => {
            return (
              <CardInvestigadores apellidos={u.apellidos} nombres={u.nombres} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Avances;
