import React, { useEffect } from "react";
import ButtonLoading from "components/ButtonLoading";
import useFormData from "hooks/useFormData";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "graphql/auth/mutations";
import { useNavigate } from "react-router";
import { useAuth } from "context/authContext";
import { toast } from "react-toastify";

const Login = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { form, formData, updateFormData } = useFormData();

  const [login, { data: loginData, loading: loginLoading, error: loginError }] =
    useMutation(LOGIN);

  const submitLogin = (e) => {
    e.preventDefault();
    login({
      variables: formData,
    });
  };

  useEffect(() => {
    if (loginData) {
      //Manejar errores de login
      if (loginData.login.error) {
        toast.error(
          loginData.login.error === "pass" // "pass" es el mensaje que retorna el backend si la contraseña no coincide
            ? "Contraseña Errónea"
            : "Usuario no encontrado"
        );
      }
      //Guardar el token
      if (loginData.login.token) {
        setToken(loginData.login.token);
        navigate("/gpro/proyectos");
      }
    }
  }, [loginData, setToken, navigate]);

  if (loginError) {
    toast.error("Algo salió mal, intena de nuevo");
  }

  return (
    <div className="w-3/12 flex flex-col items-center">
      <h1 className="text-center text-4xl font-extrabold my-2 text-white">
        Iniciar Sesion
      </h1>
      <form
        onSubmit={submitLogin}
        onChange={updateFormData}
        ref={form}
        className="flex flex-col w-5/6 items-center mb-10 p-5 shadow-lg bg-opacity-30 bg-blue-300 rounded-md"
      >
        <label htmlFor="correo" className="registerLabel">
          <span className="font-bold text-white">Correo</span>
          <input
            id="correo"
            autoComplete="off"
            name="correo"
            type="email"
            className="registerInput"
            placeholder="Correo"
          />
        </label>
        <label htmlFor="password" className="registerLabel">
          <span className="font-bold text-white">Contraseña</span>
          <input
            id="password"
            name="password"
            type="password"
            className="registerInput"
            placeholder="Contraseña"
          />
        </label>
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={loginLoading}
          text="Iniciar sesión"
        />
      </form>
      <div>
        <p className="text-white font-extrabold text-xl inline">
          ¿No tienes cuenta? &nbsp;
        </p>
        <Link to="/registro">
          <span className="text-white font-extrabold text-xl hover:underline hover:text-gray-300">
            Registrate
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
