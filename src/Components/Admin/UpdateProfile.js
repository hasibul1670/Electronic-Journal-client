import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";

const UpdateProfile = ({ user }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState("");

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:4000/author/?email=${user?.email}`
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
        setIsSaving(true)
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
  
  console.log('Hello',formData);
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/authorData/${user?.email}`,
        {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.modifiedCount > 0) {
        toast.success("Update Data Successfully");
        refetch();
      } else {
        toast.error("Nothing To Update");
      }
    } catch (error) {
      console.error(error);
      toast.error("Update Data Error");
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container-fluid">
      <img
        src={photo}
        alt="Imafgfgge"
        className="rounded-circle mb-5"
        style={{ width: "300px", height: "300px" }}
      />

      {users &&
        users?.map((user) => (
          <div key={user?._id} className="">
            <Form
              className="font-weight-bold text-primary"
              name="basic"
              initialValues={{ remember: true }}
              onValuesChange={handleValuesChange}
            >
              {" "}
              <Form.Item
                label="Name"
                name="authorName"
                initialValue={user?.authorName}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Phone" name="phone" initialValue={user?.phone}>
                <Input />
              </Form.Item>
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
              <Form.Item label="City" name="city" initialValue={user?.city}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Postal Code"
                name="postalCode"
                initialValue={user?.postalCode}
              >
                <Input />
              </Form.Item>
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
                  <img src={imageUrl} alt="Uploaded" />
                </>
              )}
              <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                <Button type="primary" onClick={handleSubmit}>
                  Save
                </Button>
              </Form.Item>
            </Form>
          </div>
        ))}

      <Toaster />
    </div>
  );
};

export default UpdateProfile;
