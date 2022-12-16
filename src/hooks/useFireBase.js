import React from 'react';
import { useEffect } from 'react';
import { getAuth,GoogleAuthProvider,onAuthStateChanged,sendPasswordResetEmail,signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';
import app from '../Components/LoginInfo/firebase.config';
import { useNavigate,useLocation  } from "react-router-dom";



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
    


    const signOutFunc=()=>{

        signOut(auth)
        .then(() => {
            console.log("Sign-out successful.");
            
          })
        .catch((error) => {
            // An error happened.
        });

    }

const editorSignIn=(e)=>{
    e.preventDefault();
    console.log('editorSignIn comming soon')
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
    setPassword(event.target.value)

    setValues({ ...values, [prop]: event.target.value });
  };

  const handleEmailChange = (prop) => (event) => {

    setEmail(event.target.value)

    setValues({ ...values, [prop]: event.target.value });
  };

  let location = useLocation();
  const navigate = useNavigate();
  let { from } = location?.state?.from?.pathname ||"/";

  const handleFormSubmit = event=>{ 
    signInWithEmailAndPassword (auth, email, password)
    .then((result) => {
      navigate("/mainmenu");
    // Signed in 
    const user = result.user;
if(user.emailVerified===true){
  setSuccess('Login Successfully');



  

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


//returning elements
    return {user,  
        success,
        error, 
        values,
        handlePassChange,
        handleEmailChange,   
        signOutFunc,
        editorSignIn,
        setValues,
        handleFormSubmit,
        handlePasswordReset,
        handleGoogleSignIn
    
    };
};

export default useFireBase;