import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import * as React from "react";
import AttachFile from "./AttachFile";
import Comment from "./Comment.js";
import ReviewPreference from "./ReviewPreference.js";
import Selection from "./Selection.js";

import axios from "axios";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import app from "../LoginInfo/firebase.config";
import ManuscriptData from "./ManuscriptData.js";
import PreviewAll from "./PreviewAll.js";
const auth = getAuth(app);

const steps = [
  "Article Type Selection",
  "Manuscript Data",
  "Attach Files",
  "Comments",
  "Review Preferences",
  "Preview Whole Submission",
];

export default function HorizontalLinearStepper() {
  var [selectedOption, setSelectedOption] = useState("");
  const [submittedData, setSubmittedData] = useState([]);
  var [comment, setComment] = useState("");
  const [url, setUrl] = useState(null);

  var [data, setData] = useState({
    title: "",
    abstract: "",
    keywords: "",
  });
  const [file, setFile] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const dataCheck = data.title && data.keywords && data.abstract;

  const isDisabled = () => {
    switch (activeStep) {
      case 0:
        return !selectedOption;
      case 1:
        return !dataCheck;
      case 2:
        return !url;
      case 3:
        return !comment;
      case 4:
        return submittedData.length === 0;

      default:
        return true;
    }
  };

  const handleNext = (e) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    if (activeStep === steps.length - 1) {
      onSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("articleType", selectedOption);
    formData.append("email", user.email);
    formData.append("title", data.title);
    formData.append("abstract", data.abstract);
    formData.append("keyword", data.keywords);
    formData.append("url", url);
    formData.append("fileName", file?.name);
    formData.append("comment", comment.comment);
    for (let i = 0; i < submittedData.length; i++) {
      formData.append("reviewer[]", JSON.stringify(submittedData[i]));
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/submittedData",
        formData,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      console.log(response.data);
      toast.success("data submitted succcessfully");
      console.log(" data submitted succcessfully");
      navigate("/SuccessSubmission");
    
    } catch (error) {
      console.error(error);
      toast.error("something went wrong!! Please try again");
    }
  };

  return (
    <div>
      <Box className="p-5" sx={{ width: "100%" }}>
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
            </Box>
          </>
        ) : (
          <>
            {activeStep === 0 && (
              <div>
                <Selection
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                ></Selection>
              </div>
            )}

            {activeStep === 1 && (
              <div>
                <ManuscriptData data={data} setData={setData}></ManuscriptData>
              </div>
            )}

            {activeStep === 2 && (
              <div>
                <AttachFile
                  file={file}
                  setFile={setFile}
                  url={url}
                  setUrl={setUrl}
                ></AttachFile>
              </div>
            )}
            {activeStep === 3 && (
              <div>
                <Comment comment={comment} setComment={setComment}></Comment>;
              </div>
            )}
            {activeStep === 4 && (
              <div>
                <ReviewPreference
                  submittedData={submittedData}
                  setSubmittedData={setSubmittedData}

                ></ReviewPreference>
              </div>
            )}
            {activeStep === 5 && (
              <div>
                <PreviewAll
                  selectedOption={selectedOption}
                  data={data}
                  setData={setData}
                 setComment ={setComment}
                  setFile={setFile}
                  file={file}
                  comment={comment}
                  url={url}
                  setUrl={setUrl}
                  submittedData={submittedData}
                  setSubmittedData={setSubmittedData}


                ></PreviewAll>
              </div>
            )}

            <p className="mb-4"></p>

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <button
                className="btn btn-primary btn-lg "
                onClick={() => handleBack()}
                disabled={activeStep === 0}
                sx={{ mr: 1 }}
              >
                Previous
              </button>

              <Box sx={{ flex: "1 1 auto" }} />

              {activeStep < 5 && (
                <button
                  className="btn btn-primary btn-lg "
                  id="myBtn"
                  onClick={() => handleNext()}
                  disabled={isDisabled()}
                >
                  Next
                </button>
              )}

              {activeStep === 5 && (
                <button
                  className="btn btn-primary btn-lg "
                  id="myBtn"
                  onClick={() => onSubmit()}
                >
                  Submit
                </button>
              )}
            </Box>
          </>
        )}
      </Box>
      <Toaster/>
    </div>
  );
}
