import React from "react";

import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {

        reset();
        Swal.fire({
          icon: "success",
          title: "Your Message is Send Successfully",
          text: "Thanks For your Message !",
        });
     
  
  };



  return (
    <div className="container p-4 container-fluid ">
      <h2 className="text-primary"></h2>

      <form onSubmit={handleSubmit(onSubmit)}>

  <div className="form-group">
    <label htmlFor="name">Enter Your Name:</label>
    <input
      className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
      {...register("name", { required: true })}
    />
    {errors.firstName && (
      <div className="invalid-feedback">Name is required.</div>
    )}
  </div>

  <div className="form-group">
    <label htmlFor="email">Enter Your Email:</label>
    <input 
      className={`form-control ${errors.email ? "is-invalid" : ""}`}
      {...register("email", { 
        required: true,
        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    
    })}
    />
    {errors.email && (
      <div className="invalid-feedback">Email is required.</div>
    )}
  </div>

  <div className="form-group">
    <label htmlFor="subject">Subject:</label>
    <input
      className={`form-control ${errors.subject ? "is-invalid" : ""}`}
      {...register("subject", { required: true })}
    />
    {errors.subject && (
      <div className="invalid-feedback">Subject is required.</div>
    )}
  </div>

  <div className="form-group">
    <label htmlFor="message">Message:</label>
    <textarea
      className={`form-control ${errors.message ? "is-invalid" : ""}`}
      {...register("message", { required: true })}
    />
    {errors.message && (
      <div className="invalid-feedback">Message is required.</div>
    )}
  </div>

  <button type="submit" className="btn btn-primary">
    Submit
  </button>
</form>

    </div>
  );
};

export default ContactUs
