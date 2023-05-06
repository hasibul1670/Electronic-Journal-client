import { Button, Form, Input } from "antd";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useQuery } from "react-query";
import AuthorNav from "../Shared/AuthorNav";
import Loading from "../Shared/Loading";

const UpdateProfile = ({ user }) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState('');

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const response = await fetch(`http://localhost:4000/author/?email=${user?.email}`);
      const data = await response.json();
      return data;
    },
  });

  const handleValuesChange = (changedValues, allValues) => {
     setFormData(allValues,changedValues);
 //   console.log("Hello", formData);
  };

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
      console.log(data.modifiedCount);
      if (data.modifiedCount>0){
        toast.success("Update Data Successfully");
        refetch();
      }else{
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

  return (
    <div className="container-fluid">
     
      {users&&users?.map((user) => (
        <div key={user?._id} className="">
       
                <Form
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 8 }}
                  initialValues={{ remember: true }}
                  onValuesChange={handleValuesChange}
                >
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
                </Form>
            
        </div>
      ))}

      <Toaster />
    </div>
  );
};

export default UpdateProfile;
