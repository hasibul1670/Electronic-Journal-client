import React from 'react';

const Comment = ({comment,setComment}) => {

    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setComment((prevFormData) => ({ ...prevFormData, [name]: value }));
     console.log('Hello,',comment);
      };


    return (
        <div className='p-4'>
               <fieldset  className=' border border-primary p-5' >
<legend className="float-none border border-warning p-2 text-success w-auto"> Enter Comments</legend>

     
<h6 className='text-danger'>Please enter any additional comments you would like to send to the publication office. These comments will not appear directly in your submission.</h6>
        <textarea className='w-75'
    name="comment" value={comment.comment} onChange={handleChange} 
        ></textarea>

        </fieldset>
        </div>
    );
};

export default Comment;