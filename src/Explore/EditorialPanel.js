import React, { useState } from "react";
import EditorDetails from "./EditorDetails";
import members from "./EditorialBoardMember";

const EditorialPanel = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const handleShowModal = (member) => {
    setSelectedMember(member);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  return (
    <div className="contaner">
      {members.map(
        (card) =>
          card.title === "Editor-in-Chief" && (
            <div className="card-container mt-4 d-flex justify-content-center flex-wrap ">
              <div
                className="card cardEditorial p-2 m-2 d-flex align-items-center"
                style={{ width: "18rem" }}
              
                key={card.id}
              >
                <img
                  className="card-img-top"
                  style={{ width: "10rem", marginBottom: "1rem" }}
                  src={card?.imageSrc}
                  alt="Card cap"
                />

                <div className="card-body">
                  <p className="card-title font-weight-bold">{card.title}</p>
                  <h5 className="card-title text-primary font-weight-bold">
                    {card.name}
                  </h5>
                  <p >
                      <small className="font-weight-bold">  {card.institution}</small>
                      </p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleShowModal(card)}
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    Details
                  </button>
                </div>
              </div>
              <br />
            </div>
          )
      )}
      {/*other cards  */}
      <div className="container">
        <div className="card-container mt-4 d-flex justify-content-center flex-wrap">
          {members.map(
            (card) =>
              card.title !== "Editor-in-Chief" && (
                <div
                  className="card cardEditorial p-2 m-2 d-flex align-items-center"
                  style={{ width: "18rem" }}
                  key={card.id}
                >
                  <img
                    className="card-img-top"
                    style={{ width: "200px",height:"200px", marginBottom: "1rem" }}
                    src={card?.imageSrc || "https://i.pravatar.cc/300"}
                    alt="Card cap"
                  />

                  <div className="card-body">
                    <p className="card-title font-weight-bold">{card.title}</p>
                    <h5 className="card-title text-primary font-weight-bold">
                      {card.name}
                     
                    </h5>
                     <p >
                      <small className="font-weight-bold">  {card.institution}</small>
                      </p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleShowModal(card)}
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                    >
                      Details
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      </div>

      {selectedMember && (
        <>
          <EditorDetails
            selectedMember={selectedMember}
            setSelectedMember={setSelectedMember}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
          ></EditorDetails>
        </>
      )}
    </div>
  );
};

export default EditorialPanel;
