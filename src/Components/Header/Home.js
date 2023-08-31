import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { loginUserContext } from "../../App";
import useAdmin from "../../Hooks/useAdmin";
import useReviewer from "../../Hooks/useReviewer";
import Loading from "../Shared/Loading";
import logo from "./../../logo/home.jpg";

const Home = () => {
  const [loginUserEmail] = useContext(loginUserContext);

  const [isAdmin, isLoading] = useAdmin(loginUserEmail);
  const [isReviewer, isReviewerLoading] = useReviewer(loginUserEmail);

  if (isLoading || isReviewerLoading) {
     (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="img-fluid home-bg">
      <br />

      <div className="card opacity p-5 mb-3 w-75 mx-auto">
        <div className="row no-gutters">
          <div className="col-md-8 col-sm-12">
            <div className="d-md-flex align-items-center">
              <div className="mr-md-4 mb-3 mb-md-0">
                <img
                  className="img-fluid"
                  src={logo}
                  alt=""
                  style={{ maxHeight: "289px", width: "100%" }}
                />
              </div>
              <div className="card-body">
                <h4 className="card-title font-weight-bold">
                  International Journal of Computer and Electronics Engineering
                </h4>
                <h6 className="card-text text-primary">
                  ISSN (online) || 1793-6756 ||
                  <span className="text-danger"> proposed </span>{" "}
                </h6>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-12">
            <div className="card-body">
              {isAdmin || isReviewer ? (
                <Link
                  to="/Dashboard"
                  className="font-weight-bold btn-lg btn btn-outline-primary btn-block mb-3"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <Link
                  to="/submit"
                  className="font-weight-bold btn-lg btn btn-outline-primary btn-block mb-3"
                >
                  Submit An Article
                </Link>
              )}

              <Link
                to="/explore"
                className="btn font-weight-bold btn-outline-info btn-lg btn-block"
              >
                Explore Our Journal
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="navbar-bg-color d-flex justify-content-center"></div>
    </div>
  );
};

export default Home;
