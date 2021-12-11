import React, {useState, useEffect} from 'react'
import { Dialog } from "@material-ui/core";
import useFormData from 'hooks/useFormData';
import {EDITAR_USUARIO} from 'graphql/usuarios/mutations'
import { useMutation } from '@apollo/client';
import { useUser } from "context/userContext";
import { toast } from 'react-toastify';



const MiPerfil = () => {
    const [newProfile, setNewProfile] = useState(false);
    const { userData } = useUser();
    const { form, formData, updateFormData } = useFormData(null);

    const [editarPerfil, { data: mutationDataPerfil, loading: mutationLoadingPerfil, error: mutationErrorPerfil }] = useMutation(EDITAR_USUARIO);

    const [nombreUsuario, setNombreUsuario] = useState('');
    const [correoUsuario,setCorreoUsuario ] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [contraseña, setContraseña] = useState('');

    const submitForm = (e) => {
      e.preventDefault();

      editarPerfil({
        variables: { id: userData._id, nombres: nombreUsuario, correo: correoUsuario, identificacion: identificacion,  password:contraseña },
      }).then(()=>{
        toast.success('Usuario modificado correctamente, por favor cerrar sesion para ver los cambios');

      }).catch(()=>{
        toast.error('Error modificando el usuario');
      })
    };

    return (
      <>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            console.log("si le damos click");
            setNewProfile(!newProfile);
            
          }}
          className="py-2 px-1 w-full flex items-center justify-center bg-purple-800 hover:bg-purple-900 text-left"
        >
          <div>
            <i className="far fa-user text-white text-8xl m-2"></i>
          </div>
          <div>
            <span className="my-2 text-lg font-bold text-center text-white">
              {`${userData.nombres} ${userData.apellidos}`}
            </span>
            <br />
            <span className="my-2 text-base font-bold text-center text-white">
              {userData.rol}
            </span>
          </div>
        </button>
        
        <Dialog open={newProfile}>
        <h2 className="text-center text-2xl mt-3">Mi perfil</h2>
        <div className="w-full max-w-lg">
          <form 
          ref={form}
          onSubmit={submitForm}
          onChange={updateFormData}
         
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="username"
                >
                  Nombre del usuario
                </label>
                <input
                  onChange={(e)=>{setNombreUsuario(e.target.value)}}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text" 
                  name="nombreUsuario"
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="password"
                >
                  Correo del usuario
                </label>
                <input
                  onChange={(e)=>{setCorreoUsuario(e.target.value)}}
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="text"
                  name="correoUsuario"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="username"
                >
                  N- Identificacón
                </label>
                <input
                  onChange={(e)=>{setIdentificacion(e.target.value)}}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  name="identificacion"
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="username"
                >
                  Contraseña
                </label>
                <input
                onChange={(e)=>{setContraseña(e.target.value)}}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="password"
                  name="contraseña"
                />
              </div>
            </div>
          
          <div className="flex justify-evenly">
            <button type='submit'><i

                className="bi bi-check-circle-fill text-green-500 text-4xl cursor-pointer mx-auto my-4">
            </i></button>
            
            <i
              className="bi bi-x-circle-fill text-red-500 text-4xl cursor-pointer mx-auto my-4"
              onClick={() => {setNewProfile(!newProfile);
              }}>     
              </i>
          </div>
          </form>
        </div>
      </Dialog>


      </>
    );
  };

export {MiPerfil};