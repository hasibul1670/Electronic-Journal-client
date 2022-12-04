import React from 'react';



const AttachFile = ({file,setFile}) => {
    const handleChange = (event) => {
        setFile(event.target.value);
     
      };
 

    return (
        <div className='p-5'>
               
               <div class="input-group mb-3">
  <label class="input-group-text" for="inputGroupFile01">Upload</label>
  <input    onChange={handleChange} type="file" class="form-control" id="inputGroupFile01"/>
</div>





        
  
        </div>
    );
};

export default AttachFile;