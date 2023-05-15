import React, { useState } from "react";

function Test() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    degree: "",
    position: "",
    institution: "",
    department: "",
    email: "",
    reason: "",
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if any of the form fields are empty
    const isFormEmpty = Object.values(formData).some(value => value === "");
  
    if (!isFormEmpty) {
      if (editIndex === -1) {
        // Add new data
        setSubmittedData([...submittedData, formData]);
      } else {
        // Edit existing data
        const updatedSubmittedData = [...submittedData];
        updatedSubmittedData[editIndex] = formData;
        setSubmittedData(updatedSubmittedData);
        setEditIndex(-1);
      }
    }
    setFormData({
      firstName: "",
      lastName: "",
      degree: "",
      position: "",
      institution: "",
      department: "",
      email: "",
      reason: "",
    });

  
  };
  

  const handleEdit = (index) => {
    const selectedReviewer = submittedData[index];
    setFormData(selectedReviewer);
    setEditIndex(index);
    openModal(); // Call the function to open the modal
  };

  const handleDelete = (index) => {
    const updatedSubmittedData = [...submittedData];
    updatedSubmittedData.splice(index, 1);
    setSubmittedData(updatedSubmittedData);
  };

  const openModal = () => {
    const modal = document.getElementById("exampleModal");
    if (modal) {
      const bootstrapModal = new window.bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  };
  return (
    <div className="container mt-5">
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
        data-whatever="@mdo"
      >
        Add Suggested Reviewer
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header bg-info ">
              <h5 class="modal-title text-white font-weight-bold " id="exampleModalLabel">
                Add New Reviewer
              </h5>
            </div>

            <div class="modal-body font-weight-bold text-info p-3">
              <form>
                <div className="form-group row row">
                  <label className=" col-form-label col-sm-3 col-sm-3">
                    First Name:
                  </label>
                  <input
                    type="text" 
                     required
                    className="form-control col-form-label col-sm-3 col-sm-8"
                    id="recipient-name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group row">
                  <label htmlFor="recipient-name" className="col-form-label col-sm-3">
                    Last Name:
                  </label>
                  <input
                    type="text"  required
                    className="form-control col-form-label col-sm-3 col-sm-8"
                    id="recipient-name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group row">
                  <label htmlFor="recipient-name" className="col-form-label col-sm-3">
                    Degree:
                  </label>
                  <input
                    type="text"  required
                    className="form-control col-form-label col-sm-3 col-sm-8"
                    id="recipient-name"
                    name="degree"
                    value={formData.degree}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group row">
                  <label htmlFor="recipient-name" className="col-form-label col-sm-3">
                    Position:
                  </label>
                  <input
                    type="text"  required
                    className="form-control col-form-label col-sm-3 col-sm-8"
                    id="recipient-name"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group row">
                  <label htmlFor="recipient-name" className="col-form-label col-sm-3">
                    Institution:
                  </label>
                  <input
                    type="text"  required
                    className="form-control col-form-label col-sm-3 col-sm-8"
                    id="recipient-name"
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group row">
                  <label htmlFor="recipient-name" className="col-form-label col-sm-3">
                    Department:
                  </label>
                  <input
                    type="text"  
                    className="form-control col-form-label col-sm-3 col-sm-8"
                    id="recipient-name"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group row">
                  <label htmlFor="recipient-name" className="col-form-label col-sm-3">
                    Email:
                  </label>
                  <input
                    type="email"
                    required
                    className="form-control col-form-label col-sm-3 col-sm-8"
                    id="recipient-name"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group row">
                  <label htmlFor="message-text" className="col-form-label col-sm-3">
                    Reason:
                  </label>
                  <textarea
                    className="form-control col-form-label col-sm-3 col-sm-8"
                    id="message-text"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div class="modal-footer">
              <button
                type="submit"
                class="btn btn-primary"
                onClick={handleSubmit}
                data-dismiss="modal"
                disabled={Object.values(formData).some(value => value === "")}
              >
                Save
              </button>
            </div>
              </form>
            </div>

           

          </div>
        </div>
      </div>

      <p></p>

      {submittedData.length > 0 && (
        <>
          <table class="table table-sm">
            <thead>
              <tr class="table-info">
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Institution</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
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
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger ml-2"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Test;
