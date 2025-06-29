import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p className="text-white">Loading wallet data...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;