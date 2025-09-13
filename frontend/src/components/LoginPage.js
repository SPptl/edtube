import React from 'react';

const LoginPage = ({ onLogin }) => {
  const handleGoogleLogin = () => {
    window.location.href = '/oauth2/authorization/google';
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="login-title">EdTube</h1>
        <p className="login-subtitle">
          Smart Learning with Educational Videos
        </p>
        <button 
          onClick={handleGoogleLogin}
          className="btn btn-primary"
          style={{ fontSize: '18px', padding: '15px 30px' }}
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
