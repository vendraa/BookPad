import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaSearch, FaBook, FaUser } from 'react-icons/fa';
import './App.css';
import LoadingPage from './pages/LoadingPage/LoadingPage';
import LandingPage from './pages/LandingPage/LandingPage';
import RegisterPage1 from './pages/RegisterPage/RegisterPage1';
import RegisterPage2 from './pages/RegisterPage/RegisterPage2';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import CollectionPage from './pages/CollectionPage/CollectionPage';
import DetailPage from './pages/DetailPage/DetailPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [collection, setCollection] = useState(() => {
    const savedCollection = localStorage.getItem('bookCollection');
    return savedCollection ? JSON.parse(savedCollection) : [];
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('userData');
    return savedUser ? JSON.parse(savedUser) : null; 
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleHome = () => navigate('/home');
  const handleSearch = () => navigate('/search');
  const handleCollection = () => navigate('/collection');
  const handleProfile = () => navigate('/profile');

  useEffect(() => {
    localStorage.setItem('bookCollection', JSON.stringify(collection));
  }, [collection]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('userData', JSON.stringify(user));
    }
  }, [user]);

  const addToCollection = (book) => {
    if (!collection.some((item) => item.id === book.id)) {
      setCollection((prevCollection) => [...prevCollection, book]);
    }
  };

  const removeFromCollection = (bookId) => {
    setCollection((prevCollection) =>
      prevCollection.filter((book) => book.id !== bookId)
    );
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    navigate('/landing'); 
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleLogout = () => {
    navigate('/landing'); 
  };

  const showNavbar = ['/home', '/search', '/collection', '/profile'].includes(location.pathname);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            isLoading ? (
              <LoadingPage navigateToLanding={handleLoadingComplete} />
            ) : (
              <Navigate to="/landing" replace />
            )
          }
        />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/register1" element={<RegisterPage1 />} />
        <Route path="/register2" element={<RegisterPage2 />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/home" element={<HomePage addToCollection={addToCollection} />} />
        <Route path="/search" element={<SearchPage addToCollection={addToCollection} />} />
        <Route
          path="/collection"
          element={<CollectionPage collection={collection} onRemove={removeFromCollection} />}
        />
        <Route
          path="/profile"
          element={<ProfilePage user={user} onUpdateUser={handleUpdateUser} onLogout={handleLogout} />}
        />
        <Route path="/book/works/:bookId" element={<DetailPage />} />
      </Routes>

      {showNavbar && (
        <nav className="bottom-nav">
          <FaHome
            className={`nav-icon ${location.pathname === '/home' ? 'active' : ''}`}
            onClick={handleHome}
          />
          <FaSearch
            className={`nav-icon ${location.pathname === '/search' ? 'active' : ''}`}
            onClick={handleSearch}
          />
          <FaBook
            className={`nav-icon ${location.pathname === '/collection' ? 'active' : ''}`}
            onClick={handleCollection}
          />
          <FaUser
            className={`nav-icon ${location.pathname === '/profile' ? 'active' : ''}`}
            onClick={handleProfile}
          />
        </nav>
      )}
    </div>
  );
};

export default App;
