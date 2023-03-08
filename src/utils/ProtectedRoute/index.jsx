import React from "react";
import { Route, Navigate } from "react-router-dom";

export const ProtectedRoute = ({ user, children }) => {
  if (!localStorage.getItem("userData")) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
