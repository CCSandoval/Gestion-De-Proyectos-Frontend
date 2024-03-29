import { Dialog } from "@material-ui/core";
import CardAvances from "components/CardAvances";
import CardInvestigadores from "components/CardInvestigadores";
import React, { useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@apollo/client";
import { GET_AVANCES } from "graphql/avances/querys";
import Loading from "components/Loading";
import { useMutation } from "@apollo/client";
import { CREAR_AVANCE } from "graphql/avances/mutations";
import { GET_PROYECTO } from "graphql/proyectos/querys";
import { useUser } from "context/userContext";
import { ACEPTAR_INSCRIPCION } from "graphql/inscripciones/mutations";
import { RECHAZAR_INSCRIPCION } from "graphql/inscripciones/mutations";
import { TERMINAR_PROYECTO } from "graphql/proyectos/mutations";
import ReactLoading from "react-loading";

const Inscripcion = ({ data, setDialog }) => {
  const [
    Accept,
    { data: acceptData, loading: acceptLoading, error: acceptError },
  ] = useMutation(ACEPTAR_INSCRIPCION);

  const [Deny, { data: denyData, loading: denyLoading, error: denyError }] =
    useMutation(RECHAZAR_INSCRIPCION);

  const AceptarInscripcion = () => {
    Accept({ variables: { aceptarInscripcionId: data._id } }).then((s) => {
      toast.success(
        "Inscripcion aceptada, recarga la página para ver los cambios"
      );
    });
    setDialog(false);
  };

  const RechazarInscripcion = () => {
    Deny({ variables: { rechazarInscripcionId: data._id } }).then((s) => {
      toast.success("Inscripcion rechazada");
    });
    setDialog(false);
  };

  return (
    <div className="m-3 w-full flex justify-around">
      <span>{`${data.estudiante.nombres} ${data.estudiante.apellidos}`}</span>
      <div>
        <button
          onClick={() => {
            AceptarInscripcion();
          }}
        >
          <i className="bi bi-check-circle-fill duration-300 hover:text-green-400 text-green-500 text-3xl mx-1"></i>
        </button>
        <button
          onClick={() => {
            RechazarInscripcion();
          }}
        >
          <i className="bi bi-x-circle-fill duration-300 hover:text-red-400 text-red-500 text-3xl"></i>
        </button>
      </div>
    </div>
  );
};

const Avances = () => {
  const { _id } = useParams();
  const [inscription, setInscription] = useState(false);
  const [showCrearAvance, setShowCrearAvance] = useState(false);
  const [avance, setAvance] = useState("");
  const [confirmarTerm, setConfirmarTerm] = useState(false);
  const { userData } = useUser();
  const navigate = useNavigate();
  const [crearAvance] = useMutation(CREAR_AVANCE);
  const [terminarProyectoMut, { loading: terminarLoading }] =
    useMutation(TERMINAR_PROYECTO);

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

  const terminarProyecto = () => {
    terminarProyectoMut({
      variables: { id: _id },
    })
      .then((s) => {
        console.log(s);
        toast.success("Proyecto terminado");
        navigate("/gpro/proyectos-liderados");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Hubo un error terminando el proyecto");
      });
  };

  const nuevoAvance = () => {
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
      <div className="flex justify-between items-center px-6 py-3 w-full text-3xl bg-gray-200">
        <div>
          <span className="text-2xl">Fase: {proyectoData.Proyecto.fase}</span>
        </div>
        <div>
          <span>{proyectoData.Proyecto.nombre}</span>
        </div>
        <div>
          {proyectoData.Proyecto.fase === "DESARROLLO" &&
            userData.rol === "LIDER" && (
              <button
                onClick={() => {
                  setConfirmarTerm(true);
                }}
                className="duration-300 bg-red-600 text-white p-2 rounded-lg hover:bg-red-500"
              >
                <p>Terminar Proyecto</p>
              </button>
            )}
        </div>
      </div>
      <div className="flex w-full">
        <div className="flex flex-col p-5 w-4/5 h-screen bg-gray-200 border-t-2 border-gray-600">
          <div className="flex w-full justify-center p-1 text-xl mx-5">
            AVANCES
          </div>
          <div>
            <div className="flex w-full justify-center m-5">
              {userData.rol === "ESTUDIANTE" && (
                <button
                  onClick={() => {
                    setShowCrearAvance(true);
                  }}
                  className="w-auto bg-green-400 p-3 rounded-lg hover:bg-green-500 shadow-md"
                >
                  AÑADIR AVANCE
                </button>
              )}
            </div>
            <div className="flex flex-col-reverse">
              {avancesData.avancesPorProyecto.map((p) => {
                return (
                  <CardAvances
                    descripcion={p.descripcion}
                    fecha={p.fecha}
                    estudiante={`${p.creadoPor.nombres} ${p.creadoPor.apellidos}`}
                    estudianteId={p.creadoPor._id}
                    id={p._id}
                    observaciones={p.observaciones}
                    key={p._id}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center p-5 w-2/5 bg-gray-200 border-t-2 border-l-2 border-gray-600">
          <div className="flex w-full justify-center p-1 text-xl mx-5">
            INVESTIGADORES
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="flex w-full justify-center">
              {userData.rol === "LIDER" && (
                <button
                  onClick={() => {
                    setInscription(!inscription);
                  }}
                  className="w-auto bg-green-400 p-3 m-5 rounded-lg hover:bg-green-500 shadow-md"
                >
                  VER INSCRIPCIONES
                </button>
              )}
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
            Inscripciones pendientes a&nbsp;
            <span className="font-bold">{proyectoData.Proyecto.nombre}</span>
          </h2>
          <div className="flex flex-col justify-between items-center m-3 border-2 p-5 border-gray-300">
            {proyectoData.Proyecto.inscripciones.map((i) => {
              if (i.estado === "PENDIENTE") {
                return (
                  <Inscripcion
                    key={i._id}
                    data={i}
                    setDialog={setInscription}
                  />
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
            className="p-3 border-2 border-black rounded-md"
            placeholder="Ingresa tu avance..."
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
      <Dialog
        open={confirmarTerm}
        onBackdropClick={() => {
          setConfirmarTerm(false);
        }}
      >
        <div className="py-3 px-6">
          <h1 className="text-2xl font-extrabold">
            Seguro que quieres terminar este proyecto?
          </h1>
          <div className="flex justify-around my-3">
            <button
              onClick={() => {
                terminarProyecto();
              }}
              className="flex items-center transform duration-300 bg-green-500 hover:bg-green-400 rounded-md px-9 py-3"
            >
              {terminarLoading ? (
                <ReactLoading type="spin" height={30} width={30} />
              ) : (
                <>
                  <i className="far fa-check-circle text-black text-2xl mr-3" />
                  <p className="text-white font-bold text-xl">Si</p>
                </>
              )}
            </button>
            <button
              onClick={() => {
                setConfirmarTerm(false);
              }}
              className="flex items-center transform duration-300  bg-red-500 hover:bg-red-400 rounded-md px-9 py-3"
            >
              <p className="text-white font-bold text-xl">No</p>
              <i className="far fa-times-circle text-black text-2xl ml-3" />
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Avances;
