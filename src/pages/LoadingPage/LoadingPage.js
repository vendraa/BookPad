import React, { useEffect } from 'react';
import './LoadingPage.css';

const LoadingPage = ({ navigateToLanding }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigateToLanding();
    }, 3000); 
    return () => clearTimeout(timer);
  }, [navigateToLanding]);

  return (
    <div className="loading-container">
      <div className="loading-logo-container">
        <img src="/assets/BookPad_Logo.png" alt="BookPad Logo" className="loading-logo" />
      </div>
    </div>
  );
};

export default LoadingPage;
