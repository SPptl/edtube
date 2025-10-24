import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState('videos'); // 'videos' or 'playlists'
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}&mode=${searchMode}`);
    }
  };

  const toggleSearchMode = () => {
    setSearchMode(searchMode === 'videos' ? 'playlists' : 'videos');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={handleLogoClick}>
          <div className="logo-gradient">
            <svg viewBox="0 0 24 24" className="logo-icon">
              <path fill="currentColor" d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 3.6v8.55c0 4.45-3.06 8.62-7.5 9.63-.43-.1-.84-.21-1.25-.34C7.16 24.26 4 20.09 4 15.33V7.78l8-3.6zM10 17l6-4-6-4v8z"/>
            </svg>
          </div>
          <span className="logo-text">edtube</span>
        </div>

        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder={searchMode === 'videos' ? "Search educational videos..." : "Search educational playlists..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="button" 
              className={`mode-toggle-button ${searchMode === 'playlists' ? 'active' : ''}`}
              onClick={toggleSearchMode}
              title={searchMode === 'videos' ? "Switch to playlist search" : "Switch to video search"}
            >
              {searchMode === 'videos' ? (
                <svg viewBox="0 0 24 24" className="mode-icon">
                  <path fill="currentColor" d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="mode-icon">
                  <path fill="currentColor" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                  <path fill="currentColor" d="M22 12l-6-4v8z"/>
                </svg>
              )}
            </button>
            <button type="submit" className="search-button">
              <svg viewBox="0 0 24 24" className="search-icon">
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
