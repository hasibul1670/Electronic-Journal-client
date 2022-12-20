import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashbord = () => {

    const [services,setServices] = useState([]);
    
   
useEffect(() => {
    axios
    .get('http://localhost:4000/user')
    .then(res => {

        console.log(res)
        setServices(res.data)
      })
    .catch(err=>{
        console.log(err)
    })
  }, [])
console.log(services.length)    

    return (
        <div>
       <h1>hello dashbord: {services.length}</h1>
       <ul>
        {
            services.map(service=>(
                <li key = {service._id}> {service.email}</li>
            ))
        }
       </ul>
        </div>
    );
};

export default Dashbord;