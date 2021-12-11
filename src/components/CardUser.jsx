import React, { useState,useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";
import { useUser } from "context/userContext";
import { useMutation } from "@apollo/client";
import {ACEPTAR_USUARIO} from "graphql/usuarios/mutations";
import {RECHAZAR_USUARIO} from "graphql/usuarios/mutations";
import ReactLoading from "react-loading";

const CardUser = ({
  _id,
  correo,
  nombres,
  apellidos,
  estado,
  rol,
}) => {
  const [isActive, setIsActive] = useState(false);
  const { userData } = useUser();
  const [
    aceptUser,
    { data: activateData, loading: activateLoading, error: activateError },
  ] = useMutation(ACEPTAR_USUARIO);
  const [
    rejectUser,
    { data: deactivateData, loading: deactivateLoader, error: deactivateError },
  ] = useMutation(RECHAZAR_USUARIO);

  const aceptarUsuario = (e) => {
    e.preventDefault();
    aceptUser({ variables: { id: _id } })
      .then((s) => {
        toast.success("Usuario aceptado");
        setIsActive(true);
      })
      .catch((e) => toast.error("Error aceptando"));
  };

  const rechazarUsuario = (e) => {
    e.preventDefault();
    rejectUser({ variables: { id: _id } })
      .then((s) => {
        toast.success("Usuario Rechazado");
        setIsActive(false);
      })
      .catch((e) => toast.error("Error Rechazando"));
  };
    return (
      <div className="border-2 border-black shadow-md flex w-11/12 mt-10 rounded-lg p-3 relative">
        <>
        
          <div className="h-full w-full">
          
          <div className="flex flex justify-around mt-2 ml-10">
            <div className="flex flex-col w-full">
              <span className="text-md">{`${_id}`}</span>
              <span className="text-4xl">{`${nombres} ${apellidos}`}</span>
              <span className="text-lg"><span>Estado:{` ${estado}`}</span>
              <>
            <button
              type="button"
              className="text-lg hover:underline "
              onClick={(e) => {
                aceptarUsuario(e);
              }}>
              
              <i className={"fas fa-check-square ml-4 text-green-700"}></i>
            </button>
            <button
            type="button"
              className="text-lg hover:underline"
              onClick={(e) => {
               rechazarUsuario(e)
              }}>
              
              <i className={"fas fa-times-circle ml-4 text-red-700"}
              ></i>
              </button>
              </>
              </span>
              
            
            </div>
            <div className="flex flex-col w-full">
              <span className="text-lg">{`${correo}`}</span>
              <span className="text-4xl">{`${rol}`}</span>
            </div>
            </div>
        </div>
        
        </>
      </div>
      
    )
}

export default CardUser
