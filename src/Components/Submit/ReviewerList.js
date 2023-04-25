import React from "react";
import { useContext } from "react";
import { reviewerContext } from "../../App";
import { useState } from "react";

const ReviewerList = (props) => {
  const closeModal = props.closeModal;
  const setSelectedReviewer = props.setSelectedReviewer;
  const selectedReviewer = props.selectedReviewer;
  const styles = {
    backgroundColor: "lightgray",
  };
  const [reviewer] = useContext(reviewerContext);
  const [disabledButtons, setDisabledButtons] = useState({});

  const handleReviewer = (name, email, id) => {
    setSelectedReviewer([...selectedReviewer, { name, email }]);
    setDisabledButtons((prevState) => ({
      ...prevState,
      [id]: true, // set the value for the clicked button's id to true
    }));

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
                  onClick={() =>
                    handleReviewer(service.name, service.email, service._id)
                  }
                  disabled={disabledButtons[service._id]}
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
          <h5 className=" font-weight-bold text-primary ">
            Your Selected Reviewers:
          </h5>{" "}
        </u>

        {selectedReviewer.map((item, index) => (
          <div key={index}>
            <h4 className="text-danger font-weight-bold">
              {" "}
              {index + 1}. {item?.name}
            </h4>
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

export default ReviewerList;
