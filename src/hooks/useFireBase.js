import React from 'react';
import { useEffect } from 'react';
import { getAuth,GoogleAuthProvider,onAuthStateChanged,sendPasswordResetEmail,signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';
import app from '../Components/LoginInfo/firebase.config';
import { useNavigate,useLocation  } from "react-router-dom";
import useToken from './useToken';




const auth = getAuth(app )
const useFireBase = () => {
  const provider = new GoogleAuthProvider();




const [user, setUser] = useState({});
    
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  // const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
 

 
    useEffect (() => {
        onAuthStateChanged(auth, (user) => {
        
          setUser(user);
        })
      
      }, []);  
    
      const navigate = useNavigate();

    const signOutFunc=()=>{

        signOut(auth);
        localStorage.removeItem('accessToken');     
        navigate("/mainmenu");
      
    }

const handleEditorLogin=(e)=>{
    e.preventDefault();
    console.log('handleEditorLogin comming soon')
}



// Google SignIn
const handleGoogleSignIn =()=>{
  
signInWithPopup(auth, provider)
.then((result) => {
  // This gives you a Google Access Token. You can use it to access the Google API.
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  // The signed-in user info.
  const user = result.user;
  // ...
}).catch((error) => {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  // The email of the user's account used.
  const email = error.customData.email;
  // The AuthCredential type that was used.
  const credential = GoogleAuthProvider.credentialFromError(error);
  // ...
});

}

//pass reset
const handlePasswordReset=()=>{

  sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
    console.log('Password reset email sent');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log('error');

    // ..
  });

}


// email signIN section start 





  const [values, setValues] = React.useState({
    email: '',
    displayName:'',
    password: '',
    showPassword: false,
  });
  const handlePassChange = (prop) => (event) => {

    console.log(event.target.value);
    setPassword(event.target.value);

    setValues({ ...values, [prop]: event.target.value });
  };

  const handleEmailChange = (prop) => (event) => {

    setEmail(event.target.value);

    setValues({ ...values, [prop]: event.target.value });
  };



  const handleFormSubmit = event=>{ 
  
    signInWithEmailAndPassword (auth, email, password)
    .then((result) => {
    // Signed in 
    const user = result.user;
 
if(user.emailVerified===true){
  setSuccess('Login Successfully');
  navigate("/mainmenu");
}
else
  setSuccess('Please Verify Your Email!!')


    })
    .catch((error) => {
 
     const errorCode = error.code;
     const errorMessage = error.message;
   
  setError(errorCode)
  });
    
    event.preventDefault();

  }
// email signIN section end


// email redirect section

const token = useToken(user)

useEffect(() => {
  if(token){
    console.log(token)
    //navigate("/mainmenu");
  }

}, []);

//returning elements
    return {user,  
        success,
        error, 
        values,
        handlePassChange,
        handleEmailChange,   
        signOutFunc,
        handleEditorLogin,
        setValues,
        handleFormSubmit,
        handlePasswordReset,
        handleGoogleSignIn
    
    };
};

export default useFireBase;