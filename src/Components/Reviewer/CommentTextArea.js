import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const CommentTextArea = ({handleRefetch}) => {
  const { id } = useParams();
  const [reviewerComment, setReviewerComment] = useState("");

  const handleReviewerComment = () => {
    fetch(`http://localhost:4000/reviewerComment/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviewerComment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.lastErrorObject?.updatedExisting === true) {
          Swal.fire({
            icon: "success",
            title: "Reviewer Comment Submitted Successfully",
            text: "Thanks For Reviewing this Article!"        
          });
          handleRefetch();
          setReviewerComment("");
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

  const handleCommentChange = (event) => {
    setReviewerComment(event.target.value);
  };

  return (
    <div className="border border-primary p-4">
      <h5 className="text-dark ul">
        <strong>Reviewer Comment Area:</strong>
      </h5>
      <textarea
        className="form-control mt-3 notion-textarea"
        rows="4"
        name="reviewerComment"
        placeholder="Write your comment..."
        value={reviewerComment}
        onChange={handleCommentChange}
      ></textarea>
      <button
        disabled={!reviewerComment}
        className="btn btn-primary mt-3"
        onClick={handleReviewerComment}
      >
        Submit
      </button>

      <Toaster />
    </div>
  );
};

export default CommentTextArea;
