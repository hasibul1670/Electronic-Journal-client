import { getAuth } from 'firebase/auth';
import React, { useState } from 'react';

import { useSendPasswordResetEmail} from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router';
import app from '../LoginInfo/firebase.config';
const auth = getAuth(app)

const ForgetPass = () => {
    const { register, formState: { errors }, handleSubmit }=useForm();
  

  
    const [sendPasswordResetEmail,sending,error] = useSendPasswordResetEmail(auth);
  
  
    let signiInError;
    //let success;
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();
    let location = useLocation();

  
    
    if(error){
        signiInError=<p  className='font-weight-bold text-danger'>{error?.message}</p> 
      }


    const onSubmit = async(data) => {
      const passReset =   await sendPasswordResetEmail(data.email); 
      if(sending){
        return <div className="spinner-border m-5" role="status">
        <span className="visually-hidden"></span>
      </div>
      }
     
      if(passReset){
        setSuccess(<p className=' font-weight-bold text-danger'>Password Reset Email Send!!
        Please! Check Your Email inbox/spam</p>) }
      
    }
  
    return (
        <div className='mx-auto align-content-center  p-5'>
            <h4 className='text-primary'>To Reset your password please, Provide your registered email </h4>
            <hr />

            <form className='border border-primary p-5' onSubmit={handleSubmit(onSubmit)} >
{/* Email Section */}
<div className="col-md-6 mb-3">
    <label className='ml-2' htmlFor="exampleInputEmail1">Enter Your Email Address : </label>
    <input
    type="email"  className="form-control mx-sm-3 "
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
     <p className='text-danger' >{errors.email?.message}</p>
 
  </div>
  <button  onSubmit={handleSubmit(onSubmit)} 
  type="submit" className="btn ml-3 btn-primary rounded-pill">Reset Your Password
  </button>

  <a className="btn ml-3 btn-secondary rounded-pill" href="/login" role="button">Go to Login Page</a>

<p></p>
<p>{error?signiInError:success}</p>


 </form>

        </div>
    );
};

export default ForgetPass;