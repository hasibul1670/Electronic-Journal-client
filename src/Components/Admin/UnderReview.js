import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import { useQuery } from "react-query";
import { loginUserContext } from "../../App";
import Loading from "../Shared/Loading";

const UnderReview = () => {
  const [loginUserEmail] = useContext(loginUserContext);

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container-fluid p-4 ">
      <h4 className="text-primary m-4">Under Reviewer Info Page</h4>
      <hr />
      <div className="">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Username</th>
              <th>Article Type</th>
              <th>Title of Article</th>
              <th>Assigned Reviewer</th>
              <th>Review Status</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users?.map((item) => (
                <tr key={item._id}>
                  {!item.contentAbtract && item.assignReviewer && (
                    <>
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
                        <h5 className="text-danger font-weight-bold">
                          Review pending
                        </h5>
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default UnderReview;
