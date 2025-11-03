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
          <div className="hero-badge">🎓 Educational Platform</div>
          <h1 className="hero-title">
            Discover Knowledge,
            <br />
            <span className="gradient-text">One Video at a Time</span>
          </h1>
          <p className="hero-description">
            Access thousands of curated educational videos across science, technology, arts, and more. 
            Start your learning journey today.
          </p>
          <div className="hero-cta">
            <button className="cta-primary" onClick={() => handleSearch('programming')}>
              Start Learning
              <span className="arrow">→</span>
            </button>
            <button className="cta-secondary" onClick={() => handleSearch('science')}>
              Explore Topics
            </button>
          </div>
        </div>
        <div className="hero-decoration">
          <div className="floating-card card-1">📚</div>
          <div className="floating-card card-2">🔬</div>
          <div className="floating-card card-3">💻</div>
          <div className="floating-card card-4">🎨</div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="section-header">
          <h2>Why Choose edtube?</h2>
          <p>Everything you need to accelerate your learning</p>
        </div>

        <div className="info-cards">
          <div className="info-card">
            <div className="card-icon-wrapper">
              <div className="card-icon">🔍</div>
            </div>
            <h3>Smart Search</h3>
            <p>Find exactly what you need with our intelligent search that filters only educational content</p>
            <div className="card-glow"></div>
          </div>

          <div className="info-card">
            <div className="card-icon-wrapper">
              <div className="card-icon">📚</div>
            </div>
            <h3>Curated Content</h3>
            <p>Every video is from YouTube's education category - no distractions, just learning</p>
            <div className="card-glow"></div>
          </div>

          <div className="info-card">
            <div className="card-icon-wrapper">
              <div className="card-icon">▶️</div>
            </div>
            <h3>Seamless Experience</h3>
            <p>Watch videos, explore playlists, and discover related content all in one place</p>
            <div className="card-glow"></div>
          </div>
        </div>

        <div className="popular-topics">
          <div className="section-header">
            <h2>Explore Popular Topics</h2>
            <p>Jump into the subjects that interest you most</p>
          </div>
          <div className="topic-grid">
            <button className="topic-card" onClick={() => handleSearch('programming')}>
              <div className="topic-icon">💻</div>
              <h4>Programming</h4>
              <p>Code & Development</p>
            </button>
            <button className="topic-card" onClick={() => handleSearch('mathematics')}>
              <div className="topic-icon">📐</div>
              <h4>Mathematics</h4>
              <p>Numbers & Logic</p>
            </button>
            <button className="topic-card" onClick={() => handleSearch('science')}>
              <div className="topic-icon">🔬</div>
              <h4>Science</h4>
              <p>Natural Sciences</p>
            </button>
            <button className="topic-card" onClick={() => handleSearch('physics')}>
              <div className="topic-icon">⚛️</div>
              <h4>Physics</h4>
              <p>Matter & Energy</p>
            </button>
            <button className="topic-card" onClick={() => handleSearch('chemistry')}>
              <div className="topic-icon">🧪</div>
              <h4>Chemistry</h4>
              <p>Elements & Reactions</p>
            </button>
            <button className="topic-card" onClick={() => handleSearch('biology')}>
              <div className="topic-icon">🧬</div>
              <h4>Biology</h4>
              <p>Life Sciences</p>
            </button>
            <button className="topic-card" onClick={() => handleSearch('history')}>
              <div className="topic-icon">📖</div>
              <h4>History</h4>
              <p>Past & Culture</p>
            </button>
            <button className="topic-card" onClick={() => handleSearch('languages')}>
              <div className="topic-icon">🗣️</div>
              <h4>Languages</h4>
              <p>Communication</p>
            </button>
          </div>
        </div>

        <div className="how-to-use">
          <h2>How to Use EdTube</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Search for Topics</h4>
                <p>Type any educational topic in the search bar at the top of the page</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Browse Results</h4>
                <p>All results are filtered to show only educational content from YouTube</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Watch & Learn</h4>
                <p>Click on any video to watch it and see related educational videos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="features">
          <h2>Features</h2>
          <ul className="features-list">
            <li>✅ Educational content only - No distractions</li>
            <li>✅ Powered by YouTube Data API</li>
            <li>✅ Clean, modern interface</li>
            <li>✅ Fast and responsive design</li>
            <li>✅ Related video recommendations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
