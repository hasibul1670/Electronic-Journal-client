import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ActivateUser = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();
  const handleActivateUser = async (data) => {
    try {
      const result = await axios.post(
        `http://localhost:4000/verify-user/`,
        {
          token,
        }
      );
      if (result.status === 200) {
        setMessage("Email is Verified successfully!");
        toast.success("Email is Verified successfully!");
        Swal.fire({
          icon: "success",
          title: "Email is Verified successfully!",
        });
        navigate("/login");
      }
      if (result.status === 404) {
        setMessage("User Not Found!");
        toast.error("User Not Found!");
      }
    } catch (error) {
      setMessage("An error occurred while verify User !! please try Again.");
    }
  };

  return (
    <div className="mx-auto align-content-center  p-5">
      <h4 className="text-primary">
        <h5 className="text-danger font-wight-bold">
          Please Click the "Confirm" Button to Confirm Your Identity
        </h5>
      </h4>
      <hr />

      <button
        onClick={handleActivateUser}
        type="submit"
        className="btn ml-3 btn-danger rounded-pill"
      >
        Confirm
      </button>

      {message && <p className="font-weight-bold">{message}</p>}
    </div>
  );
};

export default ActivateUser;
