import { getAuth } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, Navigate,useLocation } from "react-router-dom";

import useFireBase from '../../hooks/useFireBase';
import app from '../LoginInfo/firebase.config';
const auth = getAuth(app)

const PrivateRoute = ({ children}) => {

    const [user,loading] = useAuthState(auth);
 
   const location = useLocation();

   if(loading){
    return <div class="spinner-border m-5" role="status">
    <span class="visually-hidden"></span>
  </div>
  }
    
    if(!user){
        return <Navigate to ="/login" state={{from:location}}replace > </Navigate>

    }
    return children;
};

export default PrivateRoute;
