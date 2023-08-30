import React from "react";
import AboutUs from "../Shared/AboutUs";
import logo from "./../../logo/home.jpg";
import LoginNav from "./LoginNav";
import ShowPassword from "./ShowPassword";

const Login = () => {
  return (
    <div>
      <LoginNav></LoginNav>

      <div className="p-4 bg-login w-75 d-flex justify-content-center p-2 mt-2 mx-auto mb-2">
        <div className="d-none d-lg-flex">
          <img
            className="img-fluid mt-5"
            style={{ height: "190px", width: "165px" }}
            src={logo}
            alt=""
          />

          <div className="w-75 p-5">
            <h1 className="text-lime-600">Login</h1>
            <hr />
            <h4 className="font-weight-bold text-primary">
              International Journal of Computer and Electronics Engineering
            </h4>
            <p></p>
            <ShowPassword></ShowPassword>
          </div>
        </div>

        <div className="d-lg-none text-center">
          <img
            className="img-fluid mt-3"
            style={{ maxWidth: "165px" }}
            src={logo}
            alt=""
          />

          <div className="w-100 p-4">
            <h1 className="text-lime-600">Login</h1>
            <hr />
            <h4 className="font-weight-bold text-primary">
              International Journal of Computer and Electronics Engineering
            </h4>
            <p></p>
            <ShowPassword></ShowPassword>
          </div>
        </div>
      </div>

      <AboutUs />
    </div>
  );
};

export default Login;
