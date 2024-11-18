import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage2() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); 

  const handleRegister = () => {
    if (!name || !birthDate) {
      setError('Isi Semua Data Kamu Dulu Yaa!');
      return;
    }

    const tempData = JSON.parse(localStorage.getItem('tempUserData')) || {};
    const userData = {
      name,
      email: tempData.email,
      password: tempData.password,
      dob: birthDate,
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.removeItem('tempUserData');

    setError('');

    setShowSuccessPopup(true);
    setTimeout(() => {
      setShowSuccessPopup(false);
      navigate('/login');
    }, 3000);
  };

  const handleBack = () => {
    navigate('/register1');
  };

  return (
    <div className="register-page">
      <div className="register-logo-container">
        <img src="assets/BookPad_Logo.png" alt="logo" className="register-logo" />
      </div>
      <div className="register-form">
        <h1>REGISTER</h1>
        <p>Hai, Readers! Lengkapi Data Kamu Terlebih Dahulu Yaa</p>

        <div className="input-field">
          <span className="user-icon"></span>
          <input
            type="text"
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-field">
          <span className="dob-icon"></span>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        <div className="register-button-container">
          <button onClick={handleRegister} className="register-v2">
            REGISTER
          </button>
          <button onClick={handleBack} className="register-back-button">
            BACK
          </button>
        </div>
      </div>

      {showSuccessPopup && (
        <div className="success-popup">
          <div className="success-content">
            <span className="success-icon">✅</span>
            <p>Registrasi Berhasil</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterPage2;
