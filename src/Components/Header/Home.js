import React, { PureComponent } from 'react';

import { Link } from 'react-router-dom';


import logo from './../../logo/home.jpg';

export default class Home extends PureComponent {
  render() {
    return (
      <div className="home-bg">


<br />
<br />

<div className="card opacity p-5 mb-3 w-75 mx-auto">
  <div className=" row no-gutters">
    <div className="col-md-4">
     
      <img className='image-fluid'  style={{height:"225px",width:"165px"}}src={logo}alt="" srcet=""/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
      <h5 className="card-title"> International Journal of Computer and Electronics Engineering </h5>
      <p className="card-text">ISSN (print): 0219-46785 | ISSN (online): 1793-6756</p>
      <a href="/login" className="btn btn-primary">Submit An Article</a>
      </div>
    </div>
  </div>
</div>

<div className="navbar-bg-color d-flex justify-content-center" >
<div className=" ml-5 mr-5 navbar navbar-expand-lg navbar-light">

  <div >
    <ul className="navbar-nav ml-auto">

     

      <li className="nav-item active">
        <a className="nav-link nav-text" href="#About">Online Ready</a>
      </li>
    
      <li className="nav-right border-left ">
          <Link to="/Service" className="nav-link nav-text active">Current Issue</Link>
            </li>

            <li className="nav-right border-left ">        
          <a className="nav-link active nav-text "  href="#About" >Available Issues</a>
            </li>
          
            <li className="nav-right border-left ">        
          <a className="nav-link active nav-text"  href="#About" >About Our Journal</a>
            </li>
    
    </ul>
  </div>
</div>
</div>



      </div>
    )
  }
}
