import React from 'react';
import './ErrorState.css';

const ErrorState = ({ 
  message = 'Something went wrong', 
  onRetry = () => window.location.reload() 
}) => {
  return (
    <div className="error-container">
      <h2>Error</h2>
      <p>{message}</p>
      <button className="refresh-btn" onClick={onRetry}>
        Try Again
      </button>
    </div>
  );
};

export default ErrorState;