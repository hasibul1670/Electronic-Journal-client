import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React from "react";
import app from "./firebase.config";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useState } from "react";
import { UserContext, editorContext } from "../../App";
import { useContext } from "react";
import AuthorContext from "../../contexts/AuthorContext";
import { Container } from 'react-bootstrap';
const auth = getAuth(app);

  const ShowPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [adminLogin, setAdminLogin] = useState("");
  const [editor] = useContext(editorContext);
  
  const navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  // navigate(from, { replace: true });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
 
    event.preventDefault();
  };

  const handlePassChange = (event) => {
    setPassword(event.target.value)
    event.preventDefault();
  };

  const signOutFunc = () => {
    signOut(auth);
    navigate("/login");
  };

  function mapAuthCodeToMessage(authCode) {
    switch (authCode) {
      case "auth/wrong-password":
        return "Wrong Password !!";
      case "auth/internal-error":
        return "Enter Your Password !!";

      case "auth/user-not-found":
        return "User not found ! Please Sign Up";

      case "auth/invalid-email":
        return "Email provided is invalid";

      case "auth/too-many-requests":
        return "Too many requests ! Please try again later";

      default:
        return "";
    }
  }
  let IsMatched=false;

  const handleEditorLogin = () => {
 
      navigate(from, { replace: true });
      console.log('log in admin');

      toast.error(mapAuthCodeToMessage(error)); 

    //admin@ejournal.com
    //admin@ejournal
  };



  const handleFormSubmit = (event) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        if (user.emailVerified === true) {
         // setSuccess("Login Successfully");
//get jwt token is required

const currentUser= {
  email:user.email
}

fetch ('http://localhost:4000/jwt',{
  method: 'POST',
  headers: {  
    'content-type': 'application/json'
},
body: JSON.stringify(currentUser)
        })
        .then(res=>res.json())
        .then(data=>{
          console.log('Hello token',data);
          localStorage.setItem('e-token',data.token);
          navigate(from, { replace: true });

                });

       
        } else {
          setSuccess("Please Verify Your Email!!");
          toast.error("Please Verify Your Email!!");
          signOutFunc();
        }
      })

      .catch((error) => {
        setError(mapAuthCodeToMessage(error.code));
        console.log("Hello", error.code);
      });
  };

  return (
    <div>
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            onChange={handleEmailChange}
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            onChange={handlePassChange}
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
      </form>

      <button
        onClick={handleFormSubmit}
        type="submit"
        className="btn  btn-primary rounded-pill"
      >
        Author Login
      </button>

      <button
        type="submit"
        onClick={handleEditorLogin}
        className="btn ml-2 btn-primary rounded-pill"
      >
        Editor Login
      </button>
      <button type="submit" className="btn ml-2 btn-primary rounded-pill">
        Reviewer Login
      </button>

      <div className="d-flex w-75"></div>
      <p></p>

      <a className=" btn btn-dark rounded-pill" href="/newuser" role="button">
        {" "}
        New User? Register
      </a>
      <a
        className=" ml-3 btn btn-dark rounded-pill"
        href="/forgetpass"
        role="button"
      >
        Forget Password
      </a>
      <br />
      <p className="text-danger font-weight-bold">{success || error}</p>
    </div>
  );
};

export default ShowPassword;
