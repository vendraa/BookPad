import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      setError('Masukkan Email atau Password Kamu Yaa!');
      return;
    }

    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    if (storedUserData && storedUserData.email === email && storedUserData.password === password) {
      setError('');
      setShowSuccess(true); 
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/home'); 
      }, 3000);
    } else {
      setError('Email atau Password Kamu Salah!');
    }
  };

  const handleBack = () => {
    navigate('/landing');
  };

  return (
    <div className="login-page">
      <div className="login-logo-container">
        <img src="assets/BookPad_Logo.png" alt="logo" className="logo_login" />
      </div>
      <div className="login-form">
        <h2>LOGIN</h2>
        <p>Hai, Readers! Masukkan Email dan Password Akun Kamu Yaa</p>
        <div className="input-field">
          <span className="icon email"></span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-field">
          <span className="icon password"></span>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="login-button-container">
          <button type="button" onClick={handleLogin} className="login-button-v2">
            LOGIN
          </button>
          <button type="button" onClick={handleBack} className="login-back-button">
            BACK
          </button>
        </div>
      </div>

      {showSuccess && (
        <div className="success-popup">
          <div className="success-content">
            <span className="success-icon">✅</span>
            <p>Login Berhasil</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
