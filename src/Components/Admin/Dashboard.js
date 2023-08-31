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
import { name, photo } from "../Shared/AuthorNav";
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
      setActiveMenu(isReviewer ? "Assigned Reviewer" : "dashboard");
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
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th style={{ width: "15px" }}>Username</th>

                  <th>Title of Article</th>
                  <th>Assigned Reviewer</th>
                  <th>Status</th>

                  {isAdmin && (
                    <>
                      {" "}
                      <th> Assign Reviewer </th>
                      <th>Delete</th>
                    </>
                  )}
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
                              className="btn btn-sm btn-primary"
                            >
                              Show Full Paper{" "}
                            </button>
                          </Link>
                        </td>

                        <td className="text-sm">{item.title}</td>

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
                            <h6 className="text-success font-weight-bold">
                              Review Done
                            </h6>
                          ) : !item.contentAbtract && !item.assignReviewer ? (
                            <h6 className="text-info font-weight-bold">
                              Awaiting Reviewer Assignment
                            </h6>
                          ) : !item.contentAbtract && item.assignReviewer ? (
                            <h6 className="text-danger font-weight-bold">
                              Review pending
                            </h6>
                          ) : (
                            item.assignReviewer
                          )}
                        </td>
                        <td>
                          {item.assignReviewer ? (
                            <p className="text-danger">Reviewer Assigned</p>
                          ) : (
                            <Link to={`/dashboard/fulldetails/${item._id}`}>
                              Assign Reviewer
                            </Link>
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="btn btn-info"
                          >
                            Delete
                          </button>{" "}
                        </td>
                      </tr>
                    ))
                  : data?.map((item) => (
                      <tr key={item._id}>
                        <td>
                          {item.email}

                          <Link to={`/dashboard/ShowFullPaper/${item._id}`}>
                            <button
                              onClick={() => item._id}
                              className="btn btn-info"
                            >
                              Show Full Paper{" "}
                            </button>
                          </Link>
                        </td>

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
                            <h6 className="text-success font-weight-bold">
                              Review Done
                            </h6>
                          ) : !item.contentAbtract && !item.assignReviewer ? (
                            <h6 className="text-info font-weight-bold">
                              Awaiting Reviewer Assignment
                            </h6>
                          ) : !item.contentAbtract && item.assignReviewer ? (
                            <h6 className="text-danger font-weight-bold">
                              Review pending
                            </h6>
                          ) : (
                            item.assignReviewer
                          )}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </Table>
          </div>
        );
      case "Under Review":
        return (
          <Card>
            <Card.Body>
              <UnderReview />
            </Card.Body>
          </Card>
        );
      case "Add Reviewer":
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

      case "Assigned Reviewer":
        return (
          <Card>
            <AssignedReview />
          </Card>
        );
      case "Update Profile":
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
      {isAdminLoading || isReviewerLoading || loading ? (
        <p>
          {" "}
          <Loading />
        </p>
      ) : (
        <div>
          <Container fluid className="mt-5 p-2">
            <Row>
              <Col md={12} lg={3}>
                <Card>
                  <Card.Body>
                    <Card.Title className="font-weight-bold d-flex justify-content-center">
                      {name}
                    </Card.Title>

                    <div className="d-flex justify-content-center">
                      <div className="rounded-circle overflow-hidden">
                        <img
                          src={photo}
                          alt="Imafgfgge"
                          className="rounded-circle img-fluid mb-2"
                          style={{ width: "100px", height: "100px" }}
                        />
                      </div>
                    </div>

                    <Nav variant="pills" className="flex-column">
                      {isReviewer ? null : (
                        <>
                          <Nav.Item>
                            <Nav.Link
                              href="#"
                              className="font-weight-bold"
                              active={activeMenu === "dashboard"}
                              onClick={() => handleMenuClick("dashboard")}
                            >
                              {isAdmin ? "Total Submission" : "Your Submission"}
                            </Nav.Link>
                          </Nav.Item>

                          {isAdmin ? null : (
                            <Nav.Item>
                              <Nav.Link
                                href="#"
                                className="font-weight-bold"
                                active={activeMenu === "Under Review"}
                                onClick={() => handleMenuClick("Under Review")}
                              >
                                Under Review
                              </Nav.Link>
                            </Nav.Item>
                          )}
                        </>
                      )}
                      {isAdmin && (
                        <Nav.Item>
                          <Nav.Link
                            href="#"
                            className="font-weight-bold"
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
                            className="font-weight-bold"
                            href="#"
                            active={activeMenu === "Add Reviewer"}
                            onClick={() => handleMenuClick("Add Reviewer")}
                          >
                            Add Reviewer
                          </Nav.Link>
                        </Nav.Item>
                      )}
                      {isReviewer && (
                        <Nav.Item>
                          <Nav.Link
                            className="font-weight-bold"
                            href="#"
                            active={activeMenu === "Assigned Reviewer"}
                            onClick={() => handleMenuClick("Assigned Reviewer")}
                          >
                            Assigned Paper
                          </Nav.Link>
                        </Nav.Item>
                      )}

                      <Nav.Item>
                        <Nav.Link
                          href="#"
                          className="font-weight-bold"
                          active={activeMenu === "Update Profile"}
                          onClick={() => handleMenuClick("Update Profile")}
                        >
                          Update Your Profile
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={12} lg={9}>
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
