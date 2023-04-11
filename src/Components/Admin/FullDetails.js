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

import { Line } from "react-chartjs-2";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

import { Table, Card, Row, Col, Container, Nav } from "react-bootstrap";
import { dataContext } from "../../App";

const FullDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState(null);

  
  const currencies = [
    {
      value: "Research Paper",
      label: "Research Paper",
    },
    {
      value: "Review Paper",
      label: "Review Paper",
    },
    {
      value: "Special Issue",
      label: "Special Issue",
    },
  ];
  let handleChange = (event) => {
    setStatus(event.target.value);
  };

  const [data,setData] = useContext(dataContext);

  useEffect(() => {
    fetch(`http://localhost:4000/submittedData/${id}`)
    .then((response) => response.json())
    .then((data) => {
  
      setItem(data);
    })
    .catch((error) => {
      console.log(error);
    });
}, [id]);

  return (
    <div className="container-fluid">
      <h1>Hello world</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>File</th>
            <th>Username</th>
            <th>Article Type</th>
            <th>Title of Article</th>
            <th>Reviewer Preference</th>
            <th>Keyword</th>
            <th>Abstract</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr key={item?._id}>
            <td>
              <a href={item?.url}>
                Docx <FontAwesomeIcon icon={faDownload} />
              </a>
            </td>
            <td className="font-weight-bold">{item?.email}</td>
            <td className="font-weight-bold">{item?.articleType}</td>
            <td className="font-weight-bold">{item?.title}</td>
            <td className="font-weight-bold">{item?.reviewer}</td>
            <td className="font-weight-bold">{item?.keyword}</td>
            <td className="font-weight-bold">{item?.abstract}</td>
            <td>
              <select
                className="border font-weight-bold w-75 border-secondary form-control"
                id="dropdown"
                value={status}
                onChange={handleChange}
              >
                <option value="Special Issue">Pending</option>
                <option value="Research Paper">Published</option>
                <option value="Review Paper">Under Review</option>
              </select>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default FullDetails;
