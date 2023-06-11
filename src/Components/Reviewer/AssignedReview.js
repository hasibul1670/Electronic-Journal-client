import { faCircleInfo, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { loginUserContext } from "../../App";
import useAdmin from "../../Hooks/useAdmin";
import useReviewer from "../../Hooks/useReviewer";
import Loading from "./../Shared/Loading";

const AssignedReview = () => {
  const [loginUserEmail] = useContext(loginUserContext);
  const [isAdmin, isAdminLoading] = useAdmin(loginUserEmail);
  const [data, setData] = useState([]);
  const [isReviewer, isReviewerLoading] = useReviewer(loginUserEmail);

  const headers = {
    authorization: `bearer ${localStorage.getItem("accessToken")}`,
  };

  const url = `http://localhost:4000/revData?email=${loginUserEmail}`;

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
        // console.log("Hello", data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [loginUserEmail]);

  const [isDeleted, setIsDeleted] = useState(false);

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
    <Table striped bordered hover >
      <thead>
        <tr>
         
          <th>Username</th>
          <th>Article Type</th>
          <th>Title of Article</th>
          <th>Assigned Reviewer </th>
          <th>Edit</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => (
          <tr key={item._id}>
            <td><p>{item.email}</p></td>
            <td>{item.articleType}</td>
            <td>{item.title}</td>
            <td>
              {item.assignReviewer} <br />
              {item.assignReviewerEmail}
            </td>

            <td>
              <Link to={`/dashboard/WriteReviewComment/${item._id}`}>
                <button onClick={() => item._id} className="btn btn-danger">
                  Review 
                </button>
              </Link>
            </td>

            <td>
              {item.contentAbtract ? (
                <h5 className="font-weight-bold text-success"> Review Done ✅</h5>
              ) : (
                <h5 className="text-danger font-weight-bold">Pending </h5>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AssignedReview;
