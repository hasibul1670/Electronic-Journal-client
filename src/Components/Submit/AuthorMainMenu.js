import React, { useContext } from "react";
import AuthorNav from "../Shared/AuthorNav";
import logo from "./../../logo/home.jpg";
import { Link } from "react-router-dom";
import { dataContext } from "../../App";
import { useState } from "react";


const AuthorMainMenu = () => {
  const [data, setData] = useContext(dataContext);
  
  const [assignReviewer, setAssignReviewer] = useState(0);
  
  let assign=0;

  for (let i = 0; i < data?.length; i++) {
    const object = data[i].assignReviewer;
    if (object?.length > 1) {
      assign++;
    }

  }


  return (
    <div>
      <div className=" mt-5 card mb-3 mx-auto w-75">
        <div className="row no-gutters">
          <div className="col-md-4  ">
            <h4 className="p-4 ">Author Main Menu</h4>
            <img src={logo} className="card-img img-fluid p-2 ml-4 w-50" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="line-height card-title">New Submissions</h5>
              <div className="ml-5">
                <Link to="/submit">Submit New Manuscript</Link>
                <br />
                <Link to="">Submissions Sent Back to Author (0) </Link>
                <br />

                <Link to="/dashboard">
                  Submissions Being Processed ({data?.length})
                </Link>
                <br />
              </div>
              <h5 className="line-height card-title">Revisions</h5>
              <div className="ml-5">
                {data?.assignReviewer}
                <Link>Assign Reviewer ({assign})</Link>
                <br />
                <Link>Revisions Sent Back to Author (0)</Link>
                <br />

                <Link>Submissions Being Processed (0)</Link>
                <br />

                <Link>Declined Revisions (0)</Link>
                <br />
              </div>

              <h5 className="line-height card-title">Completed</h5>
              <div className="ml-5">
                <Link>Submissions with a Decision (0)</Link>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorMainMenu;
