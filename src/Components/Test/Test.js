import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import Test1 from "./test1";

const ReviewPreference = ({ reviewer, setReviewer }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 1000); // Blink for 1 second
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [selectedReviewer, setSelectedReviewer] = useState([]);

  const openModal = () => {
    setModalIsOpen(true);
    handleClick();
  };

  const closeModal = (e) => {
    setModalIsOpen(false);
    setReviewer([...reviewer, e]);
  };

  return (
    <div className="p-4">
      <fieldset className=" border border-primary p-5">
        <legend className="float-none font-weight-bold border border-warning p-2 text-primary w-auto">
          Review Preference
        </legend>

        <hr></hr>
        <h5 className="text-info">
          Please suggest potential reviewers for this submission and provide
          specific reasons for your suggestion in the comments box for each
          person.
        </h5>
        <br />
        <h4
          className="font-weight-bold text-danger"
          style={{ animation: clicked ? "blink 1s linear infinite" : "" }}
        ></h4>
        <style>{`
        @keyframes blink {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>

        <h4 className="border p-2">
          {" "}
          <u>
            <span>Your Selected Reviewer :</span>
          </u>
          <p></p>
          <span className="text-success">
            {selectedReviewer.map((item, index) => (
              <div key={index}>
                <h5 className=" border border-2 p-2 font-weight-bold text-primary">
                  {index + 1}. {item.name} <br />
                  {item.email}
                </h5>
              </div>
            ))}
          </span>
        </h4>
        <p></p>

        <button
          className="btn btn-secondary font-weight-bold"
          onClick={openModal}
        >
          <FontAwesomeIcon icon={faPlus} />
          Add Suggested Reviewer
        </button>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
          <h2>Select Your desirable Reviewer</h2>

          <p></p>

          <div>
            <Test1
              closeModal={closeModal}
              selectedReviewer={selectedReviewer}
              setSelectedReviewer={setSelectedReviewer}
            />
          </div>
        </Modal>
      </fieldset>
    </div>
  );
};

export default ReviewPreference;
