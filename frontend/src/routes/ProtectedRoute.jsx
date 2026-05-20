import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("admin-token");
  // console.log(user);

  if (!user) {
    return <Navigate to={"/admin-login"} />;
  }

  return children;
}
function ProtectedRouteLogin({ children }) {
  const user = localStorage.getItem("admin-token");
  // console.log(user);

  if (user) {
    return <Navigate to={"/admin"} />;
  }

  return children;
}

export { ProtectedRoute, ProtectedRouteLogin };
