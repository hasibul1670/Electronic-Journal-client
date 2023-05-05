import axios from 'axios';

import { Form, Input,Button } from 'antd';
import { useEffect, useState } from 'react';
import AuthorNav from '../Shared/AuthorNav';
import { toast } from 'react-hot-toast';


const UpdateProfile = ({ user }) => {
  const [data, setData] = useState(null);
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});


  useEffect(() => {
    const url = `http://localhost:4000/author?email=${user?.email}`;
    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        setData(data);
      })
  }, [user?.email]);

 
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        authorName: data[0]?.authorName,
        phone: data[0]?.phone,
        address: data[0]?.city,
        department: data[0]?.department,
        institutionName: data[0]?.institutionName,
        postalCode: data[0]?.postalCode,
       
      });
    }
  }, [data, form]);


  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
   
    form.validateFields().then((values) => {
      const url = `http://localhost:4000/authorData/${user?.email}`;
      const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      };
     console.log("Sending request to URL: ", url);
    console.log("Request options: ", options);
      fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
         if (data?.lastErrorObject?.updatedExisting === true) {
           toast.success("Update Data Successfully");
           setIsEditing(false);
         } else {
           toast.error("Update Data Error");
         }
        
      
    })
  })
}
  

      
  
  return (
    <div className='container-fluid'>
     <AuthorNav />
     
     <Form
      className='mt-5'
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      style={{ maxWidth: 600, margin: '0 auto' }}
    >
      <Form.Item name="authorName" label="Author Name" initialValue={defaultValues.authorName}>
        <Input disabled={!isEditing} />
      </Form.Item>
      <Form.Item name="phone" label="Phone">
        <Input disabled={!isEditing} />
      </Form.Item>
      <Form.Item name="address" label="Address">
        <Input disabled={!isEditing} />
      </Form.Item>
      <Form.Item name="department" label="Department">
        <Input disabled={!isEditing} />
      </Form.Item>
      <Form.Item name="institutionName" label="Institution Name">
        <Input disabled={!isEditing} />
      </Form.Item>
      <Form.Item name="postalCode" label="Postal Code">
        <Input disabled={!isEditing} />
      </Form.Item>
      {isEditing ? (
        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button type="primary"
            onClick={() => handleSaveClick()}
           >
            Save
          </Button>
        </Form.Item>
      ) : (
        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button type="primary" onClick={handleEditClick}>
            Edit
          </Button>
        </Form.Item>
      )}
    </Form>
    </div>
   
  );
};

export default UpdateProfile;