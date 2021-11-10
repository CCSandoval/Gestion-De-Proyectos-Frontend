import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import { Dialog } from "@material-ui/core";


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
  
  const [newProfile, setNewProfile]= useState(false);
  return (
    
   
    <> <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        console.log("si le damos click")
        setNewProfile(!newProfile)
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
    <Dialog open={newProfile}>
    <h2 className="text-center text-2xl mt-3">Mi perfil</h2>
    <div className="w-full max-w-lg">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                  Nombre del usuario
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                  Correo del usuario
                </label>
                <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" />

              </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                  N- Identificacón
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                  Contraseña
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="password" />
              </div>
          </div>
        </form>
        <div className="flex justify-evenly">
            <i className="bi bi-check-circle-fill text-green-500 text-4xl cursor-pointer mx-auto my-4"></i>
            <i className="bi bi-x-circle-fill text-red-500 text-4xl cursor-pointer mx-auto my-4" 
            onClick={()=>{setNewProfile(!newProfile)
              }}
            ></i>
        </div>
        </div>
    
    </Dialog>
</>
    
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
