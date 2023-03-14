import * as React from 'react';
  import Box from '@mui/material/Box';
    import Selection from './Selection.js'
    import Stepper from '@mui/material/Stepper';
    import Step from '@mui/material/Step';
    import StepLabel from '@mui/material/StepLabel';
import AttachFile from './AttachFile';
import ReviewPreference from './ReviewPreference.js';
import Comment from './Comment.js';

import ManuscriptData from './ManuscriptData.js';
import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
   





  const steps = [
    'Article Type Selection',
    'Manuscript Data',
    'Attach Files',
    'Comments',
    'Review Preferences',

  ];

 

    
    export default function HorizontalLinearStepper() {
      var [selectedOption, setSelectedOption] =useState('');
      var [reviewer,setReviewer] = useState([]);
      var [comment,setComment] =useState('');
      const [url, setUrl] = useState(null);

      var [data,setData] =useState({
       title: '',
        abstract: '',
        keywords: '',
      });
      const [file,setFile] = useState(null);
     

      const [activeStep, setActiveStep] =useState(0);
      const [skipped, setSkipped] =useState(new Set());


let command;
if (activeStep===0) {
  command= 
  <Selection selectedOption={selectedOption}

  setSelectedOption={setSelectedOption}            
></Selection>
  
}
 else if(activeStep===1){

  command=<ManuscriptData
 data={data} setData={setData}
  ></ManuscriptData>
  
}
 else if(activeStep===2){

  command=<AttachFile  
  file={file} setFile={setFile}
url={url} setUrl={setUrl}
  ></AttachFile>
  
}

else if(activeStep===3){
  command=<Comment
  comment={comment} setComment={setComment}
  ></Comment>
  
}

else if(activeStep===4){
 
  command=<ReviewPreference
 reviewer={reviewer} setReviewer={setReviewer}
  ></ReviewPreference>
  
}


      const isStepOptional = (step) => {
        return step === 1;
      };
    
      const isStepSkipped = (step) => {
        return skipped.has(step);
      };
      const isSelectionValid = selectedOption;
      const handleNext = (e) => {
      
        e.preventDefault();

        let newSkipped = skipped;

        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }
    
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped)
        
if(activeStep === steps.length - 1){
  onSubmit();
  navigate("/SuccessSubmission");

}
      };


      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
    
 
      const navigate = useNavigate();
      let location = useLocation();
      let from = location.state?.from?.pathname || "/";



      const onSubmit =async () =>{


      
    
console.log('Hello rev',reviewer[0]);
      
      const formData = new FormData();
    
   
      formData.append('articleType', selectedOption);
      formData.append('title', data.title);
      formData.append('abstract', data.abstract);
      formData.append('keyword', data.keywords);
      formData.append('url', url);
      formData.append('fileName', file?.name);
      formData.append('comment', comment.comment);
      formData.append('reviewer[0]',reviewer);




      try {
        const response = await axios.post('http://localhost:4000/submittedData', formData, {
          method:'POST',
          headers:{
            'content-type':'application/json'
          },
        });
  
        console.log(response.data);
        console.log(' data submitted succcessfiully');
      
      } catch (error) {
        console.error(error);
      }



      } 
    
    



      return (
        <Box className='p-5' sx={{ width: '100%' }}>
          <Stepper alternativeLabel activeStep={activeStep}>
            
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                        
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;               
              }

              return (
                <Step key={label} {...stepProps}>

              <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
             
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />

        
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
   
<p className='mb-4'></p>
   {command}

              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <button
                type="button" className="btn btn-primary btn-lg "
           
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </button>
                <Box sx={{ flex: '1 1 auto' }} />
  
      <button type="button" className="btn btn-primary btn-lg " 
      disabled={!isSelectionValid}

      onClick={handleNext}>

                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
               
                  </button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      );
    }