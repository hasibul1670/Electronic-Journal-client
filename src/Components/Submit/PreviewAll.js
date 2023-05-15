import axios from "axios";
import React, { useState } from "react";

const PreviewAll = ({
  selectedOption,
  data,
  file,
  comment,
  setFile,
  url,
  setUrl,
  setComment,
  setData,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const [message, setMessage] = useState("");
  const [fileUpload, setFileUpload] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileUpload(event.target.files[0]);
    uploadFile(event.target.files[0]);
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post("http://localhost:4000/file", formData);
      setMessage(
        "File uploaded successfully. Click Next Button For the next steps."
      );
      const fileUrl = response.data;
      setUrl(fileUrl);
      console.log("Hello", url);
    } catch (error) {
      console.error(error);
      setMessage("Error uploading file");
    }
    setFileUpload(null);
  };

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setComment((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="container-fluid mt-4">
      <h3 className="text-primary" style={{ textDecoration: "underline" }}>
        Preview your uploaded data before Submission
      </h3>
      {isEditing ? (
        <>
          <div className="form-group">
            <label className="text-danger font-weight-bold">Title:</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={data?.title}
              onChange={handleDataChange}
            />
          </div>

          <div class="form-group">
            <label className="text-danger font-weight-bold" for="abstract">Abstract</label>
            <textarea
              class="form-control"
              id="abstract"
              name="abstract"
              value={data?.abstract}
              onChange={handleDataChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label className="text-danger font-weight-bold">Keywords:</label>
            <input
              type="text"
              className="form-control"
              name="keywords"
              value={data?.keywords}
              onChange={handleDataChange}
            />
          </div>
        </>
      ) : (
        <>
          <h6 className="mb-3 border border-primary p-2">
            Title: {data?.title}
          </h6>
          <h6 className="mb-3 border border-primary p-2">
            Abstract: {data?.abstract}
          </h6>
          <h6 className="mb-3 border border-primary p-2">
            Keywords: {data?.keywords}
          </h6>
        </>
      )}

      {isEditing ? (
        <>
          <label className="text-danger font-weight-bold mr-2" for="abstract">File : </label>
          <input type="file" onChange={handleFileChange} />
        </>
       
      ) : (
        <h6 className="mb-3 border border-primary p-2">
          Attached File: {file?.name}
        </h6>
      )}
      <p></p>

      {isEditing ? (
        <>
          <label className="text-danger font-weight-bold" for="abstract">Comment : </label> <br />
        <textarea
          name="comment"
          rows={5} // Adjust the number of rows as needed
          cols={100} // Adjust the number of columns as needed
          value={comment?.comment}
          onChange={handleCommentChange}
        ></textarea>
        </>
      
      ) : (
        <h6 className="mb-3 border border-primary p-2">
          Comment: {comment?.comment}
        </h6>
      )}
      <br />
      {isEditing ? (
        <button className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
      ) : (
        <button className="btn btn-primary" onClick={handleEdit}>
          Edit
        </button>
      )}
    </div>
  );
};

export default PreviewAll;
