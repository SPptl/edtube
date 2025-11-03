import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span>Educational Content Platform</span>
          </div>
          <h1 className="hero-title">
            Discover Knowledge,
            <br />
            One Video at a Time
          </h1>
          <p className="hero-description">
            Explore thousands of curated educational videos covering programming,
            science, mathematics, history, and more. Start your learning journey today.
          </p>
          <div className="hero-actions">
            <button className="cta-primary" onClick={() => handleSearch('programming')}>
              Start Learning
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="cta-secondary" onClick={() => handleSearch('science')}>
              Explore Topics
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card card-1">
            <div className="card-icon">�</div>
            <div className="card-text">Programming</div>
          </div>
          <div className="floating-card card-2">
            <div className="card-icon">🔬</div>
            <div className="card-text">Science</div>
          </div>
          <div className="floating-card card-3">
            <div className="card-icon">📐</div>
            <div className="card-text">Mathematics</div>
          </div>
          <div className="floating-card card-4">
            <div className="card-icon">📖</div>
            <div className="card-text">History</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="section-header">
          <span className="section-badge">Why Choose edtube</span>
          <h2 className="section-title">Everything You Need to Learn</h2>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M28 11.5L16 20L4 11.5M4 20.5L16 29L28 20.5M16 3L4 11.5L16 20L28 11.5L16 3Z" stroke="url(#gradient1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="gradient1" x1="4" y1="3" x2="28" y2="29">
                    <stop offset="0%" stopColor="#667eea"/>
                    <stop offset="100%" stopColor="#764ba2"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3>Curated Content</h3>
            <p>Only educational videos filtered by category to ensure quality learning materials</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="12" stroke="url(#gradient2)" strokeWidth="2"/>
                <path d="M16 8V16L20 20" stroke="url(#gradient2)" strokeWidth="2" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="gradient2" x1="4" y1="4" x2="28" y2="28">
                    <stop offset="0%" stopColor="#667eea"/>
                    <stop offset="100%" stopColor="#f093fb"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3>Save Time</h3>
            <p>No more searching through irrelevant content - find what you need instantly</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="6" y="8" width="20" height="16" rx="2" stroke="url(#gradient3)" strokeWidth="2"/>
                <path d="M14 12L20 16L14 20V12Z" fill="url(#gradient3)"/>
                <defs>
                  <linearGradient id="gradient3" x1="6" y1="8" x2="26" y2="24">
                    <stop offset="0%" stopColor="#764ba2"/>
                    <stop offset="100%" stopColor="#f093fb"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3>Playlists</h3>
            <p>Organized learning paths with complete playlists for structured education</p>
          </div>
        </div>
      </div>

      {/* Topics Section */}
      <div className="topics-section">
        <div className="section-header">
          <span className="section-badge">Explore</span>
          <h2 className="section-title">Popular Learning Topics</h2>
        </div>

        <div className="topics-grid">
          <button className="topic-card" onClick={() => handleSearch('programming')}>
            <div className="topic-icon">💻</div>
            <div className="topic-name">Programming</div>
            <div className="topic-arrow">→</div>
          </button>

          <button className="topic-card" onClick={() => handleSearch('mathematics')}>
            <div className="topic-icon">📐</div>
            <div className="topic-name">Mathematics</div>
            <div className="topic-arrow">→</div>
          </button>

          <button className="topic-card" onClick={() => handleSearch('science')}>
            <div className="topic-icon">🔬</div>
            <div className="topic-name">Science</div>
            <div className="topic-arrow">→</div>
          </button>

          <button className="topic-card" onClick={() => handleSearch('physics')}>
            <div className="topic-icon">⚛️</div>
            <div className="topic-name">Physics</div>
            <div className="topic-arrow">→</div>
          </button>

          <button className="topic-card" onClick={() => handleSearch('chemistry')}>
            <div className="topic-icon">🧪</div>
            <div className="topic-name">Chemistry</div>
            <div className="topic-arrow">→</div>
          </button>

          <button className="topic-card" onClick={() => handleSearch('biology')}>
            <div className="topic-icon">🧬</div>
            <div className="topic-name">Biology</div>
            <div className="topic-arrow">→</div>
          </button>

          <button className="topic-card" onClick={() => handleSearch('history')}>
            <div className="topic-icon">📖</div>
            <div className="topic-name">History</div>
            <div className="topic-arrow">→</div>
          </button>

          <button className="topic-card" onClick={() => handleSearch('languages')}>
            <div className="topic-icon">🗣️</div>
            <div className="topic-name">Languages</div>
            <div className="topic-arrow">→</div>
          </button>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Start Learning?</h2>
          <p className="cta-description">
            Join thousands of learners exploring educational content on edtube
          </p>
          <button className="cta-button" onClick={() => handleSearch('tutorials')}>
            Explore Now
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
