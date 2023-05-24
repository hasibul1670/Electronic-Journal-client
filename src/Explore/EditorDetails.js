import React from "react";

const EditorDetails = ({
  handleCloseModal,
  selectedMember,
}) => {
  return (
    <div
      className="modal fade modal fade bd-example-modal-lg"
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div className="modal-content">
          {" "}
          {/* Increase the maxWidth value to increase the modal size */}
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              {selectedMember.name}
            </h5>
            <button
              type="button"
              className="close"
              onClick={handleCloseModal}
              data-dismiss="modal" // Add this attribute
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {/* body */}
          <div class="card mb-6">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img
                  className="card-img-top p-2 ml-3 mt-3 img-fluid"
                  src={selectedMember.imageSrc}
                  alt="none"
                  style={{ width: "80%" }}
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class=" text-primary font-weight-bold card-title">{selectedMember.name}</h5>
                  <h6 class=" card-text">{selectedMember.description}</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseModal}
              data-dismiss="modal" 
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorDetails;
