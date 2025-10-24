import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { getPlaylistById, getPlaylistVideos } from '../services/api';
import './Playlist.css';

const Playlist = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (playlistId) {
      fetchPlaylistData(playlistId);
    }
  }, [playlistId]);

  const fetchPlaylistData = async (id) => {
    setLoading(true);
    try {
      const [playlistData, videosData] = await Promise.all([
        getPlaylistById(id),
        getPlaylistVideos(id, 50)
      ]);
      setPlaylist(playlistData);
      setVideos(videosData);
    } catch (error) {
      console.error('Failed to fetch playlist data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="playlist-page">
        <div className="loading">Loading playlist...</div>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="playlist-page">
        <div className="error">Playlist not found</div>
      </div>
    );
  }

  return (
    <div className="playlist-page">
      <div className="playlist-header">
        <div className="playlist-thumbnail-large">
          <img src={playlist.thumbnailUrl} alt={playlist.title} />
          <div className="playlist-overlay-large">
            <div className="playlist-icon-large">
              <svg viewBox="0 0 24 24" fill="white">
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                <path d="M22 12l-6-4v8z"/>
              </svg>
            </div>
            <div className="video-count-large">{playlist.videoCount} videos</div>
          </div>
        </div>
        <div className="playlist-info-large">
          <h1>{playlist.title}</h1>
          <p className="channel-name">{playlist.channelTitle}</p>
          {playlist.description && (
            <p className="playlist-description">{playlist.description}</p>
          )}
        </div>
      </div>

      <div className="playlist-videos-section">
        <h2>Videos in this playlist</h2>
        <div className="videos-grid">
          {videos.map((video) => (
            <VideoCard key={video.videoId} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
