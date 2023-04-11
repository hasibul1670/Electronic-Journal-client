import React from 'react';
import { useContext } from 'react';
import  { authorContext } from '../../contexts/AuthorContext';

const Test = () => {

  const {user} =useContext(authorContext);

 
  return (
    <div>
      <h2>hello</h2>
    </div>
  );
};

export default Test;