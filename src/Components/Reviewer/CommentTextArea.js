import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const CommentTextArea = ({ handleRefetch }) => {
  const { id } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handleReviewerComment = async (data) => {
    const reviewerCommentInDb = {
      contentAbtract: data.contentAbtract,
      methodOriginality: data.methodOriginality,
      referenceOriginality: data.referenceOriginality,
      ethicalConsiderations: data.ethicalConsiderations,
      experimentalResultOriginality: data.experimentalResultOriginality,
    };

    try {
      const response = await fetch(
        `http://localhost:4000/reviewerComment/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewerCommentInDb),
        }
      );

      const responseData = await response.json();

      if (
        response.ok &&
        responseData?.lastErrorObject?.updatedExisting === true
      ) {
        reset();
        Swal.fire({
          icon: "success",
          title: "Reviewer Comment Submitted Successfully",
          text: "Thanks For Reviewing this Article!",
        });
        await handleRefetch();
      } else {
        toast.error("Error Submitting Reviewer Comment");
      }
    } catch (error) {
      console.error("Error submitting reviewer comment:", error);
      toast.error("Error Submitting Reviewer Comment"); // Handle the error gracefully.
    }
  };

  // ...

  return (
    <div className="border border-primary p-4">
      <label className="font-weight-bold text-danger">
        Write Your Review Here based on that fields...
      </label>
      <hr />

      <form onSubmit={handleSubmit(handleReviewerComment)}>
        <div className="mb-2">
          <label className="font-weight-bold text-info">
            Article/Paper Asbtract Evaluation:
          </label>
          <textarea
            {...register("contentAbtract", { required: true })}
            className="form-control mt-3 "
            rows="4"
            name="contentAbtract"
            placeholder=".... "
          ></textarea>

          {errors.contentAbtract?.type === "required" && (
            <p className="text-danger" role="alert">
              Article/Paper Abtract is required
            </p>
          )}
        </div>

        <div className="mb-2">
          {" "}
          <label className="font-weight-bold text-info">
            Comment on Methodology:
          </label>
          <textarea
            {...register("methodOriginality", { required: true })}
            className="form-control mt-3 "
            rows="4"
            name="methodOriginality"
            placeholder="..."
          ></textarea>
          {errors.methodOriginality?.type === "required" && (
            <p className="text-danger" role="alert">
              Originality of Methodology
            </p>
          )}
        </div>
        <div className="mb-2">
          {" "}
          <label className="font-weight-bold text-info">
            Originality of that Experimental Result :
          </label>
          <textarea
            {...register("experimentalResultOriginality", { required: true })}
            className="form-control mt-3"
            rows="4"
            name="experimentalResultOriginality"
            placeholder="...."
          ></textarea>
          {errors.experimentalResultOriginality?.type === "required" && (
            <p className="text-danger" role="alert">
              Originality of that Experimental Result is required
            </p>
          )}
        </div>
        <div className="mb-2">
          {" "}
          <label className="font-weight-bold text-info">
            Reference Authenticity :
          </label>
          <textarea
            {...register("referenceOriginality", { required: true })}
            className="form-control mt-3"
            rows="4"
            name="referenceOriginality"
            placeholder="...."
          ></textarea>
          {errors.referenceOriginality?.type === "required" && (
            <p className="text-danger" role="alert">
              Reference Authenticity is required
            </p>
          )}
        </div>
        <div className="mb-1">
          <label className="font-weight-bold text-info">
            Ethical Considerations :
          </label>
          <textarea
            {...register("ethicalConsiderations", { required: true })}
            className="form-control mt-3"
            rows="4"
            name="ethicalConsiderations"
            placeholder="...."
          ></textarea>
          {errors.ethicalConsiderations?.type === "required" && (
            <p className="text-danger" role="alert">
              Ethical Considerations is required
            </p>
          )}
        </div>

        <button className="btn btn-primary mt-3" type="submit">
          Submit Review
        </button>

        <Link to="/dashboard">
          <button className="btn ml-2 mt-3 btn-info">
            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
            Back To Dashboard
          </button>
        </Link>
      </form>
    </div>
  );
};

export default CommentTextArea;
