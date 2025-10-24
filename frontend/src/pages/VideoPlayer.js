import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getVideoById, searchVideos } from '../services/api';
import VideoCard from '../components/VideoCard';
import './VideoPlayer.css';

const VideoPlayer = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (videoId) {
      loadVideo(videoId);
    }
  }, [videoId]);

  const loadVideo = async (id) => {
    setLoading(true);
    try {
      const videoData = await getVideoById(id);
      setVideo(videoData);

      // Load related videos based on video title
      if (videoData && videoData.title) {
        const keywords = videoData.title.split(' ').slice(0, 3).join(' ');
        const related = await searchVideos(keywords, 12);
        setRelatedVideos(related.filter(v => v.videoId !== id));
      }
    } catch (error) {
      console.error('Failed to load video:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatViewCount = (count) => {
    const num = parseInt(count);
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading video...</p>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="error-container">
        <p>Video not found</p>
      </div>
    );
  }

  return (
    <div className="video-player-page">
      <div className="player-container">
        <div className="video-section">
          <div className="player-wrapper">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="video-details">
            <h1 className="video-title">{video.title}</h1>
            
            <div className="video-stats">
              <span>{formatViewCount(video.viewCount)} views</span>
              <span className="separator">•</span>
              <span>{formatDate(video.publishedAt)}</span>
              <span className="separator">•</span>
              <span>{formatViewCount(video.likeCount)} likes</span>
            </div>
            
            <div className="channel-info">
              <div className="channel-name">{video.channelTitle}</div>
            </div>
            
            <div className="video-description">
              <p>{video.description}</p>
            </div>
          </div>
        </div>

        <div className="related-section">
          <h2 className="related-title">Related Videos</h2>
          <div className="related-videos">
            {relatedVideos.map((relatedVideo) => (
              <VideoCard key={relatedVideo.videoId} video={relatedVideo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
