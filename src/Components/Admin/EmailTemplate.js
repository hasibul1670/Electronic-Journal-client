import React, { useState } from 'react';

const EmailTemplate = ({ isOpen, onClose, onSend }) => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendClick = () => {
    onSend(email);
    setEmail('');
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'is-open' : ''}`}>
      <div className="modal-content">
        <h2>Send Email</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            placeholder="Write your message..."
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="button-group">
          <button className="send-button" onClick={handleSendClick}>
            Send
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplate;
