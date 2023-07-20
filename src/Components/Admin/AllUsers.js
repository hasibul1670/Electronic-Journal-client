import React from "react";
import { Table } from "react-bootstrap";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllUsers = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/allUserData");
      const data = await response.json();
      return data;
    },
  });

  const handleAdmin = (id) => {
    fetch(`http://localhost:4000/users/admin/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.lastErrorObject?.updatedExisting === true) {
          toast.success("Make Admin Successfully");
          refetch();
        } else {
          toast.error("Make Admin Error");
        }
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
          </tr>
        </thead>
        <tbody>
          {users &&
            users?.map((item) => (
              <tr key={item._id}>
                <td>{item?.authorName}</td>
                <td>{item?.email}</td>
                <td>{item?.institutionName}</td>
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
            
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AllUsers;
