import React from "react";
import { Navigate } from "react-router-dom";

function ProtecctedRoutesFaculty({ children }) {
  const user = localStorage.getItem("faculty-token");
  if (!user) {
    return <Navigate to={"/faculty-login"} />;
  }

  return children;
}

function ProtecctedRoutesFacultyLogin({ children }) {
  const user = localStorage.getItem("faculty-token");
  if (user) {
    return <Navigate to={"/faculty"} />;
  }

  return children;
}

export { ProtecctedRoutesFaculty, ProtecctedRoutesFacultyLogin };
