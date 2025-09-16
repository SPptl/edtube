import React from 'react';

const Header = ({ user, onLogout }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            EdTube
          </div>
          {user && (
            <div className="user-info">
              <span>Welcome, {user.name}</span>
              {user.pictureUrl && (
                <img 
                  src={user.pictureUrl} 
                  alt="Profile" 
                  className="user-avatar"
                />
              )}
              <button onClick={onLogout} className="btn btn-secondary">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
