import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
const AttachFile = ({file,setFile,url, setUrl}) => {
 
 

  const [message, setMessage] = useState('');
  const [fileUpload, setFileUpload] = useState(null);


  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileUpload(event.target.files[0]);

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post("http://localhost:4000/file", formData);

      setMessage(`File uploaded successfully. Click Next Button For the next steps.`);
      const fileUrl=response.data;
      setUrl(fileUrl)
      console.log('Hello',url);


    } catch (error) {
      console.error(error);
      setMessage('Error uploading file');
    }

    setFileUpload(null);
  };



    return (
      <div className="container-fluid!important">
     
             <fieldset style={{ width: '100%' }} className='border border-primary p-5'>

<legend className="float-none  border border-warning p-2 text-success w-auto"> Attach Files</legend>
<div className='row'>
<div class="col-md-6  ">
  <h1>Upload a File</h1>
  <form  onSubmit={handleSubmit}>
    <input type="file" accept='.docx' name="file" onChange={handleFileChange} />
<br/>
    {fileUpload &&(
    <button className='btn mt-4 btn-secondary' type="submit">Upload</button>
      )}

  </form>
  <p></p>
  <h6  className='text-primary'>{message}</h6>
</div>


<div class="col-md-6   ">

  <h4 className='text-success'>Your{url? ` Uploaded ` : ` Selected ` }File Is: &nbsp;  <span className='text-danger'>
  {file?.name}
      </span></h4>
</div>

</div>



</fieldset>
  
        </div>

     
    );
};

export default AttachFile;