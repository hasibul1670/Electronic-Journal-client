import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth } from "firebase/auth";
import { Table } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Toaster, toast } from "react-hot-toast";
import { useQuery } from "react-query";
import useAdmin from "../../Hooks/useAdmin";
import useReviewer from "../../Hooks/useReviewer";
import app from "../LoginInfo/firebase.config";
import Loading from "../Shared/Loading";

const FullDetails = () => {
  const { id } = useParams();
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const [assignReviewer, setAssignReviewer] = useState("");
  const [assignReviewerEmail, setAssignReviewerEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const [isReviewer, isReviewerLoading] = useReviewer(user?.email);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "") {
      setAssignReviewer("");
      setAssignReviewerEmail("");
    } else {
      const [name, email] = selectedValue.split(" (");
      setAssignReviewer(name);
      setAssignReviewerEmail(email.slice(0, -1));
    }
  };
  //console.log("name:", assignReviewer, "email:", assignReviewerEmail);
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:4000/submittedData/${id}`);
      const data = await response.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  const handleAssignReviewer = (id) => {
    fetch(`http://localhost:4000/assign/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assignReviewer,
        assignReviewerEmail,
      }),
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
    <div className="container-fluid  p-1">
      <h1>Full Details Page</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>File</th>
            <th>Username</th>
            <th>Article Type</th>
            <th>Title of Article</th>

            {isReviewer ? null : (
              <>
                <th>Assign Reviewer</th>

                <th>Action</th>
              </>
            )}

            <th>Assigned</th>
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

            {isReviewer ? null : (
              <>
                <td>
                  <select
                    className="border font-weight-bold w-75 border-secondary form-control"
                    id="dropdown"
                    onChange={handleChange}
                  >
                    <option value="">None</option>
                    {users?.reviewer?.map((reviewer, index) => {
                      const { name, email } = JSON.parse(reviewer);
                      const value = `${name} (${email})`;
                      return (
                        <option key={index} value={value}>
                          {name}
                        </option>
                      );
                    })}
                  </select>
                </td>

                <td>
                  <button
                    onClick={() => handleAssignReviewer(users?._id)}
                    className="btn btn-danger"
                  >
                    Done
                  </button>
                </td>
              </>
            )}

            <td className="font-weight-bold">
              {users?.assignReviewer} <br />({users?.assignReviewerEmail})
            </td>
          </tr>
        </tbody>
      </Table>
      <Toaster />
    </div>
  );
};

export default FullDetails;
