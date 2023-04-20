import { useQuery } from "react-query";
import React, { useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Table, Card, Row, Col, Container, Nav } from "react-bootstrap";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import app from "./../LoginInfo/firebase.config";
import { useAuthState, useDeleteUser } from "react-firebase-hooks/auth";
import useAdmin from "../../Hooks/useAdmin";

import axios from "axios";
import { dataContext } from "../../App";

const AllUsers = () => {
  const auth = getAuth(app);
  const [user,deleteUser,loading] = useAuthState(auth);
  const [isAdmin] = useAdmin(user?.email);
  const [data, setData] = useContext(dataContext);
  const [isDeleted, setIsDeleted] = useState(false);
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/users/admin");
      const data = await response.json();
      return data;
    },
  });

  

  const handleAdmin = (id) => {
        
    fetch(`http://localhost:4000/users/admin/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("e-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Make Admin Successfully");
          refetch();
        }

        toast.error("Make Admin Error");
      });
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
            <th>Delete User</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <tr key={item._id}>
              <td>{item.authorName}</td>
              <td>{item.email}</td>
              <td>{item.institutionName}</td>
              <td>
                {item?.role !== "admin" && (
                  <button
                    onClick={() => handleAdmin(item._id)}
                    className="btn btn-primary"
                  >
                    Make Admin
                  </button>
                )}
              </td>
              <td>
                {item?.role !== "admin" && (
                  <button
                 //   onClick={() => handleDelete(item._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AllUsers;
