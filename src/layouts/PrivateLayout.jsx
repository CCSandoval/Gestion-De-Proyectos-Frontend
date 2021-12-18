import React, { useEffect, useState } from "react";
import Sidebar from "components/Sidebar";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "context/authContext";
import { useUser } from "context/userContext";
import { useMutation } from "@apollo/client";
import { REFRESCAR_TOKEN } from "graphql/auth/mutations";
import { useNavigate } from "react-router";
import Loading from "components/Loading";
import jwt_decode from "jwt-decode";
import warning from "img/warning.png";

const PrivateLayout = () => {
  const { setToken } = useAuth();
  const { userData, setUserData } = useUser();
  const navigate = useNavigate();
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [
    refrescarToken,
    { data: refreshData, loading: refreshLoading, error: refreshError },
  ] = useMutation(REFRESCAR_TOKEN);

  //Ejecuta el query de recargar el token apenas el usuario entra a una página con layout privado
  useEffect(() => {
    refrescarToken();
  }, [refrescarToken]);

  //Setea los datos del usuario apenas el usuario entra a una página con layout privado
  //usando el token existente en el localStorage
  useEffect(() => {
    setUserData(jwt_decode(localStorage.getItem("token")));
  }, [setUserData]);

  useEffect(() => {
    if (refreshData) {
      //Si la mutacion retorno un token valido
      if (refreshData.refreshToken.token) {
        //Setea el token del localstorage al nuevo token
        setToken(refreshData.refreshToken.token);
      } //Si no devolvió un token
      else {
        //Pone el token del localStorage en null y lo lleva a la página de login
        setToken(null);
        navigate("/");
      }
      setLoadingAuth(false);
    }
  }, [refreshData, navigate, setToken, userData]);

  if (loadingAuth || refreshLoading) {
    return (
      <div className="flex flex-col h-screen">
        <Loading />
      </div>
    );
  }

  if (refreshError) {
    navigate("/");
  }

  return (
    <div className="flex flex-col md:flex-row flex-no-wrap h-screen">
      {userData.estado !== "PENDIENTE" ? (
        <div className="flex flex-col w-screen justify-center items-center">
          <img src={warning} alt="Imágen de error" />
          <div>No estás autorizado, contáctate con un admin</div>
          <button
            onClick={() => {
              setToken(null);
              navigate("/");
            }}
          >
            <span className="underline hover:text-gray-500">Cerrar sesión</span>
          </button>
        </div>
      ) : (
        <div className="flex w-full h-full">
          <Sidebar />
          <div className="w-full h-full overflow-y-scroll bg-gray-200">
            <Outlet />
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default PrivateLayout;
