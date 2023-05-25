import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { loginUserContext } from "../../App";

import { getAuth } from "firebase/auth";
import { Card, Col, Container, Nav, Row, Table } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAdmin from "../../Hooks/useAdmin";
import useReviewer from "../../Hooks/useReviewer";
import app from "../LoginInfo/firebase.config";
import AddReviewer from "../Reviewer/AddReviewer";
import AssignedReview from "../Reviewer/AssignedReview";
import { name } from "../Shared/AuthorNav";
import Loading from "./../Shared/Loading";
import AllUsers from "./AllUsers";
import UnderReview from "./UnderReview";
import UpdateProfile from "./UpdateProfile";

const Dashbord = () => {
  const auth = getAuth(app);
  const [loginUserEmail] = useContext(loginUserContext);
  const [user, loading] = useAuthState(auth);
  const [data, setData] = useState([]);
  const [isAdmin, isAdminLoading] = useAdmin(loginUserEmail);
  const [isReviewer, isReviewerLoading] = useReviewer(loginUserEmail);

  const headers = {
    "Content-Type": "application/json",
    authorization: `bearer ${localStorage.getItem("accessToken")}`,
  };

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/adminData");
      const data = await response.json();
      return data;
    },
  });

  const url = `http://localhost:4000/submittedData?email=${loginUserEmail}`;

  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [loginUserEmail]);

  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/submittedData/${id}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setIsDeleted(response.data);
        toast.success("Item deleted successfully!");
        setData(data.filter((data) => data._id !== id));
        refetch();
      })
      .catch((error) => {
        toast.error("An error occurred while deleting this Item.");
      });
  };

  const [activeMenu, setActiveMenu] = useState("");

  const [allLoading, setallLoading] = useState(true);

  useEffect(() => {
    async function waitAndSetMenu() {
      await new Promise((resolve) => setTimeout(resolve, 1));
      setActiveMenu(isReviewer ? "AssignedReviewer" : "dashboard");
      setallLoading(false);
    }

    waitAndSetMenu();
  }, [isReviewer]);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  useEffect(() => {
    if (isAdmin) {
      refetch();
    }
  }, [isAdmin, refetch]);

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return (
          <div className="">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Article Type</th>
                  <th>Title of Article</th>
                  <th>Assigned Reviewer</th>
                  <th>Status</th>
                  <th>Details</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {isAdmin
                  ? users &&
                    users?.map((item) => (
                      <tr key={item._id}>
                        <td>
                          {item.email}

                          <Link to={`/dashboard/ShowFullPaper/${item._id}`}>
                            <button
                              onClick={() => item._id}
                              className="btn btn-info"
                            >
                              Show Full Paper{" "}
                              <FontAwesomeIcon icon={faCircleInfo} />
                            </button>
                          </Link>
                        </td>

                        <td>{item.articleType}</td>
                        <td>{item.title}</td>

                        <td>
                          {" "}
                          {item.assignReviewer ? (
                            <h6 className="text-success">
                              {item.assignReviewer}, {item.assignReviewerEmail}{" "}
                            </h6>
                          ) : (
                            <h6 className="text-info">Not Assign Yet</h6>
                          )}{" "}
                        </td>

                        <td>
                          {item.contentAbtract ? (
                            <h5 className="text-success font-weight-bold">
                              Review Done😍
                            </h5>
                          ) : !item.contentAbtract && !item.assignReviewer ? (
                            <h5 className="text-danger font-weight-bold">
                              Awaiting Reviewer Assignment
                            </h5>
                          ) : !item.contentAbtract && item.assignReviewer ? (
                            <h5 className="text-danger font-weight-bold">
                              Review pending
                            </h5>
                          ) : (
                            item.assignReviewer
                          )}
                        </td>
                        <td>
                          {" "}
                          <Link to={`/dashboard/fulldetails/${item._id}`}>
                            See Details <FontAwesomeIcon icon={faCircleInfo} />{" "}
                          </Link>{" "}
                        </td>
                        <td>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>{" "}
                        </td>
                      </tr>
                    ))
                  : data?.map((item) => (
                      <tr key={item._id}>
                        <td>{item.email}</td>
                        <td>{item.articleType}</td>
                        <td>{item.title}</td>

                        <td>
                          {" "}
                          {item.assignReviewer ? (
                            <h6 className="text-success">
                              {item.assignReviewer}, {item.assignReviewerEmail}{" "}
                            </h6>
                          ) : (
                            <h6 className="text-info">Not Assign Yet</h6>
                          )}{" "}
                        </td>

                        <td>
                          {item.contentAbtract ? (
                            <h5 className="text-success font-weight-bold">
                              Review Done😍
                            </h5>
                          ) : !item.contentAbtract && !item.assignReviewer ? (
                            <h5 className="text-danger font-weight-bold">
                              Awaiting Reviewer Assignment
                            </h5>
                          ) : !item.contentAbtract && item.assignReviewer ? (
                            <h5 className="text-danger font-weight-bold">
                              Review pending
                            </h5>
                          ) : (
                            item.assignReviewer
                          )}
                        </td>
                        <td>
                          {" "}
                          <Link to={`/dashboard/fulldetails/${item._id}`}>
                            See Details <FontAwesomeIcon icon={faCircleInfo} />{" "}
                          </Link>{" "}
                        </td>
                        <td>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>{" "}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </Table>
          </div>
        );

      case "UnderReview":
        return (
          <Card>
            <Card.Body>
              <UnderReview />
            </Card.Body>
          </Card>
        );
      case "AddReviewer":
        // eslint-disable-next-line no-lone-blocks
        return (
          <Card>
            <Card.Body>
              <AddReviewer />
            </Card.Body>
          </Card>
        );
      case "All Users":
        // eslint-disable-next-line no-lone-blocks

        return (
          <Card>
            <Card.Body>
              <Card.Text>
                <AllUsers />
              </Card.Text>
            </Card.Body>
          </Card>
        );

      case "AssignedReviewer":
        // eslint-disable-next-line no-lone-blocks

        return (
          <Card>
            <Card.Body>
              <Card.Title></Card.Title>
              <Card.Text>
                <AssignedReview />
              </Card.Text>
            </Card.Body>
          </Card>
        );
      case "updateProfile":
        // eslint-disable-next-line no-lone-blocks

        return (
          <Card>
            <Card.Body>
              <UpdateProfile user={user} />
            </Card.Body>
          </Card>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isAdminLoading || isReviewerLoading || loading) {
    <p>
      <Loading />
    </p>;
  }
  return (
    <>
      {allLoading ? (
        <h3>loading .....</h3>
      ) : (
        <div>
          <Container fluid className="mt-5 p-2">
            <Row>
              <Col md={2}>
                <Card>
                  <Card.Body>
                    <Card.Title className="font-weight-bold">{name}</Card.Title>
                    <Nav variant="pills" className="flex-column">
                      {isReviewer ? null : (
                        <>
                          <Nav.Item>
                            <Nav.Link
                              href="#"
                              active={activeMenu === "dashboard"}
                              onClick={() => handleMenuClick("dashboard")}
                            >
                              {isAdmin ? "Total Submission" : "Your Submission"}
                            </Nav.Link>
                          </Nav.Item>

                          {/* <Nav.Item>
                    <Nav.Link
                      href="#"
                      active={activeMenu === "Published"}
                      onClick={() => handleMenuClick("Published")}
                    >
                      {isAdmin ? "Total Published" : "Your Published"}
                    </Nav.Link>
                  </Nav.Item> */}

                          <Nav.Item>
                            <Nav.Link
                              href="#"
                              active={activeMenu === "UnderReview"}
                              onClick={() => handleMenuClick("UnderReview")}
                            >
                              Under Review
                            </Nav.Link>
                          </Nav.Item>
                        </>
                      )}
                      {isAdmin && (
                        <Nav.Item>
                          <Nav.Link
                            href="#"
                            active={activeMenu === "All Users"}
                            onClick={() => handleMenuClick("All Users")}
                          >
                            All Users
                          </Nav.Link>
                        </Nav.Item>
                      )}

                      {isAdmin && (
                        <Nav.Item>
                          <Nav.Link
                            href="#"
                            active={activeMenu === "AddReviewer"}
                            onClick={() => handleMenuClick("AddReviewer")}
                          >
                            Add Reviewer
                          </Nav.Link>
                        </Nav.Item>
                      )}
                      {isReviewer && (
                        <Nav.Item>
                          <Nav.Link
                            href="#"
                            active={activeMenu === "AssignedReviewer"}
                            onClick={() => handleMenuClick("AssignedReviewer")}
                          >
                            Assigned Review
                          </Nav.Link>
                        </Nav.Item>
                      )}

                      <Nav.Item>
                        <Nav.Link
                          href="#"
                          active={activeMenu === "updateProfile"}
                          onClick={() => handleMenuClick("updateProfile")}
                        >
                          Update Your Profile
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={10}>
                <Card>
                  <Card.Body>
                    <Card.Title>{activeMenu.toUpperCase()}</Card.Title>
                    {renderContent()}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Dashbord;
