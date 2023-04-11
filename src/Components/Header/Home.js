import React, { PureComponent } from "react";

import { Link } from "react-router-dom";

import logo from "./../../logo/home.jpg";

export default class Home extends PureComponent {
  render() {
    return (
      <div className="home-bg">
        <br />

        <div className="card opacity  p-5 mb-3 w-75 mx-auto">
          <div className=" row no-gutters">
            <div className="col-md-8 d-flex">
              <img
                className="image-fluid"
                style={{ height: "225px", width: "165px" }}
                src={logo}
                alt=""
                srcet=""
              />
              <div className="card-body">
                <h4 className="card-title font-weight-bold ">
                  International Journal of Computer and Electronics Engineering
                </h4>
                <h6 className="card-text">ISSN (online) || 1793-6756</h6>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card-body">
                <Link to="/submit" className=" font-weight-bold btn-lg btn btn-outline-primary btn-block">
                  Submit An Article
                </Link>
                <p />
                <Link to="/explore" className="btn  font-weight-bold btn-outline-info btn-lg btn-block">
                  Explore Our Journal
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="navbar-bg-color d-flex justify-content-center">
          <div className=" ml-5 mr-5 navbar navbar-expand-lg navbar-light">
            <div>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link to="about" className="nav-link nav-text">
                    Online Ready
                  </Link>
                </li>

                <li className="nav-right border-left ">
                  <Link to="/Service" className="nav-link nav-text active">
                    Current Issue
                  </Link>
                </li>

                <li className="nav-right border-left ">
                  <a className="nav-link active nav-text " href="#About">
                    Available Issues
                  </a>
                </li>

                <li className="nav-right border-left ">
                  <Link to="about" className="nav-link active nav-text">
                    About Our Journal
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
