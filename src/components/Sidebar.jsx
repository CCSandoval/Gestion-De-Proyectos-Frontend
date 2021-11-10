import React from "react";
import { NavLink } from "react-router-dom";

const SidebarButtons = () => {
  return (
    <div className="flex flex-col h-full">
      <Logo />
      <div className="flex flex-col h-full">
        <SidebarRoute to="" title="PROYECTOS" icon="fas fa-project-diagram" />
        <SidebarRoute to="/usuarios" title="USUARIOS" icon="far fa-id-card" />
        <SidebarRoute
          to="/mis-proyectos"
          title="MIS PROYECTOS"
          icon="fas fa-columns"
        />
        <SidebarRoute
          to="/auth"
          title="Log-In"
          icon="fas fa-door-open"
        />
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        alert("dialogo de perfil");
      }}
      className="py-2 px-1 w-full flex items-center justify-center bg-purple-800 hover:bg-purple-900 text-left"
    >
      <div>
        <i className="far fa-user text-white text-8xl m-2"></i>
      </div>
      <div>
        <span className="my-2 text-lg font-bold text-center text-white">
          Nombre del usuario
        </span>
        <br />
        <span className="my-2 text-base font-bold text-center text-white">
          Rol
        </span>
      </div>
    </button>
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

export default Sidebar;
