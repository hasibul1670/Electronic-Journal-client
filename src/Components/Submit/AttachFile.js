import React from 'react';



const AttachFile = ({file,setFile}) => {
    const handleChange = (event) => {
        setFile(event.target.value);
     
      };
 

    return (
        <div className='p-5'>
             <fieldset  className=' border border-primary p-5'>
<legend className="float-none border border-warning p-2 text-success w-auto"> Attach Files</legend>



               
               <div className="input-group mb-3">
  <label className="input-group-text" for="inputGroupFile01">Upload</label>
  <input    onChange={handleChange} type="file" className="form-control" id="inputGroupFile01"/>
</div>





</fieldset>
  
        </div>
    );
};

export default AttachFile;