import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import CommentTextArea from "./CommentTextArea";

const WriteReviewComment = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const {
    data: users = [id],
    isLoading,
    refetch,
  } = useQuery(["users", id], async () => {
    const response = await axios.get(
      `http://localhost:4000/submittedData/${id}`
    );
    return response.data;
  });
  useEffect(() => {
    setData(users);
  }, [users]);
  const handleRefetch = () => {
    refetch();
  };
  return (
    <div className="container p-5">
      <div className=" mt-5 p-5 border border-primary text- mb-4">
        <h6 className="text-danger font-weight-bold">
          Submitted Article Section {data.name}
        </h6>

        {/* Submitted Article Section */}
        <div className="border p-2 border-height border-danger rounded-lg">
          <h6>
            <strong className="text-info"> Article ID:</strong>{" "}
            {data?.articleId}
          </h6>
          <h6>
            <strong className="text-info"> Submission Date :</strong>{" "}
            {data?.submissionDate}
          </h6>
          <h6>
            <strong className="text-info"> Submission Time:</strong>{" "}
            {data?.submissionTime}
          </h6>
          <hr />
          <hr />
          <p></p>
          <h6>
            <strong className="text-primary"> Article Type:</strong>{" "}
            {data.articleType}
          </h6>
          <p></p>
          <h6>
            <strong className="text-primary">Title:</strong> {data.title}
          </h6>
          <p></p>
          <h6>
            <strong className="text-primary">File:</strong>{" "}
            <Link className="text-danger" to={data.url} target="_blank">
              Click to Open
              <FontAwesomeIcon icon={faFileArrowDown} />{" "}
            </Link>
          </h6>
          <p></p>
          <h6>
            <strong className="text-primary">Abstract:</strong> {data.abstract}
          </h6>
          <p></p>
          <h6>
            <strong className="text-primary">Keyword:</strong> {data.keyword}
          </h6>
          <p></p>
          <h6>
            <strong className="text-primary">Author Comment:</strong>{" "}
            {data.comment}
          </h6>
        </div>

        <h6 className="text-info  font-weight-bold mt-4">
          Reviewer Comment Section
        </h6>

        {/* Reviewer Comment Section */}

        <div className="border p-2 border-height border-success rounded-lg">
          {data.contentAbtract ? (
            <>
              <h6>
                <strong className="text-info">Content Abtract:</strong>{" "}
                {data.contentAbtract}
              </h6>
      
              <h6 >
                <strong className="text-info">Method Originality:</strong>{" "}
                {data.methodOriginality}
              </h6>
          
              <h6>
                <strong className="text-info">
                  Experimental Result Originality:
                </strong>{" "}
                {data.experimentalResultOriginality}
              </h6>
           
              <h6>
                <strong className="text-info">Reference Originality:</strong>{" "}
                {data.referenceOriginality}
              </h6>
          
              <h6>
                <strong className="text-info">Ethical Considerations:</strong>{" "}
                {data.ethicalConsiderations}
              </h6>
            </>
          ) : (
            <div>
              <h6 className="text-danger  font-weight-bold">
                {" "}
                The review for this has not been conducted yet.
              </h6>
            </div>
          )}
        </div>
      </div>

      <div>
        <CommentTextArea handleRefetch={handleRefetch} />
      </div>
    </div>
  );
};

export default WriteReviewComment;
