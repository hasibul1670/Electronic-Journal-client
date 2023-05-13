import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";

const UpdateProfile = ({ user }) => {
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

  const handleValuesChange = (changedValues, allValues) => {
    setFormData(allValues, changedValues);
  };
  
  const imageHostKey = process.env.REACT_APP_imgbb_key;


const uploadImage =()=>{
  const image1 = formData?.profilePic?.file;
  console.log(image1);
  const imageData = new FormData();
  imageData.append("image", image1);
  const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

fetch (url,{
  method: 'POST',
  body :imageData
})
.then(res => res.json())
.then(iData => {
        console.log(iData.data);   
        }
)}




  const handleSubmit = async () => {
    uploadImage();
    try {


      const formDataWithFile = new FormData();
      formDataWithFile.append("authorName", formData.authorName);
      formDataWithFile.append("phone", formData.phone);
      formDataWithFile.append("institutionName", formData.institutionName);
      formDataWithFile.append("department", formData.department);
      formDataWithFile.append("city", formData.city);
      formDataWithFile.append("postalCode", formData.postalCode);
      formDataWithFile.append("profilePic", formData.profilePicFile);

      const response = await fetch(
        //`http://localhost:4000/authorData/${user?.email}`,
        {
          method: "PUT",
          body: formDataWithFile,
        }
      );
      const data = await response.json();
      console.log(data.modifiedCount);

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
  };

  if (isLoading) {
    return <Loading />;
  }

  const beforeUpload = (file) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File must be smaller than 5MB.");
      return false;
    }
    if (user?.profilePic) {
      toast.error("You can only upload one file.");
      return false;
    }
    return true;
  };

  return (
    <div className="container-fluid">
      {users &&
        users?.map((user) => (
          <div key={user?._id} className="">
            <Form
              name="basic"
              labelCol={{ span: 32 }}
              wrapperCol={{ span: 32 }}
              initialValues={{ remember: true }}
              onValuesChange={handleValuesChange}
            >
              <div className="d-flex">
                <div>
                  {" "}
                  <Form.Item
                    label="Name"
                    name="authorName"
                    initialValue={user?.authorName}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Phone"
                    name="phone"
                    initialValue={user?.phone}
                  >
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
                  <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                    <Button type="primary" onClick={handleSubmit}>
                      Save
                    </Button>
                  </Form.Item>
                </div>
                <div className="ml-5">
                  <Form.Item
                    label="Profile Picture"
                    name="profilePic"
                    initialValue={user?.profilePic}
                  >
                    <Upload
                      name="profilePic"
                      listType="picture-card"
                      beforeUpload={beforeUpload}
                       //onChange={uploadImage}
                    >
                      {user?.profilePic ? (
                        // eslint-disable-next-line jsx-a11y/img-redundant-alt
                        <img
                          src={user.profilePic}
                          alt="Profile Picture"
                          style={{
                            width: "300px",
                            height: "300px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      )}
                    </Upload>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
        ))}

      <Toaster />
    </div>
  );
};

export default UpdateProfile;
