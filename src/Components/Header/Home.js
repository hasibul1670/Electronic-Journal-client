import React, { useContext } from "react";

import { Link } from "react-router-dom";

import { loginUserContext } from "../../App";
import useAdmin from "../../Hooks/useAdmin";
import logo from "./../../logo/home.jpg";

const Home = () => {
  const [loginUserEmail] = useContext(loginUserContext);

  const [isAdmin] = useAdmin(loginUserEmail);

  return (
    <div className="img-fluid home-bg">
      <br />

      <div className="card opacity  p-5 mb-3 w-75 mx-auto">
        <div className=" row no-gutters">
          <div className="col-md-8 d-flex">
            <img
              className="img-fluid"
              style={{ height: "225px", width: "165px" }}
              src={logo}
              alt=""
              srcet=""
            />
            <div className="card-body img-fluid ">
              <h4 className="card-title font-weight-bold ">
                International Journal of Computer and Electronics Engineering
              </h4>
              <h6 className="card-text">ISSN (online) || 1793-6756</h6>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card-body">
              {isAdmin ? (
                <Link
                  to="/Dashboard"
                  className=" font-weight-bold btn-lg btn btn-outline-primary btn-block"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <Link
                  to="/submit"
                  className=" font-weight-bold btn-lg btn btn-outline-primary btn-block"
                >
                  Submit An Article
                </Link>
              )}

              <p />
              <Link
                to="/explore"
                className="btn  font-weight-bold btn-outline-info btn-lg btn-block"
              >
                Explore Our Journal
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="navbar-bg-color d-flex justify-content-center"></div>
    </div>
  );
};

export default Home;
