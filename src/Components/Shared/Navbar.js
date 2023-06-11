import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import logo from "./../../logo/logo3.png";
import { authorContext, loginUserContext } from "../../App";
import { useSignOut } from "../LoginInfo/signout";

let name ;

function Navbar() {
  const handleSignOut = useSignOut();

  const [loginUserEmail, setLoginUserEmail] = useContext(loginUserContext);
 

  const [loginUser, setLoginuser] = useState("");

  const [author] = useContext(authorContext);
  const userEmail = loginUserEmail;

  for (let i = 0; i < author.length; i++) {
    if (author[i].email === userEmail) {
      const matchingObject = author[i];
      name = matchingObject.authorName || matchingObject.reviewerName;
      break;
    }
  }
  
  const signOutFunc = () => {
    handleSignOut()
    Navigate("/login");
  };

  return (
    <div  className="">
      <div className="d-flex bd-highlight">
        <div className="mr-auto p-2 bd-highlight">
          <Link to="/" className="navbar-brand">
            <img
            className="img-fluid "
              style={{ height: "100px", width: "350px" }}
              src={logo}
              alt=""
              srcet=""
            />{" "}
          </Link>
        </div>

        <div className="  p-2">
          {loginUserEmail ? (
            <Link
              to="/"
              onClick={signOutFunc}
              className="btn mr-2 btn-danger rounded-pill"
            >
              Sign Out{" "}
            </Link>
          ) : (
            <Link to="/login" className="btn  btn-danger rounded-pill">
              Login{" "}
            </Link>
          )}

          {loginUserEmail ? (
            <Link
              to="/submit/mainmenu"
              className="btn  btn-primary rounded-pill mr-2"
            >
              {name}
            </Link>
          ) : (
            <Link to="/login" className="btn  btn-primary rounded-pill mr-2">
              Guest
            </Link>
          )}
        </div>
      </div>

      <br />
      <div className="navbar-bg-color d-flex justify-content-center">
        <nav className=" ml-5 mr-5 navbar navbar-expand-lg navbar-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-right ">
                <Link to="/" className="nav-link nav-text active">
                  Home
                </Link>
              </li>

             

              {loginUserEmail && (
                <li className="nav-item active">
                  <Link to="/dashboard" className="nav-link nav-text">
                    Dashboard
                  </Link>
                </li>
              )}

              <li className="nav-right ">
                <Link to="/openaccess" className="nav-link active nav-text">
                  Open Access
                </Link>
              </li>
              <li className="nav-right ">
                <Link to="/about" className="nav-link active nav-text">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
        <Link to="/explore/editorial-board" className="nav-link active nav-text">Editorial Board</Link>
      </li>
              <li className="nav-right ">
                <Link to="/help" className="nav-link active nav-text">
                  Help
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
