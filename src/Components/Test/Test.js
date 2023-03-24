import React, { useState } from 'react';

function Test() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // your form data
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // handle form submission
  };

  const isDisabled = () => {
    switch (step) {
      case 1:
        return !formData.firstName;
      case 2:
        return !formData.lastName;
      case 3:
        return !formData.email;
      case 4:
        return !formData.password;
      case 5:
        return !formData.confirmPassword;
      default:
        return true;
    }
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
        </div>
      )}




      {step === 2 && (
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
        </div>
      )}

      {step === 3 && (
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      )}

      {step === 4 && (
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
      )}

      {step === 5 && (
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
        </div>
      )}

      <button onClick={handlePrev} disabled={step === 1}>
        Previous
      </button>

      {step < 5 && (
        <button onClick={handleNext} disabled={isDisabled()}>
          Next
        </button>
      )}

      {step === 5 && (
        <button onClick={handleSubmit} disabled={isDisabled()}>
          Submit
        </button>
      )}

      
    </div>
  );
}
export default Test;