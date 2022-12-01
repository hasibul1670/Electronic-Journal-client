import React from 'react';
import { Link } from 'react-router-dom';

const AuthorNav = () => {
    return (
        <div>
              <div class="navbar-bg-color d-flex justify-content-start" >
<nav class=" ml-5 mr-5 navbar navbar-expand-lg navbar-light">

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ml-auto">


     
<li class="nav-item active">
        <a class=" nav-link nav-text" href="/">Home</a>
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
  </div>
</nav>
</div>
        </div>
    );
};

export default AuthorNav;