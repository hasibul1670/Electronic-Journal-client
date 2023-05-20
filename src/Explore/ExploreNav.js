import React from 'react';
import { Link } from 'react-router-dom';
import logo from "./../logo/logo3.png";


const ExploreNav = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light ">
            <Link to="/" className="navbar-brand">
            <img
            className='img-fluid'
              style={{ height: "100px", width: "300px" }}
              src={logo}
              alt=""
              srcet=""
            />{" "}
          </Link>



  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item ">
        <Link to="/explore/aim"  className="nav-link font-weight-bold" >Aim & Scope</Link>
      </li>
      <li className="nav-item ">
        <Link to="/explore/guideline"  className="nav-link font-weight-bold " >Submission Guidelines</Link>
      </li>
      <li className="nav-item ">
        <Link to="/explore/review-policy"  className="nav-link font-weight-bold " >Review Policy </Link>
      </li>
      <li className="nav-item">
        <Link to="/explore/contactus" className="nav-link font-weight-bold ">Contact Us</Link>
      </li>
  
    </ul>
  </div>
</nav>
        </div>
    );
};

export default ExploreNav;