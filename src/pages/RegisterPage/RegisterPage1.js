import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage1() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!email || !password || !confirmPassword) {
      setError('Masukkan Email atau Password Kamu Yaa!');
      return;
    }
    if (password !== confirmPassword) {
      setError('Password dan Konfirmasi Password Tidak Cocok!');
      return;
    }

    const tempData = { email, password };
    localStorage.setItem('tempUserData', JSON.stringify(tempData));

    setError('');
    navigate('/register2');
  };

  const handleBack = () => {
    navigate('/landing');
  };

  return (
    <div className="register-page">
      <div className='register-logo-container'>
        <img src='/assets/BookPad_Logo.png' alt="Logo" className="register-logo" />
      </div>
      <div className="register-form">
        <h1>REGISTER</h1>
        <p>Hai, Readers! Silahkan Buat Akun Terlebih Dahulu Yaa</p>
        <div className="input-field">
        <span className="email-icon"></span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
        <span className="password-icon"></span>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
        <span className="password-icon"></span>
          <input
            type="password"
            placeholder="Konfirmasi Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className='register-button-container'>
          <button type="button" className="register-next-button" onClick={handleNext}>
            NEXT
          </button>
          <button type="button" className="register-back-button" onClick={handleBack}>
            BACK
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage1;
