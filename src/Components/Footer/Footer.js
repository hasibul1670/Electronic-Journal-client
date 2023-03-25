import React from 'react';
import logo from '../../logo/logo3.png';

const Footer = () => {
    return (
        <div>
  
<div class="bg-dark text-center text-white">

  <div class="container p-4">


   
    <section class="">
     
      <div class="row">

      <div class=" d-flex align-items-start flex-column col-lg-6 col-md-6 mb-6 mb-md-0">
         
 <img src={logo} style={{height:"80px",width:"150px"}} alt="" srcset="" /> 
             
    
        </div>

      
        <div class="d-flex align-items-start flex-column col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 class="text-uppercase">Resources</h5>

          <ul class="d-flex align-items-start flex-column list-unstyled mb-0">
            <li>
              <a href="#!" class="text-white">For Authors</a>
            </li>
            <li>
              <a href="/copyright" class="text-white">Copyright & Permissions</a>
            </li>
          
            <li>
              <a href="#!" class="text-white">Contact Us</a>
            </li>
          </ul>
        </div>

      

    
        <div class=" d-flex align-items-start flex-column  col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 class="text-uppercase">About Us & Help</h5>

          <ul class=" d-flex align-items-start flex-column  list-unstyled mb-0">
            <li>
              <a href="/about" class="text-white">About Us</a>
            </li>
            <li>
              <a href="/news" class="text-white">News</a>
            </li>
            <li>
              <a href="/help" class="text-white">Help</a>
            </li>
          </ul>
        </div>


      
      
      </div>
      
    </section>
  
  </div>



  <div class="text-center p-3">

    <a class="text-white" href="https://hasibul-islam365.netlify.app/">Hasibul Islam Initiative. </a><span  class="text-danger" >©2022 All Rights Reserved</span>
  </div>

</div>

        </div>
    );
};

export default Footer;