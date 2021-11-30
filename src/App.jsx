import React, { useState } from "react";
import PrivateLayout from "layouts/PrivateLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "context/userContext";
import "react-toastify/dist/ReactToastify.css";
import "styles/globals.css";
import Index from "pages/Index";
import Usuarios from "pages/Usuarios";
import MisProyectos from "pages/MisProyectos";
import Auth from "pages/Auth";
import Avances from "pages/Avances";
import NuevoProyecto from "pages/NuevoProyecto";

function App() {
  const [userData, setUserData] = useState({});

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateLayout />}>
            <Route path="" element={<Index />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="/mis-proyectos" element={<MisProyectos />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/avances" element={<Avances />} />
            <Route path="/nuevo-proyecto" element={<NuevoProyecto />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
