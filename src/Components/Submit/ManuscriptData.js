import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ManuscriptData = ({data,setData}) => {


    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevFormData) => ({ ...prevFormData, [name]: value }));
     
      };

      

    return (
        <div >
              <fieldset  className=' border border-primary p-5' >
<legend className="float-none border border-warning p-2 text-success w-auto"> Manuscript Data</legend>

<div className='p-4'>

    <label className='text-primary' htmlFor="title">Title</label>
<textarea  name="title"
   value={data.title}
   onChange={handleChange} 



 class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>


<div className='p-4'>
    <label className='text-primary' htmlFor="abstract">
Abstract (required)</label>
<textarea name="abstract" value={data.abstract} onChange={handleChange} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>
<div className='p-4'>
    <label className='text-primary' htmlFor="Keywords">Keywords</label>
    <br />
    <small className='text-danger'>keywords must be separated by semicolons. Each individual keyword may be up to 256 characters in length.</small>
    <p></p>
<textarea name="keywords" value={data.keywords} onChange={handleChange}  class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>


</fieldset>
        </div>
    );
};

export default ManuscriptData;