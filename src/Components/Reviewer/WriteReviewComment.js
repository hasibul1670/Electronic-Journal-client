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
      <hr />
        <h6 className="text-info font-weight-bold">
          Submitted Article Section {data.name}
        </h6>
        <hr />
        <h6>
          <strong className="text-info"> Article ID:</strong> {data?.articleId}
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
        <p></p>
        <hr />
        <h6 className="text-info font-weight-bold">Reviewer Comment Section</h6>
        <hr />
        {data.contentAbtract && (
          <>
            <h6>
              <strong>Content Abtract:</strong> {data.contentAbtract}
            </h6>
            <p></p>
            <h6>
              <strong>Method Originality:</strong> {data.methodOriginality}
            </h6>
            <p></p>
            <h6>
              <strong>Experimental Result Originality:</strong>{" "}
              {data.experimentalResultOriginality}
            </h6>
            <p></p>
            <h6>
              <strong>Reference Originality:</strong>{" "}
              {data.referenceOriginality}
            </h6>
            <p></p>
            <h6>
              <strong>Ethical Considerations:</strong>{" "}
              {data.ethicalConsiderations}
            </h6>
          </>
        )}
      </div>

      <div>
        <CommentTextArea handleRefetch={handleRefetch} />
      </div>
    </div>
  );
};

export default WriteReviewComment;
