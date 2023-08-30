import { Button, Form, Input } from "antd";
import React, { useContext, useEffect } from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { loginUserContext } from "../../App";
import Loading from "../Shared/Loading";

import Swal from "sweetalert2";

const UpdateProfile = ({ user }) => {
  const [loginUserEmail] = useContext(loginUserContext);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState("");

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", loginUserEmail],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:4000/author/?email=${loginUserEmail}`
      );
      const data = await response.json();
      return data;
    },
  });

  const imageHostKey = process.env.REACT_APP_imgbb_key;
  const {
    register,
    formState: { errors },
  } = useForm();

  const uploadImage = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      return;
    }
    const iData = new FormData();
    iData.append("image", selectedFile);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

    fetch(url, {
      method: "POST",
      body: iData,
    })
      .then((res) => res.json())
      .then((iData) => {
        setImageUrl(iData.data.display_url);
        setIsSaving(true);
        setFormData({
          ...formData,
          imageUrl: iData.data.display_url,
        });
      });
  };

  const photo = users && users.length > 0 ? users[0]?.profilePic : 0;
  const [imageUrl, setImageUrl] = useState(photo);

  useEffect(() => {
    setImageUrl(photo);
  }, [photo]);

  const handleValuesChange = (changedValues, allValues) => {
    const newFormData = { ...allValues };
    if (photo) {
      newFormData.imageUrl = photo;
    }
    setFormData(newFormData, changedValues);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/authorData/${loginUserEmail}`,
        {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const updateSuccess = data.result.modifiedCount;
      if (updateSuccess > 0) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Update Your Profile Successfully",
          text: "Your work has been saved",
        });
      } else {
        toast.error("Nothing To Update");
      }
    } catch (error) {
      console.error(error);
      toast.error("Update Data Error");
    }
  };

  const [editMode, setEditMode] = useState(false);

  // Function to toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container-fluid w-100 lightgray p-4">
      <div className="row">
        <div className="col-md-6 col-12 d-flex align-items-center">
          <img
            src={photo || "https://i.pravatar.cc/300"}
            alt="Imafgfgge"
            className="rounded-circle img-fluid mb-5 mx-auto mx-md-0"
            style={{ maxWidth: "300px", height: "auto" }}
          />
        </div>

        <div className="col-md-6 col-12 mt-4">
          <h2>Profile Information</h2>
          <hr />
          {users &&
            users?.map((user) => (
              <div key={user?._id} className="mb-4">
                <h5>Name: {user?.authorName || user?.reviewerName}</h5>
                {user?.phone && <h5>Phone: {user?.phone}</h5>}
                <h5>Institution Name: {user?.institutionName}</h5>
                <h5>Department: {user?.department}</h5>
                {user?.city && <h5>City: {user?.city}</h5>}
              </div>
            ))}

          <button className="btn btn-danger m-2" onClick={toggleEditMode}>
            {editMode ? "Close" : "Edit"}
          </button>
        </div>
      </div>

      <div className="row justify-content-center">
        {users &&
          users?.map((user) => (
            <div key={user?._id} className="col-md-6 col-12 mb-4">
              {editMode ? (
                <Form
                  className="font-weight-bold text-primary"
                  name="basic"
                  initialValues={{ remember: true }}
                  onValuesChange={handleValuesChange}
                >
                  <Form.Item
                    label="Name"
                    name="authorName"
                    initialValue={user?.authorName || user?.reviewerName}
                  >
                    <Input />
                  </Form.Item>
                  {user?.phone && (
                    <Form.Item
                      label="Phone"
                      name="phone"
                      initialValue={user?.phone}
                    >
                      <Input />
                    </Form.Item>
                  )}
                  <Form.Item
                    label="Institution Name"
                    name="institutionName"
                    initialValue={user?.institutionName}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Department"
                    name="department"
                    initialValue={user?.department}
                  >
                    <Input />
                  </Form.Item>
                  {user?.city && (
                    <Form.Item
                      label="City"
                      name="city"
                      initialValue={user?.city}
                    >
                      <Input />
                    </Form.Item>
                  )}
                  {user?.postalCode && (
                    <Form.Item
                      label="Postal Code"
                      name="postalCode"
                      initialValue={user?.postalCode}
                    >
                      <Input />
                    </Form.Item>
                  )}
                  <Form.Item label="Upload Your Profile Photo">
                    <Input
                      type="file"
                      name="imageUrl"
                      {...register("image")}
                      className="input input-bordered w-full max-w-xs"
                      onChange={uploadImage}
                    />
                  </Form.Item>
                  {isSaving && imageUrl && (
                    <>
                      <p>Preview Your Uploaded Photo</p>
                      <img
                        src={imageUrl}
                        className="mb-5"
                        alt="Uploaded"
                        style={{ width: "200px", height: "200px" }}
                      />
                    </>
                  )}
                  <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                    <Button type="primary" onClick={handleSubmit}>
                      Save
                    </Button>
                  </Form.Item>
                </Form>
              ) : null}
            </div>
          ))}
      </div>
    </div>
  );
};

export default UpdateProfile;
