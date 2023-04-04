import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React from "react";
import { createContext } from "react";
import app from "../Components/LoginInfo/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";

export const authorContext = createContext();

const AuthorContext = ({ children }) => {
  const auth = getAuth(app )
  


  
const[user,setUser] =useState()

  return (
    <authorContext.Provider >
      {children}
    </authorContext.Provider>
  );
};

export default AuthorContext;
