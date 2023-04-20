import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React from "react";
import app from "./firebase.config";
import { useLocation, useNavigate } from "react-router";

import { useState } from "react";
import { editorContext } from "../../App";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button,Form,Space,Input } from "antd";
import { Link } from "react-router-dom";
const auth = getAuth(app);

const ShowPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [adminLogin, setAdminLogin] = useState("");
  const [editor] = useContext(editorContext);
    const [size, setSize] = useState("large"); 

  const navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  // navigate(from, { replace: true });


  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    event.preventDefault();
  };

  const handlePassChange = (event) => {
    setPassword(event.target.value);
    event.preventDefault();
  };


  const signOutFunc = () => {
    signOut(auth);
    navigate("/login");
  };





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

  const handleEditorLogin = () => {
   // navigate(from, { replace: true });
  const errorMessage = mapAuthCodeToMessage(error.code);
    toast.error(mapAuthCodeToMessage(error));

    //admin@ejournal.com
    //admin@ejournal
  };

  




  const handleFormSubmit = (event) => {
    console.log('Hello',email,password);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        if (user.emailVerified === true) {
            navigate(from, { replace: true });
          const currentUser = {
            email: user.email,
            
          };

          fetch("http://localhost:4000/jwt", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(currentUser),
          })
            .then((res) => res.json())
            .then((data) => {
            
              localStorage.setItem("e-token", data.token);
            });
        } else {
          setSuccess("Please Verify Your Email!!");
          toast.error("Please Verify Your Email!!");
         
          signOutFunc();
        }
      })

      .catch((error) => {
        setError(mapAuthCodeToMessage(error.code));
        const errorMessage = mapAuthCodeToMessage(error.code);
        setError(errorMessage);
        toast.error(errorMessage);
       
      });
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label=" Enter Email"
          name="email"
          onChange={handleEmailChange}
          rules={[
            {
              required: true,
              message: "Please input your Email Address!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          onChange={handlePassChange}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Space wrap>
            <Button
              type="primary"
              onClick={handleFormSubmit}
              htmlType="submit"
              size={size}
            >
              Author Login
            </Button>
            <Button type="primary" onClick={handleEditorLogin} size={size}>
              Editor Login
            </Button>
            <Button type="primary" size={size}>
              Reviewer Login
            </Button>
     
            <Link to="/newuser">
              <Button type="primary" size={size}>
                New User ? Register
              </Button>
            </Link>

            <Link to="/forgetpass">
              {" "}
              <Button type="primary" size={size}>
                Forget Password
              </Button>
            </Link>
            <br />
            <h5 className="text-danger font-weight-bold">{success || error}</h5>
          </Space>
        </Form.Item>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default ShowPassword;
