import { Dialog } from "@material-ui/core";
import CardAvances from "components/CardAvances";
import CardInvestigadores from "components/CardInvestigadores";
import React, { useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { useQuery } from "@apollo/client";
import { GET_AVANCES } from "graphql/avances/querys";
import Loading from "components/Loading";
import { useMutation } from "@apollo/client";
import { CREAR_AVANCE } from "graphql/avances/mutations";
import { GET_PROYECTO } from "graphql/proyectos/querys";
import { useUser } from "context/userContext";

const Avances = () => {
  const { _id } = useParams();
  const [inscription, setInscription] = useState(false);
  const [showCrearAvance, setShowCrearAvance] = useState(false);
  const [avance, setAvance] = useState("");
  const { userData } = useUser();
  const [
    crearAvance,
    { data: dataAvance, loading: loadingAvance, error: errorAvance },
  ] = useMutation(CREAR_AVANCE);

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

  const nuevoAvance = () => {
    console.log("avance", avance);
    console.log("proyecto", proyectoData.Proyecto.nombre);
    console.log("usuario", userData._id);
    crearAvance({
      variables: {
        descripcion: avance,
        proyecto: proyectoData.Proyecto._id,
        creadoPor: userData._id,
      },
    })
      .then(() => toast.success("Avance creado"))
      .catch((e) => {
        toast.error("Error creando avance");
        console.log(e);
      });
    setAvance("");
    setShowCrearAvance(false);
  };

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
          <div className="flex w-full justify-center p-1 text-xl mx-5">
            AVANCES
          </div>
          <div>
            <div className="flex w-full justify-center m-5">
              <button
                onClick={() => {
                  setShowCrearAvance(true);
                }}
                className=" w-auto bg-green-400 p-3 rounded-lg hover:bg-green-500 shadow-md"
              >
                AÑADIR AVANCE
              </button>
            </div>
            {avancesData.avancesPorProyecto.map((p) => {
              return (
                <CardAvances
                  ob={p.descripcion}
                  fecha={p.fecha}
                  estudiante={`${p.creadoPor.nombres} ${p.creadoPor.apellidos}`}
                  estudianteId={p.creadoPor._id}
                  id={p._id}
                  key={p._id}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col items-center p-5 w-2/5 bg-gray-200 border-t-2 border-l-2 border-gray-600">
          <div className="flex w-full justify-center p-1 text-xl mx-5">
            INVESTIGADORES
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="flex w-full justify-center">
              <button
                onClick={() => {
                  setInscription(!inscription);
                }}
                className="w-auto bg-green-400 p-3 m-5 rounded-lg hover:bg-green-500 shadow-md"
              >
                VER INSCRIPCIONES
              </button>
            </div>
          </div>
          {proyectoData.Proyecto.usuarios.map((u) => {
            return (
              <CardInvestigadores apellidos={u.apellidos} nombres={u.nombres} />
            );
          })}
        </div>
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
      <Dialog
        open={showCrearAvance}
        onBackdropClick={() => {
          setShowCrearAvance(false);
        }}
      >
        <div className="py-4 px-8 flex flex-col">
          <h1 className="text-3xl font-extrabold text-center mx-16 m-6">
            Crear nuevo avance
          </h1>
          <textarea
            value={avance}
            onChange={(e) => {
              setAvance(e.target.value);
            }}
            className="p-3"
            cols="30"
            rows="10"
          ></textarea>
          <div className="flex w-full justify-around mt-3">
            <button
              type="submit"
              className="text-4xl"
              onClick={() => nuevoAvance()}
            >
              <i className="bi bi-check-circle-fill duration-200 hover:text-green-500 text-green-600"></i>
            </button>
            <button
              className="text-4xl"
              onClick={() => {
                setShowCrearAvance(false);
                setAvance("");
              }}
            >
              <i className="bi bi-x-circle-fill duration-200 hover:text-red-400 text-red-600"></i>
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Avances;
