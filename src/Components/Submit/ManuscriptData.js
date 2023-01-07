import React from 'react';

const ManuscriptData = () => {
    return (
        <div >
              <fieldset  className=' border border-primary p-5' >
<legend className="float-none border border-warning p-2 text-success w-auto"> Manuscript Data</legend>

<div className='p-4'>
    <label className='text-primary' htmlFor="title">Title</label>
<textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>
<div className='p-4'>
    <label className='text-primary' htmlFor="abstract">
Abstract (required)</label>
<textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>
<div className='p-4'>
    <label className='text-primary' htmlFor="Keywords">Keywords</label>
    <br />
    <small className='text-warning'>keywords must be separated by semicolons. Each individual keyword may be up to 256 characters in length.</small>
    <p></p>
<textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>


</fieldset>
        </div>
    );
};

export default ManuscriptData;