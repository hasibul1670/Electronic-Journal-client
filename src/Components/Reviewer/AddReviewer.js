import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";

const AddReviewer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const authorInfoInDb = {
      reviewerName: data.displayName,
      email: data.email,
      password: data.password,
      reviewerPosition: data.position,
      institutionName: data.institutionName,
      department: data.department,
    };

    fetch(
      "https://electronic-journal-server-hasibul1670.vercel.app/addReviewer",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(authorInfoInDb),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        toast.success("Reviewer added successfully");
        console.log("Hello", data);
      });
  };

  return (
    <div className="container font-weight-bold bg-gray p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* button  */}

        <button type="submit" className="btn " title="Save">
          <FontAwesomeIcon icon={faFloppyDisk} size="3x" />
          <span className="tooltip">Save</span>
        </button>

        <p></p>
        {/* First Name */}
        <div className="form-group row">
          <label className="col-md-2" htmlFor="displayName">
            Full Name:
          </label>
          <input
            type="text"
            className={`form-control col-md-9 ${
              errors.displayName ? "is-invalid" : ""
            }`}
            {...register("displayName", { required: true })}
          />
          {errors.displayName && (
            <div className="invalid-feedback">First name is required.</div>
          )}
        </div>
        {/* Last Name */}
        {/* <div className="form-group row">
          <label className="col-md-2 " htmlFor="lastName">
            Last Name:
          </label>
          <input
            type="text"
            className={`form-control col-md-9 ${
              errors.lastName ? "is-invalid" : ""
            }`}
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <div className="invalid-feedback">Last name is required.</div>
          )}
        </div> */}
        {/*Email */}
        <div className="form-group row">
          <label className="col-md-2 " htmlFor="email">
            Email Address :
          </label>
          <input
            type="email"
            className={`form-control col-md-9 ${
              errors.email ? "is-invalid" : ""
            }`}
            {...register("email", {
              required: "Email Address is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>

        {/*Password */}
        <div className="form-group row">
          <label className="col-md-2 " htmlFor="email">
            Password :
          </label>
          <input
            type="password"
            className={`form-control col-md-9 ${
              errors.password ? "is-invalid" : ""
            }`}
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^.{6,}$/,
                message:
                  "Invalid password. It should be at least 6 characters long.",
              },
            })}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>

        {/* Institution Name */}
        <div className="form-group row">
          <label className="col-md-2 " htmlFor="lastName">
            Institution Name:
          </label>
          <input
            type="text"
            className={`form-control col-md-9  ${
              errors.institutionName ? "is-invalid" : ""
            }`}
            {...register("institutionName", { required: true })}
          />
          {errors.institutionName && (
            <div className="invalid-feedback">
              Institution Name is required.
            </div>
          )}
        </div>

        {/* Position */}
        <div className="form-group row">
          <label className="col-md-2 " htmlFor="lastName">
            Position:
          </label>
          <input
            type="text"
            className={`form-control col-md-9  ${
              errors.position ? "is-invalid" : ""
            }`}
            {...register("position", { required: true })}
          />
          {errors.position && (
            <div className="invalid-feedback">Position is required.</div>
          )}
        </div>

        {/* Department */}
        <div className="form-group row">
          <label className="col-md-2 " htmlFor="lastName">
            Department:
          </label>
          <input
            type="text"
            className={`form-control col-md-9  ${
              errors.department ? "is-invalid" : ""
            }`}
            {...register("department", { required: true })}
          />
          {errors.department && (
            <div className="invalid-feedback">Department is required.</div>
          )}
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default AddReviewer;
