import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoutesStudent({ children }) {
  const user = localStorage.getItem("student-token");

  if (!user) {
    return <Navigate to={"/student-login"} />;
  }

  return children;
}

function Protectestudentlogin({ children }) {
  const user = localStorage.getItem("student-token");

  if (user) {
    return <Navigate to={"/student"} />;
  }

  return children;
}

export { ProtectedRoutesStudent, Protectestudentlogin };
