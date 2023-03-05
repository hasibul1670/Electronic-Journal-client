import React from 'react';




const AttachFile = ({file,setFile}) => {

  const handleFileInput = (event) => {

    const file = event.target.files[0];
    if (file && file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {

   setFile(event.target.files[0]);
    } else {
      alert("Please select a Word file.");
    }
  };


  console.log('Hello',file);

    return (
        <div className='p-5'>
             <fieldset  className=' border border-primary p-5'>
<legend className="float-none border border-warning p-2 text-success w-auto"> Attach Files</legend>



               
               <div className="input-group mb-3">
  <label htmlFor='file' className="input-group-text">Upload a Docx File</label>

  <input    type='file' 
                        id='file' 
                        name="file"
                         accept=".docx" 
                         onChange={ handleFileInput}

  className="form-control"/>
</div>

<div>
  <h5 className='text-success'>Your Selected File Is: {file?.name}</h5>
</div>



</fieldset>
  
        </div>
    );
};

export default AttachFile;