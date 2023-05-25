import axios from "axios";
import React, { useState } from "react";

const PreviewAll = ({
  selectedOption,
  data,
  file,
  comment,
  setFile,
  submittedData,
  setSubmittedData,
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
    <div className="container border  border-info p-4 mt-4">
      <h4 className="text-info mb-3 font-weight-bold">
        
        Preview your uploaded data before Submission
        <hr/>
      </h4>
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

          <div className="form-group">
            <label className="text-danger font-weight-bold" for="abstract">
              Abstract
            </label>
            <textarea
              className="form-control"
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
          <h5 className="mb-3 p-2 font-weight-bold">
            Title: {data?.title}
          </h5>
          <h5 className="mb-3 p-2 font-weight-bold">
            Abstract: {data?.abstract}
          </h5>
          <h5 className="mb-3 p-2 font-weight-bold">
            Keywords: {data?.keywords}
          </h5>
        </>
      )}

      {isEditing ? (
        <>
          <label className="text-danger font-weight-bold mr-2" for="abstract">
            File :{" "}
          </label>
          <input type="file" onChange={handleFileChange} />
        </>
      ) : (
        <h5 className="mb-3 p-2 font-weight-bold">
          Attached File: {file?.name}
        </h5>
      )}
      <p></p>

      {isEditing ? (
        <>
          <label className="text-danger font-weight-bold" for="abstract">
            Comment :{" "}
          </label>{" "}
          <br />
          <textarea
            name="comment"
            rows={5} // Adjust the number of rows as needed
            cols={100} // Adjust the number of columns as needed
            value={comment?.comment}
            onChange={handleCommentChange}
          ></textarea>
        </>
      ) : (
        <h5 className="mb-3 p-2 font-weight-bold">
          Comment: {comment?.comment}
        </h5>
      )}
      <br />
      {isEditing ? (
        <div className="mb-3 ">
          <h3>Your Suggested Reviewers List</h3>
          <table className="table table-sm">
            <thead>
              <tr className="table-info">
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Institution</th>
                <th scope="col">Email</th>
              </tr>
            </thead>

            <tbody>
              {submittedData.map((data, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {data.firstName} {data.lastName}
                  </td>
                  <td>
                    {data.position}, at {data.institution}
                  </td>
                  <td>{data.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mb-3 ">
          <h5>Your Suggested Reviewers List</h5>
          <table className="table table-sm">
            <thead>
              <tr className="table-info">
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Institution</th>
                <th scope="col">Email</th>
              </tr>
            </thead>

            <tbody>
              {submittedData.map((data, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {data.firstName} {data.lastName}
                  </td>
                  <td>
                    {data.position}, at {data.institution}
                  </td>
                  <td>{data.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
