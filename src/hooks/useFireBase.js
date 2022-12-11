import React from 'react';
import { useEffect } from 'react';
import { getAuth,onAuthStateChanged,sendPasswordResetEmail,signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from 'react';
import app from '../Components/LoginInfo/firebase.config';



const auth = getAuth(app )
const useFireBase = () => {




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



// email signIN section start 


  const [values, setValues] = React.useState({
    email: '',
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

  const handleFormSubmit = event=>{ 
    signInWithEmailAndPassword (auth, email, password)
    .then((result) => {
    // Signed in 
    const user = result.user;
if(user.emailVerified===true){
  setSuccess('Login Successfully');
  console.log(user.emailVerified)
  

}
else
  setSuccess('Please Verify Your Email!!')

     

    console.log(user.emailVerified)
  

    // ...
    })
    .catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;
   
  setError(errorCode)
  });
    
    event.preventDefault();

  }
// email signIN section end


    return {user,  
        success,
        error, 
        values,
        handlePassChange,
        handleEmailChange,   
        signOutFunc,
        editorSignIn,
        setValues,
        handleFormSubmit
    
    };
};

export default useFireBase;