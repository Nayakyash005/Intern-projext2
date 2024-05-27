import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Authcontext } from "./Authcontext";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log("hamara user", token);

  if (!token) {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/login" />;
  }

  // Render the protected component if user is authenticated
  return children;
};

export default PrivateRoute;
