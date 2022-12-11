import React from 'react';


import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCoffee ,faMagnifyingGlass,faShoppingCart,faUser} from '@fortawesome/free-solid-svg-icons'

/// ...
import logo from './../../logo/logo2.jpg';
import userEvent from '@testing-library/user-event';
import useFireBase from '../../hooks/useFireBase';
const LoginNav = () => {



    return (
        <div>
            <div class="navbar-bg-color d-flex justify-content-center" >
<nav class=" ml-5 mr-5 navbar navbar-expand-lg navbar-light">

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ml-auto">
  
<li class="nav-item mr-4 active">
        <a class="nav-link nav-text" href="/">Home</a>
      </li>

      <li class="nav-item active">
        <a class="nav-link nav-text" href="#About">Journals</a>
      </li>
    
      <li class="nav-right mr-3 ">
          <Link to="/Service" class="nav-link nav-text active">Books</Link>
            </li>
            <li class="nav-right mr-3 ">        
          <a class="nav-link active nav-text">Major Reference Works</a>
            </li>
            <li class="nav-right mr-3 ">
          <a class="nav-link active nav-text">Resources For Partners</a>
            </li>
            <li class="nav-right mr-3 ">
          <a class="nav-link active nav-text">Open Access</a>
            </li>
            <li class="nav-right mr-3 ">
          <a class="nav-link active nav-text">About Us</a>
            </li>
            <li class="nav-right mr-3 ">
          <a class="nav-link active nav-text" >Help</a>
            </li>
      
   
   
    </ul>

  
      

  </div>


  
</nav>
</div>
        </div>
    );
};

export default LoginNav;