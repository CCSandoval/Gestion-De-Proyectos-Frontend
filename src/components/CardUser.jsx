import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";

const CardUser = ({id,name,role,mail,estate}) => {
  const [isediting, setIsediting] = useState(false);
    return (
      <div className="border-2 border-black shadow-md flex w-11/12 mt-10 rounded-lg p-3 relative">
        {isediting ? (
          <>
        <div className="h-full w-full">
          
          <div className="flex flex justify-around mt-2 ml-10">
            <div className="flex flex-col w-full">
              <span className="text-md">{`ID: ${id}`}</span>
              <span className="text-4xl">{`Nombre de usuario: ${name}`}</span>
              <span className="text-lg">Estado:
              <span className="text-lg"> <select><option selected disabled>
            seleccione una opción
          </option>
          <option value="Pendiente">Pendiente</option>
          <option value="Autorizado">Autorizado</option>
          <option value="No Autorizado">No Autorizado</option>
        </select></span></span>
          
            </div>
            <div className="flex flex-col w-full">
              <span className="text-lg">{`Correo del Usuario: ${mail}`}</span>
              <span className="text-4xl">{`Rol: ${role}`}</span>
            </div>
            </div>
        </div>
        <button type="button" className="text-2xl absolute top-1 right-2">
          <Tooltip title="Editar usuario" arrow>
                  <i
                    className="bi bi-pencil-square cursor-pointer font-bold text-black-500 hover:text-black-700 shadow-md"
                    onClick={() => {
                      setIsediting(false);
                    }}
                  ></i>
                </Tooltip>
        </button>
        </>
        ) : (
          <>
          <div className="h-full w-full">
          
          <div className="flex flex justify-around mt-2 ml-10">
            <div className="flex flex-col w-full">
              <span className="text-md">{`ID: ${id}`}</span>
              <span className="text-4xl">{`Nombre de usuario: ${name}`}</span>
              <span className="text-lg"><span>Estado:{`${estate}`}</span></span>
          
            </div>
            <div className="flex flex-col w-full">
              <span className="text-lg">{`Correo del Usuario: ${mail}`}</span>
              <span className="text-4xl">{`Rol: ${role}`}</span>
            </div>
            </div>
        </div>
        <button
          type="button"
          className="text-2xl absolute top-1 right-2">
          <Tooltip title="Editar usuario" arrow>
                  <i
                    className="bi bi-pencil-square cursor-pointer font-bold text-black-500 hover:text-black-700 shadow-md"
                    onClick={() => {
                      setIsediting(true);
                    }}
                  ></i>
                </Tooltip>
        </button>
        </>
        )}
      </div>
      
    )
}

export default CardUser
