import React from "react";
import { useContext } from "react";
import { editorContext } from "../../App";

const ReviewerList = (props) => {
  const closeModal = props.closeModal;

  const styles = {
    backgroundColor: "lightgray",
  };
  const [editor] = useContext(editorContext);
  return (
    <div>
      <div className="w-75">
        <ul className="list-group p-3 ">
          {editor.map((service) => (
            <li
              style={styles}
              className="list-group-item font-weight-bold"
              key={service._id}
            >
              {service.name}
              <br /> {service.email}
              <p></p>
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
