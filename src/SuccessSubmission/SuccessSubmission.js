
import React, { useState, useEffect } from 'react';
import './SuccessSubmission.css';
const SuccessSubmission = () => {

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
    return (
      <div className={`submission-success-container ${isVisible ? 'visible' : ''}`}>
      <div className="submission-success-card">
        <h1 className="submission-success-heading">Your submission was successful!</h1>
        <h5 className="submission-success-message">Thank you for submitting your Paper</h5>
        
      <a href="/dashboard" class="btn btn-primary">Go To Your Dashboard </a>

      </div>


    </div>
    );
};

export default SuccessSubmission;