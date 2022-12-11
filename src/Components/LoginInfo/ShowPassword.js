import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { getAuth,onAuthStateChanged,sendPasswordResetEmail,signInWithEmailAndPassword } from "firebase/auth";
import app from '../LoginInfo/firebase.config';
import useFireBase from '../../hooks/useFireBase';




const auth = getAuth(app )


export default function InputAdornments() {



  const {editorSignIn}=useFireBase();
  const {handleFormSubmit,success,error,
  setValues,
  values,
  handleEmailChange,
  handlePassChange
  
  
  
  }=useFireBase();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [username, setUsername] = useState('');

  // useEffect (() => {
  //   onAuthStateChanged(auth, (user) => {
    
  //     setUser(user);
  //   })
  
  // }, []);  





  

   
  const handlePasswordReset=()=>{

    sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      // ..
    });

  }



  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div  className='w-75'>
     
        {/* Email */}
        <form   >
        
        <FormControl  fullWidth sx={{ m: 1 }}>
          <InputLabel  htmlFor="outlined-adornment-amount">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={values.email}
            onChange={handleEmailChange('email')}
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            label="email"
          />
        </FormControl>

{/* Password  */}
        <FormControl  fullWidth  sx={{ m:1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handlePassChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"

            
          />
        </FormControl>
        {success ? <h5 className='text-success'>{success}</h5>:

        <h5 className='text-danger'>{error}</h5>}
        
<div className="d-flex w-75"> 

 <button onClick={ handleFormSubmit} type="submit" class="btn  btn-primary rounded-pill">Author Login</button>

  <button onClick={editorSignIn} type="submit" class="btn ml-2  btn-primary rounded-pill"> Editor Login</button>
  <button type="submit" class="btn ml-2 btn-primary rounded-pill">Reviewer Login</button> 
  </div>
  </form>
<p></p>
  <a class="btn  btn-secondary rounded-pill" href="/newuser" role="button">Register</a>
  <a onClick={handlePasswordReset} class="btn ml-3 btn-secondary rounded-pill" href="/forgetPass" role="button">Forget Password</a>


      </div>

    </Box>
  );
}