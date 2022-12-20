import { async } from '@firebase/util';
import React from 'react';
import { useContext } from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router';
import { editorContext } from '../App';
import { signInWithEmailAndPassword } from 'firebase/auth';


const useEditor = (user) => {

    const [editor,setEditor] = useContext(editorContext);
    const navigate = useNavigate();
    const [editorSuccess, setEditorSuccess] = useState('');

     
useEffect(() => {
    axios
    .get('http://localhost:4000/editor')
    .then(res => {
        setEditor(res.data)
      })
    .catch(err=>{
       
    })
  }, []) 

     const handleEditorLogin=(e)=>{
     
        e.preventDefault();
        editor.map(service=>{ 
            console.log(service.email)
                if(service.email=="Sherwood@rosamond.me"||"Rey.Padberg@karina.biz"||"Sincere@april.biz"){ 
                   // navigate("/editor");
                }
                else{
                    setEditorSuccess('Sorry!!You are not an Editor!!!')   
                    console.log("not matvh");   
                }
             
            }) 


        }

        // const handleFormSubmit = event=>{ 
        //     signInWithEmailAndPassword(auth, email, password)
        //     .then((result) => {
        //     // Signed in 
        //     const user = result.user;
         
        // if(user.emailVerified===true){
        //   setSuccess('Login Successfully');
        //   navigate("/mainmenu");
        // }
        // else
        //   setSuccess('Please Verify Your Email!!')
        
        
        //     })
        //     .catch((error) => {
         
        //      const errorCode = error.code;
        //      const errorMessage = error.message;
           
        //   setError(errorCode)
        //   });
            
        //     event.preventDefault();
        
        //   }
        
        
    


    return {
        handleEditorLogin,
        editorSuccess,

       

      
    
    };


};

export default useEditor;