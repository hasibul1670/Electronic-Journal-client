import React from "react";
import { useLocation, useNavigate } from "react-router";

import { Button, Form, Input, Space } from "antd";
import { useContext, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { loginUserContext } from "../../App";
import useAdmin from "../../Hooks/useAdmin";
import useReviewer from "../../Hooks/useReviewer";
import useToken from "../../Hooks/useToken";
import Loading from "../Shared/Loading";

const ShowPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loginUserEmail, setLoginUserEmail] = useContext(loginUserContext);
  const [size, setSize] = useState("large");

  const [token] = useToken(loginUserEmail);
  const navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";
  if (token) {
    <Loading />;
    navigate(from, { replace: true });
  }

  const [formValues, setFormValues] = useState({});

  const handleEmailChange = (e) => {
    setFormValues({ ...formValues, email: e.target.value });
    setEmail(e.target.value);
  };

  const handlePassChange = (e) => {
    setFormValues({ ...formValues, password: e.target.value });
    setPassword(e.target.value);
  };

  const [isReviewer, isReviewerLoading] = useReviewer(email);
  const [isAdmin, isAdminLoading] = useAdmin(email);

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
        console.log("Login successful", data.message);
      } else {
        Swal.fire({
          position: "top-middle",
          icon: "error",
          title: data.message,
          showConfirmButton: false,
          timer: 1200,
        });
        // toast.error(data.message);
      }
    } catch (error) {
      toast.error("Server Down !! Please Try Again Later");
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
          offset: 0,
          span: 0,
        }}
        wrapperCol={{
          offset: 32,
          span: 24,
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
          <Input style={{ height: "40px", width: "100% " }} />
        </Form.Item>

        <Form.Item
          className="font-weight-bold "
          label="Enter  Password"
          name="password"
          onChange={handlePassChange}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password style={{ height: "40px", width: "100% " }} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 32,
          }}
        >
          <Space wrap>
            <Button
              className="font-weight-bold"
              type="primary"
              onClick={() => handleFormSubmit("author")}
              htmlType="submit"
              size={size}
              disabled={!formValues.email || !formValues.password}
            >
              Author Login
            </Button>
            <Button
              type="primary"
              className="font-weight-bold"
              onClick={() => handleFormSubmit("editor")}
              size={size}
              disabled={!formValues.email || !formValues.password}
            >
              Editor Login
            </Button>
            <Button
              type="primary"
              className="font-weight-bold"
              onClick={() => handleFormSubmit("reviewer")}
              size={size}
              disabled={!formValues.email || !formValues.password}
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

            <Link to="/forgetpassword">
              <Button
                className="secondary-button font-weight-bold"
                type="primary"
                size={size}
              >
                Forgot Password
              </Button>
            </Link>
            <br />
            <h5 className="text-danger font-weight-bold">{success || error}</h5>
          </Space>
          <p></p>
        </Form.Item>
      </Form>

      <Toaster />
    </div>
  );
};

export default ShowPassword;
