import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router";
import { editorContext } from "../../App";
import app from "../LoginInfo/firebase.config";
import { Link } from "react-router-dom";
const auth = getAuth(app);

const AuthorNav = () => {
  const [user] = useAuthState(auth);

  const signOutFunc = () => {
    signOut(auth);
    Navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-bg-color ">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/" className=" nav-link nav-text">
                Home
              </Link>
            </li>

            <li className="  nav-item active">
              <Link to="/submit/mainmenu" className="nav-link nav-text">
                Main Menu
              </Link>
            </li>

            <li className="nav-item active">
              <Link to="/submit" className="nav-link nav-text">
                Submit a Manuscript
              </Link>
            </li>

            {user && (
              <li className="nav-item active">
                <Link to="/dashboard" className="nav-link nav-text">
                  Dashboard
                </Link>
              </li>
            )}

            <li className="nav-right mr-3 ">
              <Link to="/about"  className="nav-link active nav-text">
                About
              </Link>
            </li>
          </ul>
          <div className="form-inline my-2 my-lg-0">
            <Link
              to="/dashboard"
              className="btn  btn-primary rounded-pill mr-2"
            >
              {user?.displayName}{" "}
            </Link>

            <Link
              to="/login"
              onClick={signOutFunc}
              className="btn  btn-danger rounded-pill"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AuthorNav;