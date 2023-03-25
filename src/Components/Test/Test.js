import React, { useState } from "react";
import { Steps, Form, Input, Button } from "antd";
import {
  CheckCircleFilled,
  LoginOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

function Test() {
  const [current, setCurrent] = useState(0);
  const [loginDetails, setLoginDetails] = useState(null);
  const [profileDetails, setProfileDetails] = useState(null);

  const onFinishedLoginForm = (values) => {
    setLoginDetails(values);
    setCurrent(1);
  };
  const onFinishedProfileForm = (values) => {
    setProfileDetails(values);
    setCurrent(2);

  };

  
  const handleBack = () => {
    setCurrent(current - 1);
    console.log('Hello',current);
  };
  const froms = [
    <LoginForm onFinish={onFinishedLoginForm} initialValues={loginDetails} />,
    <ProfileForm
      onFinish={onFinishedProfileForm}
      handleBack={handleBack}
      initialValues={profileDetails}
    />,
    <Finish     handleBack={handleBack}  />,
  ];

  const isStepDisable = (stepNumber) => {
    if (stepNumber === 0) {
      return false;
    }
    if (stepNumber === 1) {
      return loginDetails === null;
    }
    if (stepNumber === 2) {
      return loginDetails === null || profileDetails === null;
    }
  };

  return (
    <div className="App">
      <h2>Hello form</h2>
      <Steps
        style={{ padding: "32px 16px" }}
        onChange={setCurrent}
        current={current}
      >
        <Steps.Step
          disabled={isStepDisable(0)}
          title="Login"
          icon={<LoginOutlined />}
        />
        <Steps.Step
          disabled={isStepDisable(1)}
          title="Profile"
          icon={<ProfileOutlined />}
        />
        <Steps.Step
          disabled={isStepDisable(2)}
          title="Finished"
          icon={<CheckCircleFilled />}
        />
      </Steps>
      {froms[current]}
    </div>
  );
}
function LoginForm({ onFinish, initialValues }) {
  return (
    <Form
      onFinish={onFinish}
      initialValues={initialValues}
      className=" container align-items-center w-25"
    >
      <Form.Item
        label="Email"
        name={"email"}
        rules={[
          {
            required: true,
            type: "email",
            message: "Please Enter Your Email Adress",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name={"password"}
        rules={[
          {
            required: true,

            message: "Please Enter Your Password Adress",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Continue
      </Button>
    </Form>
  );
}
function ProfileForm({ onFinish, handleBack, initialValues }) {
  return (
    <Form
  
      onFinish={onFinish}
      initialValues={initialValues}
 

      className=" container align-items-center w-25"
    >
      <Form.Item
        label="First Name"
        name={"Last Name"}
        rules={[
          {
            required: true,

            message: "Please Enter Your First Name",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last NAme"
        name={"lastName"}
        rules={[
          {
            required: true,

            message: "Please Enter Your Last Name",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Button onClick={handleBack()} type="primary">
        Back
      </Button>
      <Button type="primary" htmlType="submit">
        Continue
      </Button>
    </Form>
  );
}
function Finish({handleBack}) {
  return (
    <>
      <h1>You are all set</h1>
      <Button onClick={handleBack} type="primary" >
        Back
      </Button>
      <Button type="primary">Submit</Button>
    </>
  );
}

export default Test;
