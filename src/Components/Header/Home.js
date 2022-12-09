import React, { PureComponent } from 'react';

import { Link } from 'react-router-dom';


import logo from './../../logo/home.jpg';

export default class Home extends PureComponent {
  render() {
    return (
      <div class="home-bg">


<br />
<br />

<div class="card  p-5 mb-3 w-75 mx-auto">
  <div class=" row no-gutters">
    <div class="col-md-4">
     
      <img  style={{height:"225px",width:"165px"}}src={logo}alt="" srcset=""/>
    </div>
    <div class="col-md-8">
      <div class="card-body">
      <h5 class="card-title">International Journal of Computer and Electronics Engineering </h5>
      <p class="card-text">ISSN (print): 0219-4678 | ISSN (online): 1793-6756</p>
      <a href="/login" class="btn btn-primary">Submit An Article</a>
      </div>
    </div>
  </div>
</div>

<div class="navbar-bg-color d-flex justify-content-center" >
<div class=" ml-5 mr-5 navbar navbar-expand-lg navbar-light">

  <div >
    <ul class="navbar-nav ml-auto">

     

      <li class="nav-item active">
        <a class="nav-link nav-text" href="#About">Online Ready</a>
      </li>
    
      <li class="nav-right border-left ">
          <Link to="/Service" class="nav-link nav-text active">Current Issue</Link>
            </li>

            <li class="nav-right border-left ">        
          <a class="nav-link active nav-text "  href="#About" >Available Issues</a>
            </li>
          
            <li class="nav-right border-left ">        
          <a class="nav-link active nav-text"  href="#About" >About Our Journal</a>
            </li>
    
    </ul>
  </div>
</div>
</div>



      </div>
    )
  }
}
