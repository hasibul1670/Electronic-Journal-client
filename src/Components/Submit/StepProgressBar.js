import * as React from 'react';
  import Box from '@mui/material/Box';
    import Selection from './Selection.js'
    import Stepper from '@mui/material/Stepper';
    import Step from '@mui/material/Step';
    import StepLabel from '@mui/material/StepLabel';


    import Button from '@mui/material/Button';
import AttachFile from './AttachFile';
import ReviewPreference from './ReviewPreference.js';
import Comment from './Comment.js';
import ManuscriptData from './ManuscriptData.js';

   
  const steps = [
    'Article Type Selection',
    'Attach Files',
    'Review Preferences',
    'Comments',
    'Manuscript Data',

  ];


    
    export default function HorizontalLinearStepper() {
      var [currency, setCurrency] = React.useState("None");
      var [file,setFile] = React.useState();
      const [activeStep, setActiveStep] = React.useState(0);
      const [skipped, setSkipped] = React.useState(new Set());


let command;
if (activeStep===0) {
  command= <Selection currency={currency}
  setCurrency={setCurrency}            
></Selection>
  
} else if(activeStep===1){
  command=<AttachFile  
  file={file} setFile={setFile}
  
  ></AttachFile>
 
  
}
 else if(activeStep===2){
  command=<ReviewPreference></ReviewPreference>
 
  
}

else if(activeStep===3){
  command=<Comment></Comment>
 
  
}

else if(activeStep===4){
  command=<ManuscriptData></ManuscriptData>
 
  
}



      const isStepOptional = (step) => {
        return step === 1;
      };
    
      const isStepSkipped = (step) => {
        return skipped.has(step);
      };
    
      const handleNext = (e) => {
        e.preventDefault();
       
        let newSkipped = skipped;
        

        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }
    
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped)
        

      };

 

 
    

 
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      // const handleSkip = () => {
      //   if (!isStepOptional(activeStep)) {
      //     // You probably want to guard against something like this,
      //     // it should never occur unless someone's actively trying to break something.
      //     throw new Error("You can't skip a step that isn't optional.");
      //   }
    
      //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
      //   setSkipped((prevSkipped) => {
      //     const newSkipped = new Set(prevSkipped.values());
      //     newSkipped.add(activeStep);
      //     return newSkipped;
      //   });
      // };
    
      const handleReset = () => {
        setActiveStep(0);
      };

 
 


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

{/* 
if (index=0) {
  
  <Selection currency={currency}
  setCurrency={setCurrency}            
></Selection>
  
} */}

         

          
          {activeStep === steps.length ? (
            <React.Fragment>
             
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />

                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}


              
       
{/* 

        <AttachFile></AttachFile> */}
      

   <h1>01:{currency}</h1>
   <h1>02:{file}</h1>
   
   <h1>step no:{activeStep}</h1>
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
                {/* {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )} */}
    



  
      <button type="button" className="btn btn-primary btn-lg " 
    
      onClick={handleNext}>

  

                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
               
                  </button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      );
    }