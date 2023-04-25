import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import AuthorNav from "../Shared/AuthorNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faCoffee,
  faDownload,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import { Table} from "react-bootstrap";
import { useQuery } from "react-query";
import { Toaster, toast } from "react-hot-toast";

const FullDetails = () => {
  const { id } = useParams();

  let handleChange = (event) => {
    setStatus(event.target.value);
  };

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:4000/submittedData/${id}`);
      const data = await response.json();
      return data;
    },
  });

  const [status, setStatus] = useState("");

  const handleAssignReviewer = (id) => {
    fetch(`http://localhost:4000/assign/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.lastErrorObject?.updatedExisting === true) {
          toast.success("Assign Reviewer Successfully");
          refetch();
        } else {
          toast.error("Assign Reviewer Error");
        }
      });
  };

  return (
    <div className="container-fluid p-1">
 
      <h1>Full Details Page</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>File</th>
            <th>Username</th>
            <th>Article Type</th>
            <th>Title of Article</th>
            <th>Assign Reviewer</th>
            <th>Action</th>
            <th>Assign</th>
          </tr>
        </thead>
        <tbody>
          <tr key={users?._id}>
            <td>
              <a href={users?.url}>
                Docx <FontAwesomeIcon icon={faDownload} />
              </a>
            </td>
            <td className="font-weight-bold">{users?.email}</td>
            <td className="font-weight-bold">{users?.articleType}</td>
            <td className="font-weight-bold">{users?.title}</td>
            <td>
              <select
                className="border font-weight-bold w-75 border-secondary form-control"
                id="dropdown"
                value={status}
                onChange={handleChange}
              >
                <option value="">None</option>
                {users?.reviewer?.map((reviewer, index) => (
                  <option key={index} value={reviewer}>
                    {reviewer}
                  </option>
                ))}
              </select>
            </td>

            <td>
              <button
                onClick={() => handleAssignReviewer(users._id)}
                className="btn btn-danger"
              >
                Done
              </button>
            </td>
            <td className="font-weight-bold">{users?.assignReviewer}</td>
          </tr>
        </tbody>
      </Table>
      <Toaster />
    </div>
  );
};

export default FullDetails;
