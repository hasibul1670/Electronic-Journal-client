import React from 'react';
import Navbar from '../Shared/Navbar'
import ShowPassword from './ShowPassword';
import LoginNav from './LoginNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from './../../logo/home.jpg';
import { Link, useHistory } from 'react-router-dom';


  
const Login = () => {


  let history = useHistory();

  function handleClick() {
    history.push("/author");
  }
    return (
        <div >
            <LoginNav></LoginNav>
            <br />
            <div className='w-50 p-4  bg-login d-flex justify-content-center mx-auto mb-1'>
            <img  style={{height:"225px",width:"165px"}}src={logo}alt="" srcset=""/>
         
            <div className=' p-5'>
            <h1 class="text-lime-600 ">Login</h1>
            <hr />
            <h5>International Journal of Computer and Electronics Engineering</h5>
            <h6 className='text-danger'>Please Enter the Following</h6>
            </div>
            </div>
   <form className='w-50 border p-4 mx-auto bg-login'>

  <div class="form-group w-50 ">

    <ShowPassword></ShowPassword>
    
  </div>
  



  <button onClick={handleClick} type="submit" class="btn mt-2 mr-5 btn-primary rounded-pill">Author Login</button> 
  <button type="submit" class="btn mt-2  mr-5 btn-primary rounded-pill"> Editor Login</button>
  <button type="submit" class="btn mt-2 mr-5 btn-primary rounded-pill">Reviewer Login</button>

</form>



<div class="mx-auto bg-login  p-4 w-50">
<hr />
<h4>For Authors: Why choose Gold Open Access?</h4>
<p>- You will retain copyright of your article (with some exceptions) <br />

- Your article publication process will be fast-tracked <br />

- Your article will also <br />

*be freely distributed and reused under Creative Commons Attribution license terms (CC BY) or related licenses<br />

*be made fully accessible immediately and perpetually upon publication <br />

*see increased article visibility and discoverability<br />

*receive more downloads – and may mean more opportunities for citations<br />

*comply with major open access mandates<br />

*Article processing charges (APC) and any payment invoice will apply ONLY AFTER your paper has been accepted. If in doubt, please contact openaccess@wspc.com.

<p></p>

<p class="text-danger">If you are accessing the system for the first time as an Editor, please click on the Instructions button to go through a concise user guide before you proceed.

</p>
</p>

</div>

        </div>
    );
};

export default Login;