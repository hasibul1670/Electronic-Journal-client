import React from "react";
import { useForm } from "react-hook-form";

const AddReviewer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container font-weight-bold bg-gray p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* First Name */}
        <div className="form-group row">
          <label className="col-md-2" htmlFor="firstName">
            First Name:
          </label>
          <input
            type="text"
            className={`form-control col-md-9 ${
              errors.firstName ? "is-invalid" : ""
            }`}
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <div className="invalid-feedback">First name is required.</div>
          )}
        </div>
        {/* Last Name */}
        <div className="form-group row">
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
        </div>
        {/*Email */}
        <div className="form-group row">
          <label className="col-md-2 " htmlFor="email">
            Email Address :
          </label>
          <input
            type="text"
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
            aria-invalid={errors.mail ? "true" : "false"}
          />
          {errors.mail && (
            <div className="invalid-feedback">{errors.mail.message}</div>
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

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReviewer;
