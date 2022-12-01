import React from 'react';
import AuthorNav from './AuthorNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faArrowRight} from '@fortawesome/free-solid-svg-icons'

const Submit = () => {
    return (
        <div>
            <AuthorNav></AuthorNav>
          

            <div class="w-50 mt-5 mx-auto card mb-3" >
  <div class="row no-gutters">
    <div class="p-3 text-primary col-md-4">
<h6>Choose the Article Type of your submission from the drop-down menu.</h6>
    </div>
    <div class="w-75 p-2 col-md-8">
<h6>Select Article Type</h6>
    <div class=" mx-auto mt-5 input-group mb-3">
  <select class="custom-select" id="inputGroupSelect02">
    <option selected>Choose...</option>
    <option value="ReSearch Paper">ReSearch Paper</option>
    <option value="Review Paper">Review Paper</option>
    <option value="3">Special Issue</option>
  </select>
  <div class="input-group-append">
    <label class="input-group-text" for="inputGroupSelect02">Proceed
    <FontAwesomeIcon icon={faArrowRight}/>
    </label>
  </div>
</div>



    </div>
  </div>
</div>


          
      






        </div>
    );
};

export default Submit;