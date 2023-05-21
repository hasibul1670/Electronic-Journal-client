import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

export default class Nomatch extends PureComponent {
  render() {
    return (
      <div>
        {" "}
        <div className="d-flex align-items-center justify-content-center vh-100">
          <div className="text-center">
            <h1 className="display-1 fw-bold font-weight-bold ">404</h1>
            <p className="fs-3 font-weight-bold ">
              {" "}
              <span className="text-danger ">Opps!</span> Page not found.
            </p>
            <p className="lead font-weight-bold ">
              The page you’re looking for doesn’t exist.
            </p>
            <Link to="/" className="btn btn-primary">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
