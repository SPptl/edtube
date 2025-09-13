import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import VideoPage from './components/VideoPage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get('/api/user/check');
      if (response.data.authenticated) {
        const profileResponse = await axios.get('/api/user/profile');
        if (profileResponse.data.success) {
          setUser(profileResponse.data.user);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    window.location.href = '/logout';
  };

  if (loading) {
    return (
      <div className="loading">
        <div>Loading EdTube...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Header user={user} onLogout={handleLogout} />
        <Routes>
          <Route 
            path="/" 
            element={<HomePage user={user} />} 
          />
          <Route 
            path="/login" 
            element={<LoginPage onLogin={handleLogin} />} 
          />
          <Route 
            path="/video/:videoId" 
            element={<VideoPage user={user} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
