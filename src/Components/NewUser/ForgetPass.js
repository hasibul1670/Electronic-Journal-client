/* eslint-disable no-const-assign */
import axios from "axios";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import app from "../LoginInfo/firebase.config";
const auth = getAuth(app);

const ForgetPass = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await axios.post("http://localhost:4000/forget-password", {
        email: data.email,
      });
      if (result.data.status === 200) {
        Swal.fire({
          icon: "success",
          title: result?.data.message,
        });
        navigate("/login");
      }
      if (result.data.status === 404) {
        Swal.fire({
          icon: "error",
          title: result?.data.message,
        });
        setError(result?.data.message)
      }

    } catch (error) {
      setError = (
        <p className="font-weight-bold text-danger">
          {error?.response?.data?.message || "An error occurred."}
        </p>
      );
      setSuccess(null);
    }
  };

  return (
    <div className="mx-auto align-content-center  p-5">
      <h4 className="text-primary">
        To Reset your password please, Provide your registered email{" "}
      </h4>
      <hr />

      <form
        className="border border-primary p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Email Section */}
        <div className="col-md-6 mb-3">
          <label className="ml-2" htmlFor="exampleInputEmail1">
            Enter Your Email Address :{" "}
          </label>
          <input
            type="email"
            className="form-control mx-sm-3 "
            {...register("email", {
              required: {
                value: true,
                message: "Email is Required",
              },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Provide a valid Email",
              },
            })}
            aria-invalid={errors.email ? "true" : "false"}
            placeholder="Enter Your Email"
          />
          <p className="text-danger">{errors.email?.message}</p>
        </div>
        <button
          onSubmit={handleSubmit(onSubmit)}
          type="submit"
          className="btn ml-3 btn-primary rounded-pill"
        >
          Reset Your Password
        </button>

        <a
          className="btn ml-3 btn-secondary rounded-pill"
          href="/login"
          role="button"
        >
          Go to Login Page
        </a >
        <div className="text-danger mt-2 font-bold">
          {success && <div>{success}</div>}

          {error && <div>{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default ForgetPass;
