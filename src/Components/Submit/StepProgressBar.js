import * as React from "react";
import Box from "@mui/material/Box";
import Selection from "./Selection.js";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import AttachFile from "./AttachFile";
import ReviewPreference from "./ReviewPreference.js";
import Comment from "./Comment.js";

import ManuscriptData from "./ManuscriptData.js";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getAuth, signOut } from "firebase/auth";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import app from "../LoginInfo/firebase.config";
import { DisabledByDefault } from "@mui/icons-material";
const auth = getAuth(app);

const steps = [
  "Article Type Selection",
  "Manuscript Data",
  "Attach Files",
  "Comments",
  "Review Preferences",
];

export default function HorizontalLinearStepper() {
  var [selectedOption, setSelectedOption] = useState("");
 const [selectedReviewer, setSelectedReviewer] = useState([]);
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
        return selectedReviewer.length === 0;
      default:
        return true;
    }
  };

  const handleNext = (e) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    if (activeStep === steps.length - 1) {
      onSubmit();
      navigate("/SuccessSubmission");
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
    for (let i = 0; i < selectedReviewer.length; i++) {
      formData.append("reviewer[]", JSON.stringify(selectedReviewer[i]?.name));
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
      console.log(" data submitted succcessfiully");
    } catch (error) {
      console.error(error);
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
                <ManuscriptData data={data} setData={setData}></ManuscriptData>;
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
                  selectedReviewer={selectedReviewer}
                  setSelectedReviewer={setSelectedReviewer}
                ></ReviewPreference>
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
                <button onClick={() => onSubmit()} disabled={isDisabled()}>
                  Submit
                </button>
              )}
            </Box>
          </>
        )}
      </Box>
    </div>
  );
}
