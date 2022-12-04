import * as React from 'react';
  import Box from '@mui/material/Box';
    import Selection from './Selection'
    import Stepper from '@mui/material/Stepper';
    import Step from '@mui/material/Step';
    import StepLabel from '@mui/material/StepLabel';


    import Button from '@mui/material/Button';
import AttachFile from './AttachFile';

   
  const steps = [
    'Article Type Selection',
    'Attach Files',
    'Review Preferences',
    'Comments',
    'Manuscript Data',

  ];


    
    export default function HorizontalLinearStepper() {
      const [activeStep, setActiveStep] = React.useState(0);
      const [skipped, setSkipped] = React.useState(new Set());



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
        formContent ();

      };

      const formContent = (steps) => {
        switch(steps) {
          case 0:
            return <AttachFile  />;
          // case 1:
          //   return <PersonalInfo  />;
          // case 2:
          //   return <ReviewInfo  />;
          default:
            return <div>404: Not Found</div>
        }
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

 
    var [currency, setCurrency] = React.useState("None");


      return (
        <Box className='p-5' sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep}>
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
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}


              
             <Selection currency={currency}
              setCurrency={setCurrency}            
            ></Selection>
            <AttachFile></AttachFile>
           
   

   <h1>hello from:{currency}</h1>

              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <button
                type="button" class="btn btn-primary btn-lg "
           
                  disabled={activeStep === 0}
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
    



  
      <button type="button" class="btn btn-primary btn-lg " 
      disabled={currency==="None"}
      onClick={handleNext}>

  

                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
               
                  </button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      );
    }