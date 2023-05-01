import React from "react";
import { useContext } from "react";
import { reviewerContext } from "../../App";
import { useState } from "react";

const Test1 = (props) => {
  const closeModal = props.closeModal;
  const setSelectedReviewer = props.setSelectedReviewer;
  const selectedReviewer = props.selectedReviewer;
  const styles = {
    backgroundColor: "lightgray",
  };
  const [reviewer] = useContext(reviewerContext);

  const handleReviewer = (name, email) => {
    setSelectedReviewer([...selectedReviewer, { name, email }]);
    console.log('Hello',selectedReviewer);
    //length ===  2
  };
  return (
    <div className="d-flex">
      <div className="w-50 border  border-primary p-3 ">
        <ul className="list-group p-3 ">
          {reviewer.map((service) => (
            <li
              style={styles}
              className="list-group-item border font-weight-bold"
              key={service._id}
            >
              <h5 className="font-weight-bold">{service.name}</h5>
              <h6 className="font-weight-bold"> {service.email}</h6>

              {selectedReviewer.length != 3 && (
                <button
                  className="btn btn-primary"
                  onClick={() => handleReviewer(service.name, service.email)}
                >
                  Add As Reviewer
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <br />
      <div className="border  border-primary p-5 ">
        <u>
          <h5 className="text-secondary font-weight-bold">
            Your Selected Reviewers:
          </h5>{" "}
        </u>

        {selectedReviewer.map((item, index) => (
          <div key={index}>
            <h5 className="border p-2 font-weight-bold text-primary">
              {index + 1}. {item.name} <br /> {item.email}
            </h5>
          </div>
        ))}
        {selectedReviewer.length === 3 && (
          <button onClick={() => closeModal()} className="btn btn-primary">
            close
          </button>
        )}
      </div>
    </div>
  );
};

export default Test1;
