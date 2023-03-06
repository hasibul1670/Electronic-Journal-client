import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const currencies = [
    {
      value: 'Research Paper',
      label: 'Research Paper',
    },
    {
      value: 'Review Paper',
      label: 'Review Paper',
    },
    {
      value: 'Special Issue',
      label: 'Special Issue',
    },
]

const Selection = ({selectedOption, setSelectedOption}) => {
  
 let handleChange = (event) => {
      setSelectedOption(event.target.value);

        console.log("hello",selectedOption);
     
      };
      return (
        <div>
          <fieldset  className=' border border-primary p-5'>
<legend className="float-none border border-warning p-2 text-success w-auto"> Select Article Type</legend>

  
<div className="container mt-4">
<div className="form-group">
<label className='font-weight-bold' htmlFor="dropdown">Select Article Type:</label>
      <select className='border font-weight-bold w-75 border-secondary form-control' id="dropdown" value={selectedOption} onChange={handleChange}>
        <option value="Research Paper">Research Paper</option>
        <option value="Review Paper">Review Paper</option>
        <option value="Special Issue">Special Issue</option>
      </select>
  </div>
  
      <h5 className='text-success mt-2'>You selected:  &nbsp;
      <span className='text-danger'>
      { selectedOption}
      </span>
 
       </h5>
    </div>
    </fieldset>
        </div>
    );
};

export default Selection;