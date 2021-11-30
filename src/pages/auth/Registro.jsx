import React, { useEffect } from "react";
import DropDown from "components/Dropdown";
import useFormData from "hooks/useFormData";
import { Enum_Rol } from "utils/enums";
import { Link } from "@material-ui/core";
import { REGISTRO } from "graphql/auth/mutations";
import { useMutation } from "@apollo/client";
import ButtonLoading from "components/ButtonLoading";
import { useNavigate } from "react-router";
import { useAuth } from "context/authContext";
import { toast } from "react-toastify";

const Registro = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const { form, formData, updateFormData } = useFormData();
  const [
    registro,
    { data: registerData, loading: registerLoading, error: registerError },
  ] = useMutation(REGISTRO);

  const submitRegister = (e) => {
    e.preventDefault();
    registro({
      variables: {
        correo: formData.correo,
        password: formData.password,
        identificacion: formData.identificacion,
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        rol: formData.rol,
      },
    });
  };

  useEffect(() => {
    if (registerData) {
      //Setear el token si todo salió bien
      if (registerData.registro.token) {
        setToken(registerData.registro.token);
        navigate("/gpro/proyectos");
      } //Mostrar mensaje de error si el correo o la identificación ya están registrados
      else {
        toast.error("El correo o identificación ingresados ya existen");
      }
    }
  }, [registerData, setToken, navigate]);

  if (registerError) {
    toast.error("Algo salió mal, intenta de nuevo");
  }

  return (
    <div className="w-3/12 flex flex-col items-center">
      <h1 className="text-center text-4xl font-extrabold my-2 text-white">
        Registro
      </h1>
      <form
        onSubmit={submitRegister}
        onChange={updateFormData}
        ref={form}
        className="flex flex-col w-5/6 items-center mb-10 p-5 shadow-lg bg-opacity-30 bg-blue-300 rounded-md"
      >
        <label htmlFor="nombres" className="registerLabel">
          <span className="font-bold text-white">Nombres</span>
          <input
            id="nombres"
            autoComplete="off"
            name="nombres"
            type="text"
            className="registerInput"
            placeholder="Nombres"
          />
        </label>
        <label htmlFor="apellidos" className="registerLabel">
          <span className="font-bold text-white">Apellidos</span>
          <input
            id="apellidos"
            autoComplete="off"
            name="apellidos"
            type="text"
            className="registerInput"
            placeholder="Apellidos"
          />
        </label>
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
        <label htmlFor="identificacion" className="registerLabel">
          <span className="font-bold text-white">Identificacion</span>
          <input
            id="identificacion"
            autoComplete="off"
            name="identificacion"
            type="text"
            className="registerInput"
            placeholder="Identificación"
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
        <DropDown
          label="Selecciona un rol"
          name="rol"
          required={true}
          options={Enum_Rol}
        />
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={registerLoading}
          text="Registrarme"
        />
      </form>
      <div>
        <p className="text-white font-extrabold text-xl inline">
          ¿Ya tienes cuenta? &nbsp;
        </p>
        <Link to="/">
          <span className="text-white font-extrabold text-xl hover:underline hover:text-gray-300">
            Inicia sesión
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Registro;
