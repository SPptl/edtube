import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ recentVideos, recentPlaylists, onVideoClick }) => {
  const navigate = useNavigate();

  const handleVideoClick = (video, isPlaylist = false) => {
    if (onVideoClick) {
      onVideoClick(video, isPlaylist, video.playlistId);
    }
    
    if (!isPlaylist) {
      navigate(`/video/${video.videoId}`);
    }
  };

  return (
    <div className="sidebar">
      {recentVideos.length > 0 && (
        <div>
          <h3>Recently Watched Videos</h3>
          {recentVideos.map((video) => (
            <div 
              key={video.videoId}
              className="sidebar-item"
              onClick={() => handleVideoClick(video)}
            >
              <img src={video.thumbnailUrl} alt={video.title} />
              <div className="sidebar-item-info">
                <div className="sidebar-item-title">{video.title}</div>
                <div className="sidebar-item-channel">{video.channelTitle}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {recentPlaylists.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3>Recently Watched Playlists</h3>
          {recentPlaylists.map((playlist) => (
            <div 
              key={playlist.videoId}
              className="sidebar-item"
              onClick={() => handleVideoClick(playlist, true)}
            >
              <img src={playlist.thumbnailUrl} alt={playlist.title} />
              <div className="sidebar-item-info">
                <div className="sidebar-item-title">{playlist.title}</div>
                <div className="sidebar-item-channel">{playlist.channelTitle}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {recentVideos.length === 0 && recentPlaylists.length === 0 && (
        <div>
          <h3>Welcome to EdTube!</h3>
          <p style={{ color: '#aaa', fontSize: '14px' }}>
            Start searching for educational content to see your watch history here.
          </p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
