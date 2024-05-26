import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Authcontext } from "./components/Authcontext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(Authcontext);
  console.log(user);

  if (!user) {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/login" />;
  }

  // Render the protected component if user is authenticated
  return children;
};

export default PrivateRoute;
