import React from "react";
import { useLocation, useNavigate } from "react-router";

import { Button, Form, Input, Space } from "antd";
import { useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { loginUserContext } from "../../App";
import useAdmin from "../../Hooks/useAdmin";
import useReviewer from "../../Hooks/useReviewer";
import useToken from "../../Hooks/useToken";
import Loading from "../Shared/Loading";
import { useSignOut } from "./signout";

const ShowPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loginUserEmail, setLoginUserEmail] = useContext(loginUserContext);
  const [size, setSize] = useState("large");
  const handleSignOut = useSignOut();

  const [token] = useToken(loginUserEmail);

  const navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";
  if (token) {
    <Loading />;
    navigate(from, { replace: true });
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePassChange = (event) => {
    setPassword(event.target.value);
  };

  // Function to handle sign-out

  const [timerId, setTimerId] = useState(null);
  function handleClick() {
    clearTimeout(timerId);
    const newTimerId = setTimeout(() => {
      setError("");
    }, 3000);

    setTimerId(newTimerId);
  }

  function mapAuthCodeToMessage(errorCode) {
    switch (errorCode) {
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/internal-error":
        return "Enter Your Password !!";

      case "auth/user-not-found":
        return "User not found. Please check your email and password";

      case "auth/invalid-email":
        return "Provided Email is invalid";

      case "auth/too-many-requests":
        return "Too many requests ! Please try again later";

      default:
        return "An error occurred. Please try again later.";
    }
  }
  let IsMatched = false;

  const [isReviewer, isReviewerLoading] = useReviewer(email);
  const [isAdmin, isAdminLoading] = useAdmin(email);

  //Login function start
  //   handleClick();

  const handleFormSubmit = async (userType) => {
    try {
      const response = await fetch("http://localhost:4000/reviewerLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, userType }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        
        const userEmail = data.user.email;
        setLoginUserEmail(userEmail);
        localStorage.setItem("loginUserEmail", userEmail);
        console.log("Login successful",data.message);
    
      } else {
        console.log(data.message);
     
      }
    } catch (error) {
      console.log("Server Down !! Please Try Again Later", error);
    }
  };

  //Login function end

  if (isAdminLoading || isReviewerLoading) {
    <p>
      <Loading />
    </p>;
  }

  return (
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 800,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          className="font-weight-bold"
          label=" Enter Your Email"
          name="email"
          onChange={handleEmailChange}
          rules={[
            {
              required: true,
              message: "Please input your Email Address!",
            },
          ]}
        >
          <Input style={{ height: "40px" }} />
        </Form.Item>

        <Form.Item
          className="font-weight-bold"
          label="Enter Your Password"
          name="password"
          onChange={handlePassChange}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password style={{ height: "40px" }} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 16,
          }}
        >
          <Space wrap>
            <Button
              className="font-weight-bold"
              type="primary"
              onClick={() => handleFormSubmit("author")}
              htmlType="submit"
              size={size}
            >
              Author Login
            </Button>
            <Button
              type="primary"
              className="font-weight-bold"
              onClick={() => handleFormSubmit("editor")}
              size={size}
            >
              Editor Login
            </Button>
            <Button
              type="primary"
              className="font-weight-bold"
              onClick={() => handleFormSubmit("reviewer")}
              size={size}
            >
              Reviewer Login
            </Button>

            <Link to="/newuser">
              <Button
                className="register-button font-weight-bold"
                type="primary"
                size={size}
              >
                New User ? Register
              </Button>
            </Link>

            <Link to="/forgetpass">
              <Button
                className="secondary-button font-weight-bold"
                type="primary"
                size={size}
              >
                Forget Password
              </Button>
            </Link>
            <br />
            <h5 className="text-danger font-weight-bold">{success || error}</h5>
          </Space>
        </Form.Item>
      </Form>

      <Toaster />
    </div>
  );
};

export default ShowPassword;
