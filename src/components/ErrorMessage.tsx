import React from "react";

interface ErrorMessageProps {
  message?: string;
  retry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message = "Failed to load data", 
  retry 
}) => {
  return (
    <div className="error-message-container">
      <div className="error-icon">!</div>
      <h3>Error occurred</h3>
      <p>{message}</p>
      {retry && (
        <button 
          className="retry-button"
          onClick={retry}
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;