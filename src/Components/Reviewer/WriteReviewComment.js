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
      `https://electronic-journal-server-hasibul1670.vercel.app/submittedData/${id}`
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
    <div className="container">
      <div className=" mt-5 p-5 border border-primary text- mb-4">
        <hr />
        <h4 className="text-info font-weight-bold">
          Submitted Article Section {data.name}
        </h4>
        <hr />
        <h4>
          <strong> Article ID:</strong> {data._id}
        </h4>
        <p></p>
        <h4>
          <strong> Article Type:</strong> {data.articleType}
        </h4>
        <p></p>
        <h4>
          <strong>Title:</strong> {data.title}
        </h4>
        <p></p>
        <h4>
          <strong>File:</strong>{" "}
          <Link className="text-danger" to={data.url} target="_blank">
            Click to Open
            <FontAwesomeIcon icon={faFileArrowDown} />{" "}
          </Link>
        </h4>
        <p></p>
        <h4>
          <strong>Abstract:</strong> {data.abstract}
        </h4>
        <p></p>
        <h4>
          <strong>Keyword:</strong> {data.keyword}
        </h4>
        <p></p>
        <h4>
          <strong>Author Comment:</strong> {data.comment}
        </h4>
        <p></p>
        <hr />
        <h4 className="text-info font-weight-bold">Reviewer Comment Section</h4>
        <hr />
        {data.contentAbtract && (
          <>
            <h4>
              <strong>Content Abtract:</strong> {data.contentAbtract}
            </h4>
            <p></p>
            <h4>
              <strong>Method Originality:</strong> {data.methodOriginality}
            </h4>
            <p></p>
            <h4>
              <strong>Experimental Result Originality:</strong>{" "}
              {data.experimentalResultOriginality}
            </h4>
            <p></p>
            <h4>
              <strong>Reference Originality:</strong>{" "}
              {data.referenceOriginality}
            </h4>
            <p></p>
            <h4>
              <strong>Ethical Considerations:</strong>{" "}
              {data.ethicalConsiderations}
            </h4>
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
