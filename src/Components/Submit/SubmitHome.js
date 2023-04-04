import React from "react";
import AuthorNav from "../Shared/AuthorNav";
import logo from "./../../logo/home.jpg";

const SubmitHome = () => {
  return (
    <div>
  
      <div className="p-5 m-5 shadow p-3 mb-5 bg-white rounded bg-gray card mb-3 ">
        <div className="row no-gutters">
          <div className="col-md-3">
            <img
              style={{ height: "225px", width: "165px" }}
              src={logo}
              alt=""
              srcSet=""
            />
          </div>

          <div className="col-md-4 verticalline">
            <div className="card-body">
              <h5 className="card-title">
                International Journal of Computer and Electronics Engineering{" "}
              </h5>
              <h6>
                International Journal of Computer and Electronics Engineering
                (IJCEE) will emphasize on efficient and effective image and
                graphics technologies and systems, and provide a central forum
                for scientists, researchers, engineers and vendors from
                different disciplines to exchange ideas, identify problems,
                investigate relevant issues, share common interests, explore new
                directions, and initiate possible collaborative research and
                system development. This journal will significantly benefit a
                large variety of academic and industrial sectors.
              </h6>
              <hr />
              <p className="text-danger">
                <small>
                  World Scientific Journals | World Scientific Bookshop |
                  WorldSciNet Archives
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitHome;
