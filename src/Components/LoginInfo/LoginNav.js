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
            <div className="navbar-bg-color d-flex justify-content-center" >
<nav className=" ml-5 mr-5 navbar navbar-expand-lg navbar-light">

  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav ml-auto">
  
<li className="nav-item mr-4 active">
        <a className="nav-link nav-text" href="/">Home</a>
      </li>

      <li className="nav-item active">
        <a className="nav-link nav-text" href="#About">Journals</a>
      </li>
    
      <li className="nav-right mr-3 ">
          <Link to="/Service" className="nav-link nav-text active">Books</Link>
            </li>
            <li className="nav-right mr-3 ">        
          <a className="nav-link active nav-text">Major Reference Works</a>
            </li>
            <li className="nav-right mr-3 ">
          <a className="nav-link active nav-text">Resources For Partners</a>
            </li>
            <li className="nav-right mr-3 ">
          <a className="nav-link active nav-text">Open Access</a>
            </li>
            <li className="nav-right mr-3 ">
          <a className="nav-link active nav-text">About Us</a>
            </li>
            <li className="nav-right mr-3 ">
          <a className="nav-link active nav-text" >Help</a>
            </li>
      
   
   
    </ul>

  
      

  </div>


  
</nav>
</div>
        </div>
    );
};

export default LoginNav;

