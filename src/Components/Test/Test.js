import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Test = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const imageHostKey = process.env.REACT_APP_imgbb_key;
  const [imageUrl, setImageUrl] = useState(null);


  const uploadImage = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedFile);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
  
    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(iData => {
      console.log(iData.data.display_url);
      setImageUrl(iData.data.url);
    })
  }

  return (
    <div>
      <form className="form-control w-full max-w-xs">
        <label className="label"> <span className="label-text">Photo</span></label>
        <input
          type="file"
          {...register("image", {
            required: "Photo is Required"
          })}
          className="input input-bordered w-full max-w-xs"
          onChange={uploadImage}
        />
        {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
      </form>
      <input onClick={handleSubmit(uploadImage)} className='btn btn-accent w-full mt-4' value="Add Doctor" type="submit" />
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
};

export default Test;
