import React from "react";
import { useContext } from "react";
import { reviewerContext } from "../../App";

const ReviewerList = (props) => {
  const closeModal = props.closeModal;

  const styles = {
    backgroundColor: "lightgray",
  };
  const [reviewer] = useContext(reviewerContext);
  return (
    <div>
      <div className="w-75">
        <ul className="list-group p-3 ">
          {reviewer.map((service) => (
            <li
              style={styles}
              className="list-group-item border font-weight-bold"
              key={service._id}
            >
              <h5 className="font-weight-bold">{service.name}</h5>
              <h6 className="font-weight-bold"> {service.email}</h6>

              <button
                className="btn btn-primary"
                onClick={() => closeModal(service.name, service.email)}
              >
                Add As Reviewer{" "}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReviewerList;
