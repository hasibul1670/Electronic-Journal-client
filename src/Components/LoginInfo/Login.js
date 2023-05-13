import React from 'react';
import ShowPassword from './ShowPassword';
import LoginNav from './LoginNav';
import logo from './../../logo/home.jpg';
import AboutUs from '../Shared/AboutUs';



  
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
        <AboutUs/>
   
     
      </div>
    );
};

export default Login;