import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const currencies = [
    {
      value: 'None',
      label: 'None',
    },
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

const Selection = ({currency, setCurrency}) => {
    const handleChange = (event) => {
        setCurrency(event.target.value);
     
      };
      return (
        <div>
          <fieldset  className=' border border-primary p-5'>
<legend className="float-none border border-warning p-2 text-success w-auto"> Select Article Type</legend>

                <Box  className='ml-5'
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Select Article Type"
          value={currency}
          onChange={handleChange}
          helperText ="Choose the Article Type of your submission from the drop-down menu"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
  
      </div>

    </Box>
    </fieldset>
        </div>
    );
};

export default Selection;