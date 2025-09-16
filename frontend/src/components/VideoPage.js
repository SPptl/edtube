import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VideoPage = ({ user }) => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (videoId) {
      loadVideoDetails();
    }
  }, [videoId]);

  const loadVideoDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/youtube/video/${videoId}`);
      setVideo(response.data);
    } catch (error) {
      console.error('Error loading video:', error);
      setError('Failed to load video details');
    } finally {
      setLoading(false);
    }
  };

  const addToHistory = async () => {
    if (!user || !video) return;
    
    try {
      await axios.post('/api/history/add', {
        videoId: video.videoId,
        title: video.title,
        thumbnail: video.thumbnailUrl,
        channelTitle: video.channelTitle,
        duration: video.duration,
        watchTime: 0,
        isPlaylist: false
      });
    } catch (error) {
      console.error('Error adding to history:', error);
    }
  };

  useEffect(() => {
    if (video) {
      addToHistory();
    }
  }, [video]);

  if (loading) {
    return (
      <div className="loading">
        <div>Loading video...</div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="error">
        <h2>Video not found</h2>
        <p>The video you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/')} 
          className="btn btn-primary"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => navigate('/')} 
          className="btn btn-secondary"
          style={{ marginBottom: '20px' }}
        >
          ← Back to Search
        </button>
        
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: '2', minWidth: '300px' }}>
            <div style={{ 
              position: 'relative', 
              paddingBottom: '56.25%', 
              height: 0, 
              overflow: 'hidden',
              borderRadius: '10px',
              backgroundColor: '#000'
            }}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.title}
              />
            </div>
            
            <div style={{ marginTop: '20px' }}>
              <h1 style={{ fontSize: '24px', marginBottom: '10px', color: '#fff' }}>
                {video.title}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                <span style={{ color: '#aaa' }}>{video.channelTitle}</span>
                {video.viewCount && (
                  <span style={{ color: '#aaa' }}>
                    {video.viewCount.toLocaleString()} views
                  </span>
                )}
                {video.duration && (
                  <span style={{ color: '#aaa' }}>{video.duration}</span>
                )}
              </div>
              
              {video.description && (
                <div style={{ 
                  backgroundColor: '#1a1a1a', 
                  padding: '20px', 
                  borderRadius: '10px',
                  marginTop: '20px'
                }}>
                  <h3 style={{ marginBottom: '10px', color: '#ff0000' }}>Description</h3>
                  <p style={{ 
                    color: '#ccc', 
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {video.description}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div style={{ flex: '1', minWidth: '250px' }}>
            <div style={{ 
              backgroundColor: '#1a1a1a', 
              padding: '20px', 
              borderRadius: '10px',
              position: 'sticky',
              top: '20px'
            }}>
              <h3 style={{ marginBottom: '15px', color: '#ff0000' }}>Video Info</h3>
              <div style={{ color: '#ccc', fontSize: '14px' }}>
                <p><strong>Channel:</strong> {video.channelTitle}</p>
                <p><strong>Published:</strong> {new Date(video.publishedAt).toLocaleDateString()}</p>
                {video.duration && (
                  <p><strong>Duration:</strong> {video.duration}</p>
                )}
                {video.viewCount && (
                  <p><strong>Views:</strong> {video.viewCount.toLocaleString()}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
