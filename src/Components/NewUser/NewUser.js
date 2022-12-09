import React from 'react';

const NewUser = () => {
    return (
        <div   className='mt-2 p-4 bg-login w-75 mx-auto justify-content-center'>
<form >
{/* personal InfoForm Start */}


 
  <fieldset  className=' border border-primary p-5' >
<legend class="float-none border border-warning p-2 text-success w-auto">Personal Information</legend>

<div class="form-row">


{/* ssddfhs */}
  
<div class="col-md-4 mb-3">
      <label for="validationCustom01">First Name :</label>
      <input type="text" class="form-control mx-sm-3" id="validationCustom01" placeholder="First name" required/>
      <div class="valid-feedback">
        Looks good!
      </div>
    </div>

    <div class="col-md-4 mb-3">
      <label for="validationCustom01">Last Name :</label>
      <input type="text" class="form-control mx-sm-3" id="validationCustom01" placeholder="Last Name" required/>
      <div class="valid-feedback">
        Looks good!
      </div>
    </div>


    <div class="col-md-4 mb-3">
    <label for="exampleInputEmail1">Email Address : </label>
    <input type="email"  class="form-control mx-sm-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required/>
 
  </div>

  <div class="col-md-4 mb-3">
    <label for="inputPassword6">Password</label>
    <input type="password" id="inputPassword6" class="form-control mx-sm-3" aria-describedby="passwordHelpInline" placeholder="Password"  required/>
  </div>


{/* kjhdsofhisf */}


<div class="col-md-4 mb-3">

      <label for="validationServerUsername">Username</label>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroupPrepend3">@</span>
          </div>

        <input type="text" class="form-control " id="validationServerUsername" placeholder="Username" aria-describedby="inputGroupPrepend3" required/>
      
      </div>
</div>




    <div class="col-md-4 mb-3">
      <label for="validationServer01">Degree</label>
      <small>(Ph.D., M.D., etc.)</small>
      <input type="text" class="form-control" id="validationServer01" placeholder="Degree"  required/>
     
    </div>


    <div class="col-md-4 mb-3">
      <label for="validationServer02">Primary Phone Number</label>
      <input type="text" class="form-control " id="validationServer02" placeholder="Phone Number"  required/>
    </div>
 

 
    <div class="col-md-4 mb-3">
      <label for="validationServer03">City</label>
      <input type="text" class="form-control " id="validationServer03" placeholder="City" required/>
    </div>


    <div class="col-md-3 mb-3">
      <label for="validationServer05">Zip or Postal Code</label>
      <input type="text" class="form-control " id="validationServer05" placeholder="Zip" required/>
   
    </div>
    
    </div>

  </fieldset>




{/* personal infoForm end */}


{/*Institution Related Information Start */}


 

<fieldset  className=' border border-primary mt-4 p-5' >
<legend class="float-none border border-secondary p-2 text-primary w-auto">Institution Related Information</legend>

<div class="form-row">

<div class="col-md-4 mb-3">
      <label for="validationServerUsername">Position</label>
      <div class="input-group">
        <input type="text" class="form-control " id="validationServerUsername" placeholder="Position" aria-describedby="inputGroupPrepend3"/>
      
      </div>
    </div>

    <div class="col-md-4 mb-3">
      <label for="validationServer01">Institution Name </label>
      <input type="text" class="form-control" id="validationServer01" placeholder="Institution "  required/>
     
    </div>

    <div class="col-md-4 mb-3">
      <label for="validationServer02">Department</label>
      <input type="text" class="form-control " id="validationServer02" placeholder="Department"  required/>
    
    </div>
 
  </div>


  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="validationServer03">Areas of Interest or Expertise : </label>
      <select class="form-select  mx-sm-3" aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value="1">Algorithm</option>
  <option value="2">Image Processing</option>
  <option value="3">IOT</option>
  <option value="4">Web Engineering</option>
  <option value="5">Data Processing</option>

  </select>
    </div>


    <div class="form-group">
    <div class="form-check">
      <input class="form-check-input " type="checkbox" value="" id="invalidCheck3" required/>
      <label class="form-check-label" for="invalidCheck3">
        Available as a Reviewer?
      </label>
   
    </div>
  </div>

   
  </div>

  </fieldset>




{/* personal infoForm end */}


  <div class="form-group">
    <div class="form-check">
      <input class="form-check-input " type="checkbox" value="" id="invalidCheck3" required/>
      <label class="form-check-label" for="invalidCheck3">
        Agree to terms and conditions
      </label>
   
    </div>
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>



</form>

        </div>
    );
};

export default NewUser;