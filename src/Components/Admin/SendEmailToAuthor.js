import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const SendEmailToAuthor = ({ emailAdress }) => {
  const [formData, setFormData] = useState({
    email: emailAdress,
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // Make an HTTP POST request to the backend API endpoint
    axios
      .post("http://localhost:4000/send-email", formData)
      .then((response) => {
        console.log(response.data); // Log the response from the backend
        Swal.fire({
          icon: "success",
          title: `Email is Sent to ${emailAdress}`,
          //text: "Thank you for submitting your Paper",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const openModal = () => {
    const modal = document.getElementById("exampleModal");
    if (modal) {
      const bootstrapModal = new window.bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  };
  return (
    <div className="container">
      <button
        type="button"
        className="btn btn-success"
        data-toggle="modal"
        data-target="#exampleModal"
        data-whatever="@mdo"
        onClick={openModal}
      >
        Send a Feedback to Author ✉️
      </button>

      <div
        className="modal fade bd-example-modal-lg"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header bg-info ">
              <h5
                className="modal-title text-white font-weight-bold"
                id="exampleModalLabel"
              >
                Send an Email to Author
              </h5>
            </div>

            <div className="modal-body font-weight-bold p-3" >
              <form>
                <div className="form-group row row">
                  <label className=" col-form-label col-sm-3 col-sm-3">
                    Email:
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control col-form-label col-sm-3 col-sm-8"
                    id="recipient-name"
                    name="email"
                    value={emailAdress}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="recipient-name"
                    className="col-form-label col-sm-3"
                  >
                    Subject:
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control col-form-label col-sm-3 col-sm-8"
                    id="recipient-name"
                    name="subject"
                    initialvalue={formData.subject}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="message-text"
                    className="col-form-label col-sm-3"
                  >
                    Message:
                  </label>
                  <textarea
                    className="form-control col-form-label col-sm-3 col-sm-8"
                    id="message-text"
                    name="message"
                    initialvalue={formData.message}
                    onChange={handleInputChange}
                    style={{ height: "200px", width: "400px" }}
                  ></textarea>
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    data-dismiss="modal"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendEmailToAuthor;
