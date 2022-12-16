import React from 'react';
import { useNavigate, Navigate,useLocation } from "react-router-dom";

import useFireBase from '../../hooks/useFireBase';

const PrivateRoute = ({ children}) => {
    const {user}=useFireBase();
   const location = useLocation();
    

    if(!user){
        return <Navigate to ="/login" state={{from:location}}replace > </Navigate>

    }
    return children;
};

export default PrivateRoute;
