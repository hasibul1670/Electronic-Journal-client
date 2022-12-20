import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, verifyBeforeUpdateEmail} from "firebase/auth";
import app from '../LoginInfo/firebase.config';
import {useLocation,useNavigate } from 'react-router-dom';
import useFireBase from '../../hooks/useFireBase';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useUpdateProfile } from 'react-firebase-hooks/auth';
import useToken from '../../hooks/useToken';
import { useForm } from "react-hook-form";


const auth = getAuth(app )
const NewUser = () => {

  const { register, formState: { errors }, handleSubmit } = useForm();
 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [user, setUser] = useState('');
  const [errorno, setError] = useState('');
const [success, setSuccess] = useState('');
const [displayName, setDisplayName] = useState('');

const [updateProfile, updating,updateError] = useUpdateProfile(auth);

  const verifyEmail=()=>{


   sendEmailVerification(auth.currentUser)
  .then(() => {

    console.log("Email verification sent!");
    // Email verification sent!
    // ...
  });
  }

  const navigate = useNavigate()
  const location = useLocation();

const [
  createUserWithEmailAndPassword,
  user,
  loading,
  error,
] = useCreateUserWithEmailAndPassword(auth);

let signiInError;

if(loading || updating){
  return <div className="spinner-border m-5" role="status">
  <span className="visually-hidden"></span>
</div>
}
if(error||updateError){
  signiInError=<p className='text-danger'>{error?.message}||{updateError.message}</p>
}

const onSubmit =async (data) =>{
    
  await createUserWithEmailAndPassword(data.email,data.password);
  await updateProfile({displayName:data.firstName});
  console.log('update done');
  navigate('/login');


} 


const handleFormSubmit= async(e) =>{
  e.preventDefault();
const name = e.target.name.value;
const email = e.target.email.value;
const password = e.target.password.value;


 await createUserWithEmailAndPassword(email,password);


      console.log("profile update",  user,
      loading,
      error
      );
      setSuccess("Please Check Your Email(inbox/Spam) For Verification")
      setEmail('')
      setPassword('')
      verifyEmail();

  
}

    return (
        <div   className='mt-2 p-4 bg-login w-75 mx-auto justify-content-center'>



<form onSubmit={handleSubmit(onSubmit)} >
{/* personal InfoForm Start */}
  <fieldset  className=' border border-primary p-5' >
<legend className="float-none border border-warning p-2 text-success w-auto">Personal Information</legend>

<div className="form-row">
  {/* Name Section */}
<div className="col-md-4 mb-3">
      <label for="validationCustom01">First Name :</label>
      <input      {...register("firstName", { required: true })} 
        aria-invalid={errors.firstName ? "true" : "false"} 
     name="firstName" type="text" className="form-control mx-sm-3" id="validationCustom01" placeholder="First name"
     />
     {errors.firstName?.type === 'required' && <p className='text-danger' role="alert">First name is required</p>}
    </div>

    <div className="col-md-4 mb-3">
      <label for="validationCustom01">Last Name :</label>
      <input 
      {...register("lastName", { required: true })} 
      type="text" className="form-control mx-sm-3" id="validationCustom01" placeholder="Last Name" required/>

    </div>
{/* Email Section */}

    <div className="col-md-4 mb-3">
    <label className='ml-2' for="exampleInputEmail1">Email Address : </label>
    <input
    type="email"  className="form-control mx-sm-3"
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
{/* 
       {errors.email?.type === 'required' && <p className='text-danger' >{errors.email?.message}</p>}
       {errors.email?.type === 'pattern' && <p className='text-danger' >{errors.email?.message}</p>} */}
 
  </div>

{/* Password */}

<div className="col-md-4 mb-3">
    <label className='ml-2'>Password: </label>
    <input
    type="password"  className="form-control mx-sm-3" placeholder="Enter Your Password"
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
<p className='text-danger' >{errors.password?.message}</p>

     
  </div>
{/* phoneNumber Section */}

    <div className="col-md-4 ml-4 mb-3">
      <label for="validationServer02">Primary Phone Number</label>
      <input
        type="text" className="form-control"
     placeholder="Phone Number"  
     
     {...register("phone", {
      required:
      {
        value: true,
        message: 'Phone Number is Required'
      },
      minLength: {
        value:11,
        message: 'Must be 11 Numbers'
      }

    })} 
/>
<p className='text-danger' >{errors.phone?.message}</p>

    </div>
 

 
    <div className="col-md-4 mb-3">
      <label for="validationServer03">City</label>
      <input 
      {...register("city", { required: true })} type="text" className="form-control " id="validationServer03" placeholder="City" required/>
    </div>


    <div className="col-md-3 mb-3">
      <label for="validationServer05">Zip or Postal Code</label>
      <input 
      {...register("postalCode", { required: true })} 
      type="number" className="form-control " id="validationServer05" placeholder="Zip"/>
   
    </div>
    
    </div>

  </fieldset>




{/* personal infoForm end */}


{/*Institution Related Information Start */}


 

<fieldset  className=' border border-primary mt-4 p-5' >
<legend className="float-none border border-secondary p-2 text-primary w-auto">Institution Related Information</legend>

<div className="form-row">

<div className="col-md-4 mb-3">
      <label for="validationServerUsername">Position</label>
      <div className="input-group">
        <input 
        {...register("position", { required: true })} 
        type="text" className="form-control " id="validationServerUsername" placeholder="Position" aria-describedby="inputGroupPrepend3"/>
      
      </div>
    </div>

    <div className="col-md-4 mb-3">
      <label for="validationServer01">Institution Name </label>
      <input
      {...register("institutionName ", { required: true })} 
      type="text" className="form-control" id="validationServer01" placeholder="Institution "  required/>
     
    </div>

    <div className="col-md-4 mb-3">
      <label for="validationServer02">Department</label>
      <input
         {...register("department", { required: true })} 
      type="text" className="form-control " id="validationServer02" placeholder="Department"/>
    
    </div>
 
  </div>


  <div className="form-row">
    <div className="col-md-6 mb-3">
      <label for="validationServer03">Areas of   or Expertise : </label>
      <select
        {...register("field", { required: true })} 
      className="form-select  mx-sm-3" aria-label="Default select example">
  <option value="Algorithm">Algorithm</option>
  <option value="Image Processing">Image Processing</option>
  <option value="IOT">IOT</option>
  <option value="Web Engineering">Web Engineering</option>
  <option value="Data Processing">Data Processing</option>

  </select>
    </div>

   
  </div>

  </fieldset>




{/* personal infoForm end */}


  <div className="form-group">
    <div className="form-check">
      <input className="form-check-input " type="checkbox" value="false" id="invalidCheck3" required/>
      <label className="form-check-label" for="invalidCheck3">
        Agree to terms and conditions
      </label>
   
    </div>
  </div>
  <h5 className='text-danger'>{errorno}</h5>
  <h5 className='text-success'>{success}</h5>

  <button type="submit" className="btn btn-primary">Register</button>


</form>
{signiInError}
        </div>
    );
};

export default NewUser;


