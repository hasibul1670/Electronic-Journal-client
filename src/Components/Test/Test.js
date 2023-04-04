import React from 'react';
import { useContext } from 'react';
import  { authorContext } from '../../contexts/AuthorContext';

const Test = () => {

  const {user} =useContext(authorContext);

 
  return (
    <div>
      
    </div>
  );
};

export default Test;