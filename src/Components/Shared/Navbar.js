import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCoffee ,faMagnifyingGlass,faShoppingCart,faUser} from '@fortawesome/free-solid-svg-icons'

/// ...
import logo from './../../logo/logo2.jpg';


function Navbar() {
    return (
        <div>  
            <div>
<div><a class="navbar-brand" href="#"><img  style={{height:"60px",width:"400px"}}src={logo}alt="" srcset=""/> </a></div>

<div></div>
<h1>hello </h1>
<FontAwesomeIcon icon={faCoffee} />
<FontAwesomeIcon icon={faMagnifyingGlass}/>
<FontAwesomeIcon icon={faShoppingCart} />
<FontAwesomeIcon icon={faUser} />
</div>
<br />
<div class="navbar-bg-color d-flex justify-content-center" >
<nav class=" ml-5 mr-5 navbar navbar-expand-lg navbar-light">

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
      <Link to="/home" class="nav-link nav-text" href="#">Subjects <span class="sr-only">(current)</span></Link>
      </li>
      <li class="nav-item active">
        <a class="nav-link nav-text" href="#About">Journals</a>
      </li>
    
      <li class="nav-right ">
          <Link to="/Service" class="nav-link nav-text active">Books</Link>
            </li>
            <li class="nav-right ">        
          <a class="nav-link active nav-text">Major Reference Works</a>
            </li>
            <li class="nav-right ">
          <a class="nav-link active nav-text">Resources For Partners</a>
            </li>
            <li class="nav-right ">
          <a class="nav-link active nav-text">Open Access</a>
            </li>
            <li class="nav-right ">
          <a class="nav-link active nav-text">About Us</a>
            </li>
            <li class="nav-right ">
          <a class="nav-link active nav-text" >Help</a>
            </li>
      
   
   
    </ul>
  </div>
</nav>
</div>

             
        </div>
    )
}

export default Navbar