import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const ManuscriptData = ({ data, setData }) => {
  const [isExpanded, setIsExpanded] = useState({
    title: false,
    abstract: false,
    keywords: false,
  });

  const handleToggle = (name) => {
    setIsExpanded((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <>
      <fieldset className=" border border-primary p-5">
        <legend className="float-none border border-warning p-2 text-info w-auto">
          Manuscript Data
        </legend>

        {/* title */}
        <div className="p-4 border border-danger  mb-2 ">
          <div
            onClick={() => handleToggle("title")}
            style={{
              transition: "background-color 1s",
            }}
            className={`d-flex p-1 align-items-center toggle-icon text-white ${
              isExpanded.title ? "bg-info" : "bg-secondary"
            }`}
          >
            <div>
              <FontAwesomeIcon icon={isExpanded.title ? faMinus : faPlus} />
            </div>

            <h5 className="ml-1 toggle-label" htmlFor="title">
              Title (required)
            </h5>
          </div>
          <p></p>
          <div className="toggle-container">
            <textarea
              required
              name="title"
              value={data.title}
              onChange={handleChange}
              className={`form-control custom-textarea ${
                isExpanded.title ? "textarea-animation" : ""
              } `}
              id="exampleFormControlTextarea1"
              rows="3"
              style={{
                display: isExpanded.title ? "block" : "none",
                transition: "height 2s",
              }}
            ></textarea>
          </div>
        </div>

        <div className="p-4 border border-danger mb-2 ">
          <div
            onClick={() => handleToggle("abstract")}
            style={{
              transition: "background-color 0.5s",
            }}
            className={`d-flex p-1 align-items-center toggle-icon text-white ${
              isExpanded.abstract ? "bg-info" : "bg-secondary"
            }`}
          >
            <div className="toggle-button ">
              <FontAwesomeIcon icon={isExpanded.abstract ? faMinus : faPlus} />
            </div>

            <h5 className="ml-1  toggle-label" htmlFor="title">
              Abstract (required)
            </h5>
          </div>
          <p></p>

          <div className="toggle-container">
            <textarea
              required
              name="abstract"
              value={data.abstract}
              onChange={handleChange}
              className="form-control custom-textarea"
              id="exampleFormControlTextarea1"
              rows="3"
              style={{ display: isExpanded.abstract ? "block" : "none" }}
            ></textarea>
          </div>
        </div>

        {/* Keywords */}
        <div className="p-4 border border-danger  ">
          <div
            onClick={() => handleToggle("keywords")}
            style={{
              transition: "background-color 0.5s",
            }}
            className={`d-flex p-1 align-items-center toggle-icon text-white ${
              isExpanded.keywords ? "bg-info" : "bg-secondary"
            }`}
          >
            <div className="toggle-button">
              <FontAwesomeIcon icon={isExpanded.keywords ? faMinus : faPlus} />
            </div>
            <h5 className="ml-1 toggle-label" htmlFor="title">
              Keywords (required)
            </h5>
          </div>

          <br />
          <small className="text-danger">
            Keywords must be separated by semicolons. Each individual keyword
            may be up to 256 characters in length.
          </small>
          <p></p>
          <div className="toggle-container">
            <textarea
              required
              name="keywords"
              value={data.keywords}
              onChange={handleChange}
              className="form-control custom-textarea"
              id="exampleFormControlTextarea1"
              rows="3"
              style={{
                display: isExpanded.keywords ? "block" : "none",
                transition: "background-color 2s",
              }}
            ></textarea>
          </div>
        </div>
      </fieldset>
    </>
  );
};

export default ManuscriptData;
