import { getAuth } from 'firebase/auth';
import React from 'react';
import app from './firebase.config';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router';
const auth = getAuth(app)

const ShowPassword = () => {

  const { register, formState: { errors }, handleSubmit }=useForm();
  
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  let signiInError;
  const navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname ||"/";

if(loading){
  return <div class="spinner-border m-5" role="status">
  <span class="visually-hidden"></span>
</div>
}
if(error){
  signiInError=<p className='text-danger'>{error?.message}</p>
  
}
if(user){
  console.log(user)
  navigate(from,{replace:true});
}

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email,data.password);
    console.log(data)
   
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} >
{/* Email Section */}
<div class="col-md-6 mb-3">
    <label className='ml-2' for="exampleInputEmail1">Email Address : </label>
    <input
    type="email"  class="form-control mx-sm-3"
     {...register("email", {
      required:
      {
        value: true,
        message: 'Email is Required'
      },
      pattern: {
        value:/\S+@\S+\.\S+/,
        message: 'Provide a valid Email'
      }
    })} 
    aria-invalid={errors.email ? "true" : "false"} 
     placeholder="Enter Your Email"/>
     <p class='text-danger' >{errors.email?.message}</p>
{/* 
       {errors.email?.type === 'required' && <p class='text-danger' >{errors.email?.message}</p>}
       {errors.email?.type === 'pattern' && <p class='text-danger' >{errors.email?.message}</p>} */}
 
  </div>

{/* Password */}

<div class="col-md-6 mb-3">
    <label className='ml-2'>Password: </label>
    <input
    type="password"  class="form-control mx-sm-3" placeholder="Enter Your Password"
     {...register("password", {
      required:
      {
        value: true,
        message: 'Password is Required'
      },
      minLength: {
        value:6,
        message: 'Must be 6 Characters or longer'
      }

    })} 
/>
<p class='text-danger' >{errors.password?.message}</p>

     
  </div>

{signiInError}
  <button  onSubmit={handleSubmit(onSubmit)} type="submit" class="btn  btn-primary rounded-pill">Author Login</button>

<button  type="submit" class="btn ml-2  btn-primary rounded-pill"> Editor Login</button>
<button type="submit" class="btn ml-2 btn-primary rounded-pill">Reviewer Login</button>
      </form>

      

<div className="d-flex w-75"> 

 
 </div>
<p></p>

 <a class="btn  btn-secondary rounded-pill" href="/newuser" role="button">Register</a>
 <a  class="btn ml-3 btn-secondary rounded-pill" href="/forgetPass" role="button">Forget Password</a>
    </div>
  );
};

export default ShowPassword;