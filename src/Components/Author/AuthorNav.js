import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router';
import useFireBase from '../../hooks/useFireBase';
import app from '../LoginInfo/firebase.config';
const auth = getAuth(app)

const AuthorNav = () => {

  const [user, loading, error] = useAuthState(auth);
 

  const signOutFunc=()=>{
    signOut(auth);  
    Navigate("/login");
    
  
}

    return (
      
<div>


<nav className="navbar navbar-expand-lg navbar-bg-color ">

  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
    <li className="nav-item active">
        <a className=" nav-link nav-text" href="/submithome">Home</a>
      </li>

      <li className="  nav-item active">
        <a className="nav-link nav-text" href="/mainmenu">Main Menu</a>
      </li>


     <li className="nav-item active">
        <a className="nav-link nav-text" href="/submit">Submit a Manuscript</a>
      </li>
            <li className="nav-right mr-3 ">        
          <a  href="/submit" className="nav-link active nav-text">About</a>
            </li>
    </ul>
    
    <div className="form-inline my-2 my-lg-0">
     


<a  className="btn  btn-primary rounded-pill mr-2" href="/authordashboard" >{user?user.displayName:'No Body'} </a>

<a  onClick={signOutFunc} className="btn  btn-danger rounded-pill" href="/login" >Sign Out</a>


     
    </div>
  </div>
</nav>

        </div>
    );
};

export default AuthorNav;