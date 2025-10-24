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
      <div className="welcome-section">
        <div className="welcome-header">
          <h1>Welcome to EdTube</h1>
          <p className="tagline">Your Gateway to Educational Content</p>
        </div>

        <div className="info-cards">
          <div className="info-card">
            <div className="card-icon">🔍</div>
            <h3>Search</h3>
            <p>Use the search bar above to find educational videos on any topic</p>
          </div>

          <div className="info-card">
            <div className="card-icon">📚</div>
            <h3>Learn</h3>
            <p>Access thousands of educational videos covering science, math, programming, history, and more</p>
          </div>

          <div className="info-card">
            <div className="card-icon">▶️</div>
            <h3>Watch</h3>
            <p>Click any video to watch it with full details and related recommendations</p>
          </div>
        </div>

        <div className="popular-topics">
          <h2>Popular Topics</h2>
          <div className="topic-buttons">
            <button className="topic-btn" onClick={() => handleSearch('programming')}>
              💻 Programming
            </button>
            <button className="topic-btn" onClick={() => handleSearch('mathematics')}>
              📐 Mathematics
            </button>
            <button className="topic-btn" onClick={() => handleSearch('science')}>
              🔬 Science
            </button>
            <button className="topic-btn" onClick={() => handleSearch('history')}>
              📖 History
            </button>
            <button className="topic-btn" onClick={() => handleSearch('languages')}>
              🗣️ Languages
            </button>
            <button className="topic-btn" onClick={() => handleSearch('physics')}>
              ⚛️ Physics
            </button>
            <button className="topic-btn" onClick={() => handleSearch('biology')}>
              🧬 Biology
            </button>
            <button className="topic-btn" onClick={() => handleSearch('chemistry')}>
              🧪 Chemistry
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
