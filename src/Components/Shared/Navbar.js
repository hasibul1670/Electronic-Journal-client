import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCoffee ,faMagnifyingGlass,faShoppingCart,faUser} from '@fortawesome/free-solid-svg-icons'

/// ...
import logo from './../../logo/logo2.jpg';


function Navbar() {
    return (
        <div className="">  
            <div>
<div className="d-flex flex-row " ><a className="navbar-brand" href="#"><img  style={{height:"60px",width:"400px"}}src={logo}alt="" srcet=""/> </a></div>

<div className=" d-flex flex-row-reverse pr-5">

<div className="pr-3">
<FontAwesomeIcon icon={faUser} />
<h6 >User</h6>
</div>
<div className="pr-3">
<FontAwesomeIcon icon={faShoppingCart} />
<h6 >My Cart</h6>
</div>


<div className="pr-3">
<FontAwesomeIcon icon={faMagnifyingGlass}/>
<h6 >Search</h6>
</div>



</div>

</div>
<br />
<div className="navbar-bg-color d-flex justify-content-center" >
<nav className=" ml-5 mr-5 navbar navbar-expand-lg navbar-light">

  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav ml-auto">

    <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  Subjects
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a className="dropdown-item" href="#">Algorithm</a>
    <a className="dropdown-item" href="#">Image Processing</a>
    <a className="dropdown-item" href="#">IOT</a>
    <a className="dropdown-item" href="#">Compiler Design</a>
    <a className="dropdown-item" href="#">Web Engineering</a>
    <a className="dropdown-item" href="#">Data Mining</a>
  </div>
</div>
     

      <li className="nav-item active">
        <a className="nav-link nav-text" href="mainmenu">Author</a>
      </li>
    
      <li className="nav-right ">
          <Link to="/Service" className="nav-link nav-text active">Books</Link>
            </li>
            <li className="nav-right ">        
          <a className="nav-link active nav-text">Major Reference Works</a>
            </li>
            <li className="nav-right ">
          <a className="nav-link active nav-text">Resources For Partners</a>
            </li>
            <li className="nav-right ">
          <a className="nav-link active nav-text">Open Access</a>
            </li>
            <li className="nav-right ">
          <a className="nav-link active nav-text">About Us</a>
            </li>
            <li className="nav-right ">
          <a className="nav-link active nav-text" >Help</a>
            </li>
      
   
   
    </ul>
  </div>
</nav>
</div>

             
        </div>
    )
}

export default Navbar