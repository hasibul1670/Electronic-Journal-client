import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { loginUserContext } from "../../App";
import useAdmin from "../../Hooks/useAdmin";
import useReviewer from "../../Hooks/useReviewer";
import SendEmailToAuthor from "./SendEmailToAuthor";

const ShowFullPaper = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loginUserEmail] = useContext(loginUserContext);

  const [isAdmin] = useAdmin(loginUserEmail);
  const [isReviewer] = useReviewer(loginUserEmail);

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
  const pdfBuffer = data?.file?.data;
 

  useEffect(() => {
    setData(users);
  }, [users]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [editorComment, setEditorComment] = useState("");

  const handleEditorComment = (data) => {
    const editorCommentInDb = {
      editorComment: data.editorComment,
    };
    fetch(`http://localhost:4000/editorComment/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editorCommentInDb),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.lastErrorObject?.updatedExisting === true) {
          Swal.fire({
            icon: "success",
            title: "Editor Comment Submitted Successfully",
            text: "Thanks For Commenting this Article!",
          });

          refetch();
          setEditorComment("");
        } else {
          toast.error("Error Submitting Editor Comment");
          setEditorComment("");
        }
      })
      .catch((error) => {
        console.error("Error submitting Editor comment:", error);
      });
  };

  return (
    <div className="container p-5">
      <div className=" mt-5 p-5 border border-primary text- mb-4">
        <hr />
        <h6 className="text-info font-weight-bold">
          Submitted Article Section {data.name}
        </h6>
        <hr />
        <div className="border border-danger"></div>
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
        <h6 className="text-justify">
          <strong className="text-primary">Abstract:</strong> {data.abstract}
        </h6>
        <p></p>
        <h6>
          <strong className="text-primary">Keyword:</strong> {data.keyword}
        </h6>
        <p></p>
        <h6  className="text-justify">
          <strong className="text-primary">Author Comment:</strong>{" "}
          {data.comment}
        </h6>
        <p></p>
        <hr />
        <h6 className="text-info font-weight-bold">Reviewer Comment Section</h6>
        <hr />
        {data.contentAbtract && (
          <>
            <h6  className="text-justify">
              <strong>Orginality of the Article:</strong> {data.contentAbtract}
            </h6>
            <p></p>
            <h6  className="text-justify">
              <strong>Contribution of Author :</strong> {data.methodOriginality}
            </h6>
            <p></p>
            <h6  className="text-justify">
              <strong> Comments on Experimental Result:</strong>{" "}
              {data.experimentalResultOriginality}
            </h6>
            <p></p>
            <h6  className="text-justify">
              <strong>Reference Originality:</strong>{" "}
              {data.referenceOriginality}
            </h6>
            <p></p>
            <h6  className="text-justify">
              <strong>Ethical Considerations:</strong>{" "}
              {data.ethicalConsiderations}
            </h6>
          </>
        )}

        <div>
          <hr />
          <h6 className="text-info mt-2 font-weight-bold">
            Editor Comment Section
          </h6>
          <hr />
          {/* editor comment show case area */}

          {data.editorComment && (
            <>
              <h6  className="text-justify">
                <strong>Editor Comment:</strong> {data.editorComment}
              </h6>
              <p></p>
            </>
          )}

          {/* editor  comment section */}

          {isAdmin && (
            <div className="border border-primary p-4">
              <label className="font-weight-bold text-info">
                Editor Comment Area
              </label>
              <textarea
                {...register("editorComment", { required: true })}
                className="form-control mt-3 "
                rows="4"
                value={editorComment}
                onChange={(e) => setEditorComment(e.target.value)}
                name="editorComment"
                placeholder=" Editor Comment here...."
              ></textarea>
              {errors.methodOriginality?.type === "required" && (
                <p className="text-danger" role="alert">
                  Editor Comment...
                </p>
              )}
            </div>
          )}
          <div className="d-flex">
            {isAdmin && (
              <button
                className="btn btn-primary mr-2 mt-4"
                onClick={handleSubmit(handleEditorComment)}
              >
                Editor Comment Submit
              </button>
            )}

            <Link to="/dashboard" className="btn ml-2 mt-4 btn-info">
              🔙 Back To Dashboard
            </Link>
            {isAdmin && (
              <Link className=" mt-4">
                <SendEmailToAuthor
                  data={data}
                  submittedData={data?.articleId}
                  setSubmittedData={data?.articleId}
                ></SendEmailToAuthor>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowFullPaper;
