import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { editorContext } from '../../App';
import AuthorNav from '../Author/AuthorNav';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';

const Dashbord = () => {
    const [editor] = useContext(editorContext);
    return (
        <div>
            <AuthorNav/>

            <h2>DashBoard</h2>


            <div class="row  p-5">
  <div class="bg-secondary col-2 p-5">
    <div class="list-group">
      <Link to="/dashboard" class="text-white textDecoration font-weight-bold mb-2 ">My Submission</Link>     
      <Link to="/dashboard/published" class="text-white textDecoration font-weight-bold mb-2  ">My Published</Link>    
      <Link to="/dashboard/published" class="text-white textDecoration font-weight-bold mb-2  ">My Published</Link>    
      <Link  to="/dashboard/published" class="text-white textDecoration font-weight-bold mb-2  ">My Published</Link>    
    </div>
  </div>

  <div class="verticalline"></div>


 

  <div class="lightgray col-8 p-4">
  <Outlet/>
</div>
       

       <ul>
        {
            editor.map(service=>(
                <li key = {service._id}>{service._id}, {service.authorName}</li>
            ))
        }
       </ul>
        </div>
        </div>
    );
};

export default Dashbord;