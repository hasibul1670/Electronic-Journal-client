import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ResetPassword = ({ resetToken }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const { token } = useParams();
  const onSubmit = async (data) => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setMessage("Passwords do not match.");
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setMessage("Password must be at least 6 characters");
    } else {
      try {
        const result = await axios.patch(
          `http://localhost:4000/reset-password/`,
          {
            password,
            token,
          }
        );
      
        if (result.status === 200) {
          setMessage("Password has been successfully set!");
          toast.success("Password has been successfully set!");
          Swal.fire({
            icon: "success",
            title: "Password has been successfully set!",
          });
          navigate("/login");
        }
        if (result.status === 404) {
          setMessage("User Not Found!");
          toast.error("User Not Found!");
        }
      } catch (error) {
        setMessage("An error occurred while setting the password.");
      }
    }
  };

  return (
    <div className="mx-auto align-content-center  p-5">
      <h4 className="text-primary">
        <h2>Set Password</h2>
      </h4>
      <hr />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-primary p-5"
      >
        <div className="col-md-6 mb-3">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            className="form-control mx-sm-3 "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control mx-sm-3 "
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          onSubmit={handleSubmit(onSubmit)}
          type="submit"
          className="btn ml-3 btn-primary rounded-pill"
        >
          Set Password
        </button>
      </form>
      {message && <p className="font-weight-bold">{message}</p>}
    </div>
  );
};

export default ResetPassword;
