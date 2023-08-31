/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
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

         
            <li className="nav-right mr-3 ">
          <a  className="nav-link active nav-text" href="/openaccess">Open Access</a>
            </li>
            <li className="nav-right mr-3 ">
          <a className="nav-link active nav-text" href="/about">About Us</a>
            </li>
            <li className="nav-right mr-3 ">
          <a className="nav-link active nav-text"  href='/help'>Help</a>
            </li>
      
   
   
    </ul>

  
      

  </div>


  
</nav>
</div>
        </div>
    );
};

export default LoginNav;

