import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCoffee ,faMagnifyingGlass,faShoppingCart,faUser} from '@fortawesome/free-solid-svg-icons'

/// ...
import logo from './../../logo/logo2.jpg';


function Navbar() {
    return (
        <div class="">  
            <div>
<div class="d-flex flex-row " ><a class="navbar-brand" href="#"><img  style={{height:"60px",width:"400px"}}src={logo}alt="" srcset=""/> </a></div>

<div class=" d-flex flex-row-reverse pr-5">

<div class="pr-3">
<FontAwesomeIcon icon={faUser} />
<h6 >User</h6>
</div>
<div class="pr-3">
<FontAwesomeIcon icon={faShoppingCart} />
<h6 >My Cart</h6>
</div>


<div class="pr-3">
<FontAwesomeIcon icon={faMagnifyingGlass}/>
<h6 >Search</h6>
</div>



</div>

</div>
<br />
<div class="navbar-bg-color d-flex justify-content-center" >
<nav class=" ml-5 mr-5 navbar navbar-expand-lg navbar-light">

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ml-auto">

    <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  Subjects
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">Algorithm</a>
    <a class="dropdown-item" href="#">Image Processing</a>
    <a class="dropdown-item" href="#">IOT</a>
    <a class="dropdown-item" href="#">Compiler Design</a>
    <a class="dropdown-item" href="#">Web Engineering</a>
    <a class="dropdown-item" href="#">Data Mining</a>
  </div>
</div>
     

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