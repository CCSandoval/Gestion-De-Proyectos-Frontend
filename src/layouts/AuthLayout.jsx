import React from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthLayout = () => {
  return (
    <div className="flex flex-col flex-nowrap	h-screen bg-cover bg-fixed bg-no-repeat bg-auth-background">
      <div className="flex w-full h-full">
        <div className="w-full h-full overflow-y-scroll flex flex-col justify-center items-center">
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AuthLayout;
