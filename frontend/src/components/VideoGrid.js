import React from 'react';
import { useNavigate } from 'react-router-dom';

const VideoGrid = ({ videos, onVideoClick, isPlaylist = false }) => {
  const navigate = useNavigate();

  const handleVideoClick = (video) => {
    if (onVideoClick) {
      onVideoClick(video, isPlaylist, video.playlistId);
    }
    
    if (isPlaylist) {
      // For playlists, we could show playlist details or navigate to a playlist page
      console.log('Playlist clicked:', video);
    } else {
      navigate(`/video/${video.videoId}`);
    }
  };

  if (!videos || videos.length === 0) {
    return <div className="loading">No videos found</div>;
  }

  return (
    <div className="video-grid">
      {videos.map((video) => (
        <div 
          key={video.videoId || video.playlistId} 
          className="video-card"
          onClick={() => handleVideoClick(video)}
        >
          <img 
            src={video.thumbnailUrl} 
            alt={video.title}
            className="video-thumbnail"
          />
          <div className="video-info">
            <h3 className="video-title">{video.title}</h3>
            <p className="video-channel">{video.channelTitle}</p>
            {video.duration && (
              <p className="video-duration">{video.duration}</p>
            )}
            {isPlaylist && video.videoCount && (
              <p className="video-duration">{video.videoCount} videos</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
