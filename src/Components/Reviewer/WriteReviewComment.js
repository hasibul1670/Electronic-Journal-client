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
    console.log("Hello refetching");
    refetch();
  };
  return (
    <div className="container">
      <div className=" mt-5 p-5 border border-primary text- mb-4">
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
        {data.reviewerComment && 
         <h4>
         <strong>Reviewer Comment:</strong> {data.reviewerComment}
       </h4>
        }
       

      </div>

      <div>
        <CommentTextArea handleRefetch={handleRefetch} />
      </div>
    </div>
  );
};

export default WriteReviewComment;
