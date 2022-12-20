import React from 'react';
import { useEffect, useState } from "react";

const useEditor = (user) => {
  
     const [token, setToken] = useState(''); 

     useEffect(() => {
        const email = user?.user?.email;
        const currentUser = {email:email};  
        if(email){
            fetch(`http://localhost:4000/editor/${email}`,{
                method:'PUT',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(currentUser)

            })
            .then(res =>res.json()) 
            .then(data=>{
                console.log('data use tokn',data)
                const accessToken=data.token;
                localStorage.setItem('accessToken',accessToken);
                setToken(accessToken);
            })
      
        }
     }, [user]);



     const handleEditorLogin=(e)=>{
        e.preventDefault();
        
        
    }
    

    

    return {
        handleEditorLogin,
      
    
    };


};

export default useEditor;