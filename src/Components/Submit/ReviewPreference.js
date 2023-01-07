import React from 'react';

const ReviewPreference = () => {
    return (
        <div className='p-4'>
                     <fieldset  className=' border border-primary p-5' >
<legend className="float-none border border-warning p-2 text-success w-auto">Review Preference</legend>
           <h4 className='text-primary'>Suggest Reviewers</h4>
           <hr></hr>
           <small className='text-danger'>Please suggest potential reviewers for this submission and provide specific reasons for your suggestion in the comments box for each person. Please note that the editorial office may not use your suggestions, but your help is appreciated and may speed up the selection of appropriate reviewers.</small>
           <br />
           <p></p>
           <button className='btn btn-primary'>
Add Suggested Reviewer</button>
</fieldset>
        </div>
    );
};

export default ReviewPreference;