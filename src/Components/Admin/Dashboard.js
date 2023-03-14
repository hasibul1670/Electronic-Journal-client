import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { dataContext, editorContext} from '../../App';
import AuthorNav from '../Author/AuthorNav';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';

const Dashbord = () => {
    const [fileName,fileType,fileData] = useContext(dataContext);
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
       
<br />



       <ul>
        {
            editor.map(service=>(
                <li key = {service._id}>
                  {service._id}
                </li>
            ))
        }
       </ul>

<div>
        <h2>{fileName}</h2>
        <p>{fileType}</p>
        <iframe src={fileData} title={fileName} width="100%" height="500px" />
      </div>
       



        </div>
        </div>
    );
};

export default Dashbord;