import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { dataContext, editorContext } from "../../App";
import AuthorNav from "../Shared/AuthorNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faCoffee,
  faDownload,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

import { Line } from "react-chartjs-2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

import { Table, Card, Row, Col, Container, Nav } from "react-bootstrap";

import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import app from "../LoginInfo/firebase.config";

import useAdmin from "../../Hooks/useAdmin";
import { useQuery } from "react-query";
import Loading from "./../Shared/Loading";
import useReviewer from "../../Hooks/useReviewer";
import ReviewerList from "./../Submit/ReviewerList";
import { clear } from "@testing-library/user-event/dist/clear";

const AssignedReview = () => {
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);

  const [data, setData] = useState([]);
  const [isReviewer, isReviewerLoading] = useReviewer(user?.email);

  const headers = {
    "Content-Type": "application/json",
    authorization: `bearer ${localStorage.getItem("accessToken")}`,
  };

  const url = `http://localhost:4000/revData?email=${user?.email}`;

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
           console.log("Hello", data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [user?.email]);

  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = (id) => {};

  const [activeMenu, setActiveMenu] = useState("dashboard");

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  if (isAdminLoading || isReviewerLoading) {
    <p>
      <Loading />
    </p>;
  }
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>File</th>
          <th>Username</th>
          <th>Article Type</th>
          <th>Title of Article</th>
          <th>Assigned Reviewer </th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => (
          <tr key={item._id}>
            <td>
              <a href={item.url}>
                Docx <FontAwesomeIcon icon={faDownload} />
              </a>
            </td>
            <td>{item.email}</td>
            <td>{item.articleType}</td>
            <td>{item.title}</td>
            <td>
              {item.assignReviewer} <br />
              {item.assignReviewerEmail}
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
                Edit
              </button>{" "}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AssignedReview;
