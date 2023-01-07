import React from 'react';

const Comment = () => {
    return (
        <div className='p-4'>
               <fieldset  className=' border border-primary p-5' >
<legend className="float-none border border-warning p-2 text-success w-auto"> Enter Comments</legend>

     
<p><small className='text-danger'>Please enter any additional comments you would like to send to the publication office. These comments will not appear directly in your submission.</small></p>
        <textarea className='w-75'></textarea>

        </fieldset>
        </div>
    );
};

export default Comment;