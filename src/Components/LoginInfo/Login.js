import React from 'react';
import ShowPassword from './ShowPassword';
import LoginNav from './LoginNav';
import logo from './../../logo/home.jpg';



  
const Login = () => {
    return (
      <div>
        <LoginNav></LoginNav>

        <div
          style={{ height: "500px" }}
          className=" p-4  bg-login w-75 d-flex justify-content-center p-2 mt-2 mx-auto mb-2"
        >
          <img
            className="image-fluid mt-5"
            style={{ height: "190px", width: "165px" }}
            src={logo}
            alt=""
            srcSet=""
          />

          <div className=" w-75 p-5">
            <h1 className="text-lime-600 ">Login</h1>
            <hr />
            <h4 className="font-weight-bold text-primary">
              International Journal of Computer and Electronics Engineering
            </h4>
            <p></p>
            <ShowPassword></ShowPassword>
          </div>
        </div>

        <div className="mx-auto bg-login  p-5 w-75">
          <h4>
            For Authors: Why choose{" "}
            <span className="text-primary">Gold Open Access?</span>{" "}
          </h4>
          <h6>
            - You will retain copyright of your article (with some exceptions){" "}
            <br />
            - Your article publication process will be fast-tracked <br />
            - Your article will also <br />
            *be freely distributed and reused under Creative Commons Attribution
            license terms (CC BY) or related licenses
            <br />
            *be made fully accessible immediately and perpetually upon
            publication <br />
            *see increased article visibility and discoverability
            <br />
            *receive more downloads – and may mean more opportunities for
            citations
            <br />
            *comply with major open access mandates
            <br />
            *Article processing charges (APC) and any payment invoice will apply
            ONLY AFTER your paper has been accepted. If in doubt, please contact
            openaccess@wspc.com.
            <p></p>
            <p className="text-danger">
              If you are accessing the system for the first time as an Editor,
              please click on the Instructions button to go through a concise
              user guide before you proceed.
            </p>
          </h6>
        </div>
      </div>
    );
};

export default Login;