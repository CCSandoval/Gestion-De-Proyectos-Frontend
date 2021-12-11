import React, { useState } from "react";
import PrivateLayout from "layouts/PrivateLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "context/userContext";
import "react-toastify/dist/ReactToastify.css";
import "styles/globals.css";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AuthContext } from "context/authContext";
import Proyectos from "pages/Proyectos";
import Usuarios from "pages/Usuarios";
import MisProyectos from "pages/MisProyectos";
import ProyectosLiderados from "pages/ProyectosLiderados";
import Avances from "pages/Avances";
import NuevoProyecto from "pages/NuevoProyecto";
import AuthLayout from "layouts/AuthLayout";
import Login from "pages/auth/Login";
import Registro from "pages/auth/Registro";

//Crear un link con la dirección del backend
const httpLink = createHttpLink({
  uri: "https://gestion-de-proyectos-backend.herokuapp.com/graphql",
});

//Crea el contexto y le pone el token
const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

//Crea el cliente de apollo que se comunicará con el backend
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState("");

  //Funcion para guardar el token en el localStorage y setearlo en el estado de authToken
  const setToken = (token) => {
    setAuthToken(token);
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    } else {
      localStorage.removeItem("token");
    }
  };

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authToken, setToken }}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              <Route path="/gpro" element={<PrivateLayout />}>
                <Route path="proyectos" element={<Proyectos />} />
                <Route path="usuarios" element={<Usuarios />} />
                <Route path="mis-proyectos" element={<MisProyectos />} />
                <Route path="proyectos-liderados" element={<ProyectosLiderados />} />
                <Route path="avances/:_id" element={<Avances />} />
                <Route path="nuevo-proyecto" element={<NuevoProyecto />} />
              </Route>
              <Route path="/" element={<AuthLayout />}>
                <Route path="" element={<Login />} />
                <Route path="registro" element={<Registro />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
