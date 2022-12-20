import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router';
import useFireBase from '../../hooks/useFireBase';
import app from '../LoginInfo/firebase.config';
const auth = getAuth(app)

const AuthorNav = () => {

  const [user, loading, error] = useAuthState(auth);
  console.log(user);

  const signOutFunc=()=>{
    signOut(auth);  
    Navigate("/login");
  
}


    return (
      
<div>


<nav class="navbar navbar-expand-lg navbar-bg-color ">

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
    <li class="nav-item active">
        <a class=" nav-link nav-text" href="/submithome">Home</a>
      </li>

      <li class="  nav-item active">
        <a class="nav-link nav-text" href="/mainmenu">Main Menu</a>
      </li>


     <li class="nav-item active">
        <a class="nav-link nav-text" href="/submit">Submit a Manuscript</a>
      </li>
            <li class="nav-right mr-3 ">        
          <a  href="/submit" class="nav-link active nav-text">About</a>
            </li>
    </ul>
    
    <div class="form-inline my-2 my-lg-0">
     


<a  class="btn  btn-primary rounded-pill mr-2" href="/" >{user?user.displayName: 'No Body'} </a>

<a  onClick={signOutFunc} class="btn  btn-danger rounded-pill" href="/login" >Sign Out</a>


     
    </div>
  </div>
</nav>

        </div>
    );
};

export default AuthorNav;