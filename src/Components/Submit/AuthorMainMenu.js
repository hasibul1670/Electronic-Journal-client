import React from "react";
import AuthorNav from "../Shared/AuthorNav";
import logo from "./../../logo/home.jpg";

const AuthorMainMenu = () => {
  return (
    <div>
    

      <div className=" mt-5 card mb-3 mx-auto w-75">
        <div className="row no-gutters">
          <div className="col-md-4  ">
            <h4 className="p-4 ">Author Main Menu</h4>
            <img src={logo} className="card-img p-2 ml-4 w-50" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="line-height card-title">New Submissions</h5>
              <div className="ml-5">
                <h6>Submit New Manuscript</h6>
                <h6>Submissions Sent Back to Author (0)</h6>
                <h6>Incomplete Submissions (0)</h6>
                <h6>Submissions Waiting for Author's Approval (0)</h6>
                <h6>Submissions Being Processed (0)</h6>
              </div>
              <h5 className="line-height card-title">Revisions</h5>
              <div className="ml-5">
                <h6>Submissions Needing Revision (0)</h6>
                <h6>Revisions Sent Back to Author (0)</h6>
                <h6>Incomplete Submissions (0)</h6>
                <h6>Submissions Waiting for Author's Approval (0)</h6>
                <h6>Submissions Being Processed (0)</h6>
              </div>

              <h5 className="line-height card-title">Completed</h5>
              <div className="ml-5">
                <h6>Submissions with a Decision (0)</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorMainMenu;
