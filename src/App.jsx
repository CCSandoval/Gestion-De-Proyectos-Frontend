import React, { useState } from "react";
import PrivateLayout from "layouts/PrivateLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserContext } from "context/userContext";
import "styles/globals.css";
import Index from "pages/Index";
import Usuarios from "pages/Usuarios";
import MisProyectos from "pages/MisProyectos";
import Auth from "pages/Auth";
import Avances from "pages/Avances";
// import PrivateRoute from 'components/PrivateRoute';

function App() {
  const [userData, setUserData] = useState({});

  return (
    <Auth0Provider
      domain="misiontic-concesionario.us.auth0.com"
      clientId="WsdhjjQzDLIZEHA6ouuxXGxFONFGAQ4g"
      redirectUri="http://localhost:3000/admin"
      audience="api-autenticacion-concesionario-mintic"
    >
      <UserContext.Provider value={{ userData, setUserData }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PrivateLayout />}>
              <Route path="" element={<Index />} />
              <Route path="usuarios" element={<Usuarios />} />
              <Route path="/mis-proyectos" element={<MisProyectos />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/avances" element={<Avances />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </Auth0Provider>
  );
}

export default App;
