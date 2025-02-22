import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext); // Assuming AuthContext provides authentication status

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Redirect to="/login" />;
  }

  return <>{children}</>; // Render the protected content if authenticated
};

export default RequireAuth;
