import { useQuery } from "react-query";
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
import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";

import { Table, Card, Row, Col, Container, Nav } from "react-bootstrap";
import { toast } from "react-toastify";

const AllUsers = () => {
  const { data: users = [],refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/users");
      const data = await response.json();
      return data;
    },
  });
    
    const handleAdmin = id => {
       fetch(`http://localhost:4000/users/admin/${id}`, {
           method:'PUT'
          })
           .then(res => res.json())
           .then(data => {
                   toast.success("Make Admin Successfully");
                   refetch();  
           })
    };
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Institution Name</th>
            <th>Admin</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <tr key={item._id}>
              <td>{item.authorName}</td>
              <td>{item.authorEmail}</td>
              <td>{item.institutionName}</td>
              <td>
              {item?.role!=='admin' && <button
                   onClick={() => handleAdmin(item._id)}
                  className="btn btn-primary"
                >
                  Make Admin
                </button>}
              </td>
              <td>
                <button
                  // onClick={() => handleDelete(item._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AllUsers;
