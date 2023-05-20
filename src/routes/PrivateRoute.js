import { getAuth } from "firebase/auth";
import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import app from "../Components/LoginInfo/firebase.config";
import { loginUserContext } from "../App";

const auth = getAuth(app);

const PrivateRoute = ({ children }) => {
  let location = useLocation();

  const [loginUserEmail] = useContext(loginUserContext);

 
  if (loginUserEmail) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
