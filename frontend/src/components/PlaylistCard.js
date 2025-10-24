import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PlaylistCard.css';

const PlaylistCard = ({ playlist }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const handleClick = () => {
    // Navigate to internal playlist page
    navigate(`/playlist/${playlist.playlistId}`);
  };

  return (
    <div className="playlist-card" onClick={handleClick}>
      <div className="playlist-thumbnail">
        <img src={playlist.thumbnailUrl} alt={playlist.title} />
        <div className="playlist-overlay">
          <div className="playlist-icon">
            <svg viewBox="0 0 24 24" fill="white">
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
              <path d="M22 12l-6-4v8z"/>
            </svg>
          </div>
          <div className="playlist-count">{playlist.videoCount} videos</div>
        </div>
      </div>
      <div className="playlist-info">
        <h3 className="playlist-title">{playlist.title}</h3>
        <p className="playlist-channel">{playlist.channelTitle}</p>
        <div className="playlist-meta">
          <span>Updated {formatDate(playlist.publishedAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
