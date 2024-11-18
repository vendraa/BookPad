import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = ({ onUpdateUser }) => {
  const [user, setUser] = useState({ name: '', email: '', dob: '' });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('userData'));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const formatDate = (date) => {
    if (!date) return 'Tanggal Lahir Belum Diisi';
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('id-ID', options);
    return formattedDate.replace(/\//g, ' '); 
  };

  const handleSave = () => {
    localStorage.setItem('userData', JSON.stringify(user));
    onUpdateUser(user);
    setIsEditing(false);
  };

  const handleLogout = () => {
    navigate('/landing');
  };

  return (
    <div className="profile-page">
      <div className='profile-logo-container'>
        <img src="/assets/BookPad_Logo.png" alt="Logo" className="profile-logo" />
      </div>
      <div className="profile-header">
        <h2>Profil Kamu</h2>
        <FaUserCircle className="profile-icon" />
        <p>Hai, {user.name || 'Pengguna'}...</p>
      </div>

      <div className="profile-details">
        <div className="profile-item">
          <span className="user-icon"></span>
          {isEditing ? (
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          ) : (
            <span>{user.name || 'Nama Belum Diisi'}</span>
          )}
        </div>
        <div className="profile-item">
          <span className="email-icon"></span>
          {isEditing ? (
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          ) : (
            <span>{user.email || 'Email Belum Diisi'}</span>
          )}
        </div>
        <div className="profile-item">
          <span className="dob-icon"></span>
          {isEditing ? (
            <input
              type="date"
              value={user.dob}
              onChange={(e) => setUser({ ...user, dob: e.target.value })}
            />
          ) : (
            <span>{formatDate(user.dob)}</span>
          )}
        </div>
      </div>

      <div className="profile-actions">
        {isEditing ? (
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Data
          </button>
        )}
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
