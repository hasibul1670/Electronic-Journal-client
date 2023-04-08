import { getAuth } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import app from "../Components/LoginInfo/firebase.config";

const auth = getAuth(app);

const PrivateRoute = ({ children }) => {
  let location = useLocation();

  const [user, loading] = useAuthState(auth);

  if (loading) {
    return;

    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
