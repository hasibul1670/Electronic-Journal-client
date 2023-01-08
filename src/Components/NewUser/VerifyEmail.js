import React from 'react';

const VerifyEmail = () => {
    return (
        <div className='container mt-5 p-3'>
            <h3 className=' font-weight-bold text-danger'>Verification Email is sent. Check Your Email inbox/spam box</h3>

            <a className="btn ml-3 btn-secondary rounded-pill" href="/login" role="button">Go to Login Page</a>


        </div>
    );
};

export default VerifyEmail;