import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "context/authContext";
import { useUser } from "context/userContext";
import { MiPerfil } from "./MiPerfil";

const SidebarButtons = () => {
  const { userData } = useUser();
  return (
    <div className="flex flex-col h-full">
      <MiPerfil />
      <div className="flex flex-col h-full">
        <SidebarRoute
          to="/gpro/proyectos"
          title="PROYECTOS"
          icon="fas fa-project-diagram"
        />
        <SidebarRoute
          to="/gpro/usuarios"
          title="USUARIOS"
          icon="far fa-id-card"
        />
        {userData.rol === "LIDER" ? (
          <SidebarRoute
            to="/gpro/proyectos-liderados"
            title="PROYECTOS LIDERADOS"
            icon="fas fa-columns"
          />
        ) : (
          <SidebarRoute
            to="/gpro/mis-proyectos"
            title="MIS PROYECTOS"
            icon="fas fa-columns"
          />
        )}
        <Logout to="/" title="Cerrar Sesión" icon="fas fa-door-open" />
      </div>
    </div>
  );
};



const Sidebar = () => {
  return (
    <div className="flex flex-col md:flex-row flex-no-wrap md:h-full">
      <div className="sidebar hidden h-full md:flex">
        <div className="h-full">
          <SidebarButtons />
        </div>
      </div>
    </div>
  );
};

const SidebarRoute = ({ to, title, icon }) => {
  return (
    <div className="h-full">
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? "sidebar-route bg-indigo-800 hover:bg-indigo-900"
            : "sidebar-route hover:bg-indigo-800"
        }
      >
        <div className="flex items-center justify-between">
          <i className={`${icon} text-6xl`} />
          <span className="text-2xl font-extrabold ml-3">{title}</span>
        </div>
      </NavLink>
    </div>
  );
};

//Botón de Logout
const Logout = ({ to, icon, title }) => {
  const { setToken } = useAuth();
  const deleteToken = () => {
    setToken(null);
  };
  return (
    <div className="h-full">
      <NavLink
        to={to}
        onClick={deleteToken}
        className={({ isActive }) =>
          isActive
            ? "sidebar-route bg-indigo-800 hover:bg-indigo-900"
            : "sidebar-route hover:bg-indigo-800"
        }
      >
        <div className="flex items-center justify-between">
          <i className={`${icon} text-6xl`} />
          <span className="text-2xl font-extrabold ml-3">{title}</span>
        </div>
      </NavLink>
    </div>
  );
};

export default Sidebar;
