import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import VideoGrid from './VideoGrid';
import Sidebar from './Sidebar';

const HomePage = ({ user }) => {
  const [searchResults, setSearchResults] = useState({ videos: [], playlists: [] });
  const [recentVideos, setRecentVideos] = useState([]);
  const [recentPlaylists, setRecentPlaylists] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      // Load recent history
      const historyResponse = await axios.get('/api/history/recent?limit=5');
      if (historyResponse.data.success) {
        setRecentVideos(historyResponse.data.videos);
        setRecentPlaylists(historyResponse.data.playlists);
      }

      // Load recommendations
      const recResponse = await axios.get('/api/recommendations/videos?limit=10');
      if (recResponse.data.success) {
        setRecommendations(recResponse.data.videos);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.get(`/api/youtube/search?query=${encodeURIComponent(query)}`);
      setSearchResults(response.data);
      setHasSearched(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToHistory = async (video, isPlaylist = false, playlistId = null) => {
    if (!user) return;
    
    try {
      await axios.post('/api/history/add', {
        videoId: video.videoId,
        title: video.title,
        thumbnail: video.thumbnailUrl,
        channelTitle: video.channelTitle,
        duration: video.duration,
        watchTime: 0,
        isPlaylist: isPlaylist,
        playlistId: playlistId
      });
    } catch (error) {
      console.error('Error adding to history:', error);
    }
  };

  if (!user) {
    return (
      <div className="login-container">
        <div className="login-content">
          <h1 className="login-title">EdTube</h1>
          <p className="login-subtitle">
            Please log in to access educational videos
          </p>
          <a href="/login" className="btn btn-primary" style={{ fontSize: '18px', padding: '15px 30px', textDecoration: 'none' }}>
            Continue with Google
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="main-content">
        <Sidebar 
          recentVideos={recentVideos}
          recentPlaylists={recentPlaylists}
          onVideoClick={addToHistory}
        />
        
        <div className="content-area">
          <SearchBar onSearch={handleSearch} loading={loading} />
          
          {hasSearched ? (
            <div className="search-results">
              {searchResults.videos.length > 0 && (
                <div className="videos-section">
                  <h2 className="section-title">Videos ({searchResults.videos.length})</h2>
                  <VideoGrid 
                    videos={searchResults.videos} 
                    onVideoClick={addToHistory}
                  />
                </div>
              )}
              
              {searchResults.playlists.length > 0 && (
                <div className="playlists-section">
                  <h2 className="section-title">Playlists ({searchResults.playlists.length})</h2>
                  <VideoGrid 
                    videos={searchResults.playlists} 
                    onVideoClick={addToHistory}
                    isPlaylist={true}
                  />
                </div>
              )}
            </div>
          ) : (
            <div>
              {recommendations.length > 0 && (
                <div className="videos-section">
                  <h2 className="section-title">Recommended for You</h2>
                  <VideoGrid 
                    videos={recommendations} 
                    onVideoClick={addToHistory}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
