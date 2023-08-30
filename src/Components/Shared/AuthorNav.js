import { getAuth } from "firebase/auth";
import React, { useContext } from "react";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import { authorContext, loginUserContext } from "../../App";
import useAdmin from "../../Hooks/useAdmin";
import useReviewer from "../../Hooks/useReviewer";
import app from "../LoginInfo/firebase.config";
import { useSignOut } from "../LoginInfo/signout";
const auth = getAuth(app);

export let name;
export let photo;

const AuthorNav = () => {
  const [loginUserEmail] = useContext(loginUserContext);
  const [isAdmin] = useAdmin(loginUserEmail);
  const [isReviewer] = useReviewer(loginUserEmail);
  const handleSignOut = useSignOut();

  const [author] = useContext(authorContext);
  const userEmail = loginUserEmail;

  for (let i = 0; i < author.length; i++) {
    if (author[i].email === userEmail) {
      const matchingObject = author[i];
      name = matchingObject.authorName || matchingObject.reviewerName;
      photo = matchingObject.profilePic || matchingObject.profilePic;
      break;
    }
  }

  const signOutFunc = () => {
    handleSignOut();
    Navigate("/login");
  };
  const roleText = isAdmin ? "Admin" : isReviewer ? "Reviewer" : "Author";
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

            {!isAdmin && !isReviewer ? (
              <li className="nav-item active">
                <Link to="/submit" className="nav-link nav-text">
                  Submit a Manuscript
                </Link>
              </li>
            ) : (
              " "
            )}

            {userEmail && (
              <li className="nav-item active">
                <Link to="/dashboard" className="nav-link nav-text">
                  Dashboard
                </Link>
              </li>
            )}

            <li className="nav-right mr-3 ">
              <Link to="/about" className="nav-link active nav-text">
                About
              </Link>
            </li>
          </ul>

          <div className="form-inline my-2 my-lg-0">
            <Link
              to="/dashboard"
              className="btn btn-secondary rounded-pill mr-2"
            >
              <h6 className="text-white">{roleText}</h6>
            </Link>

            <Link
              to="/dashboard"
              className="btn  btn-primary rounded-pill mr-2"
            >
              {name}
            </Link>

            <Link
              to="/login"
              onClick={signOutFunc}
              className="btn  btn-danger rounded-pill"
            >
              Log Out
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AuthorNav;
