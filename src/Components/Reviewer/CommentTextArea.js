import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const CommentTextArea = ({ handleRefetch }) => {
  const { id } = useParams();
  const [reviewerComment, setReviewerComment] = useState("");
  const [methodOriginality, setMethodOriginality] = useState("");
  const [experimentalResultOriginality, setExperimentalResultOriginality] =
    useState("");
  const [reference, setReference] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handleReviewerComment = (data) => {
    const reviewerCommentInDb = {
      contentAbtract: data.contentAbtract,
      methodOriginality: data.methodOriginality,
      referenceOriginality: data.referenceOriginality,
      ethicalConsiderations: data.ethicalConsiderations,
      experimentalResultOriginality: data.experimentalResultOriginality,
    };

    fetch(`http://localhost:4000/reviewerComment/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewerCommentInDb),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.lastErrorObject?.updatedExisting === true) {
          Swal.fire({
            icon: "success",
            title: "Reviewer Comment Submitted Successfully",
            text: "Thanks For Reviewing this Article!",
          });
          handleRefetch();
          setReviewerComment("");
          reset();
        } else {
          toast.error("Error Submitting Reviewer Comment");
          setReviewerComment("");
        }
      })
      .catch((error) => {
        console.error("Error submitting reviewer comment:", error);
        // Handle any error scenarios
      });
  };

  return (
    <div className="border border-primary p-4">
        <label className="font-weight-bold text-danger">
          Write Your Review Here based on that fields...
        </label>

      <div className="mb-4">
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

      <button
        className="btn btn-primary mt-3"
        onClick={handleSubmit(handleReviewerComment)}
      >
        Submit Review
      </button>
      <Link to="/dashboard">
        <button className="btn ml-2 mt-3 btn-info">
          <FontAwesomeIcon icon={faArrowAltCircleLeft} />
          Back To Dashboard
        </button>
      </Link>

      <Toaster />
    </div>
  );
};

export default CommentTextArea;
