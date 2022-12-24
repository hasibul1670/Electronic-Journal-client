import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React from 'react';
import app from './firebase.config';
import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import {toast} from 'react-toastify';

const auth = getAuth(app);


const ShowPassword = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');




  const navigate = useNavigate();
   let location = useLocation();
   let from = location.state?.from?.pathname || "/";

  // navigate(from, { replace: true });

  const handleEmailChange =(event)=> {
    setEmail(event.target.value);
    console.log(event.target.value);
    event.preventDefault();
  };

  const handlePassChange =(event)=>{
    console.log("hello",event.target.value)
    setPassword(event.target.value);
    event.preventDefault();
  };

  const signOutFunc=()=>{
    signOut(auth);  
    navigate("/login");
  
}


  const handleFormSubmit = event => {
    signInWithEmailAndPassword(auth,email, password)
      .then((result) => {
        const user = result.user;
        if (user.emailVerified === true) {
          setSuccess('Login Successfully');
         navigate(from, { replace: true });
        }
        else{
          setSuccess('Please Verify Your Email!!');
          signOutFunc();
        }
        })
        .catch((error) => {   
              console.log("errorrrr",error.message)
              setError(error.message);
            })
   
    event.preventDefault();

    // 74.2

  }



  return (
    <div>
      <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input onChange={handleEmailChange} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>

  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input onChange={handlePassChange} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>

</form>
     

        <button onClick={handleFormSubmit} type="submit" className="btn  btn-primary rounded-pill">Author Login</button>

        <button type="submit" className="btn ml-2  btn-primary rounded-pill"> Editor Login</button>
        <button type="submit" className="btn ml-2 btn-primary rounded-pill">Reviewer Login</button>



        <div className="d-flex w-75">


        </div>
        <p></p>

        <a className=" btn btn-dark rounded-pill" href="/newuser" role="button"> New User? Register</a>
        <a className=" ml-3 btn btn-dark rounded-pill" href="/forgetpass" role="button">Forget Password</a>
<br />
        <p className='text-danger font-weight-bold'>{success||error}</p> 
  


    </div>
  );
};

export default ShowPassword;