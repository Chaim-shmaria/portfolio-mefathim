import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Login from "./login/Login";
import useCustomAlert from '../Hooks/useAlert';

export default function SafeRoutes({
  roles,
  children,
}: {
  roles: string[];
  children?: JSX.Element;
}) {
  const isLogged = sessionStorage.getItem("isLogged");
  const userRole = sessionStorage.getItem("userRole") || "";
  const { showAlert, renderAlert } = useCustomAlert();

  if (!isLogged) {
    return <Login />;
  } else if (roles.length > 0 && !roles.includes(userRole)) {
    showAlert("אין לך הרשאה");
    return <Login />;
  } else {
    return children || <Outlet />;
  }
}
