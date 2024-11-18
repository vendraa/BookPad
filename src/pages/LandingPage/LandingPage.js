import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register1');
  };

  const handleLogin = () => {
    navigate('/login');
  }

  return (
    <div className="landing-page">
      <div className='landing-container'>
      <div className="landing-logo-container">
        <img src="assets/BookPad_Logo.png" alt="BookPad Logo" className="landing-logo" />
      </div>
      <h2 className="welcome-message">Hai, Selamat Datang di BookPad!!!</h2>
      <p className="description">Temukan Dunia Buku Tanpa Batas dan Koleksi Daftar Bacaanmu</p>
      </div>
      <div className="button-container">
        <button type="button" className="register-button" onClick={handleRegister}> REGISTER </button>
        <button type="button" className="login-button" onClick={handleLogin}> LOGIN</button>
      </div>
    </div>
  );
};

export default LandingPage;