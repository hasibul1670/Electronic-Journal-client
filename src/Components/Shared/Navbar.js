import React from "react";
import { Link, Navigate } from "react-router-dom";

import app from "../LoginInfo/firebase.config";
import logo from "./../../logo/logo3.png";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContext } from "react";
import { authorContext, editorContext } from "../../App";
import { useState } from "react";

function Navbar() {
  const [editor] = useContext(editorContext);
  const [author] = useContext(authorContext);
  const [name, setName] = useState("");
  const auth = getAuth(app);

  const signOutFunc = () => {
    signOut(auth);
    Navigate("/login");
  };



  <ul>
  {author.map((item, index) => (
    <li key={index}>{item.email}</li>
    
  
  ))}
   
</ul>

  const [user] = useAuthState(auth);



  console.log("Hello", user.email);

  return (
    <div className="">
      <div className="d-flex bd-highlight">
        <div className="mr-auto p-2 bd-highlight">
          <a className="navbar-brand" href="/">
            <img
              style={{ height: "80px", width: "400px" }}
              src={logo}
              alt=""
              srcet=""
            />{" "}
          </a>
        </div>

        <div className="  p-2">
          {user ? (
            <a
              onClick={signOutFunc}
              href="/"
              className="btn mr-2 btn-danger rounded-pill"
            >
              Sign Out{" "}
            </a>
          ) : (
            <a className="btn  btn-danger rounded-pill" href="/login">
              Login{" "}
            </a>
          )}

          <a className="btn  btn-primary rounded-pill mr-2" href="/mainmenu">
            {user ? user.displayName : "Guest"}
          </a>
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

              <div className="dropdown">
                <button
                  className="btn nav-link nav-text btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Subjects
                </button>

                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="#">
                    Algorithm
                  </a>
                  <a className="dropdown-item" href="#">
                    Image Processing
                  </a>
                  <a className="dropdown-item" href="#">
                    IOT
                  </a>
                  <a className="dropdown-item" href="#">
                    Compiler Design
                  </a>
                  <a className="dropdown-item" href="#">
                    Web Engineering
                  </a>
                  <a className="dropdown-item" href="#">
                    Data Mining
                  </a>
                </div>
              </div>

              {user && (
                <li className="nav-item active">
                  <a className="nav-link nav-text" href="/dashboard">
                    Dashboard
                  </a>
                </li>
              )}

              <li className="nav-right ">
                <Link to="/book" className="nav-link nav-text active">
                  Books
                </Link>
              </li>

              <li className="nav-right ">
                <a href="/openaccess" className="nav-link active nav-text">
                  Open Access
                </a>
              </li>
              <li className="nav-right ">
                <a href="/about" className="nav-link active nav-text">
                  About Us
                </a>
              </li>
              <li className="nav-right ">
                <a href="/help" className="nav-link active nav-text">
                  Help
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
