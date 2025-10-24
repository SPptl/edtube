import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import PlaylistCard from '../components/PlaylistCard';
import { searchVideos, searchPlaylists } from '../services/api';
import './Search.css';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const mode = searchParams.get('mode') || 'videos'; // 'videos' or 'playlists'
  const [videos, setVideos] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      performSearch(query, mode);
    }
  }, [query, mode]);

  const performSearch = async (searchQuery, searchMode) => {
    setLoading(true);
    try {
      if (searchMode === 'playlists') {
        // Only fetch playlists
        const playlistData = await searchPlaylists(searchQuery, 24);
        setPlaylists(playlistData);
        setVideos([]);
      } else {
        // Fetch both videos and playlists
        const [videoData, playlistData] = await Promise.all([
          searchVideos(searchQuery, 24),
          searchPlaylists(searchQuery, 8)
        ]);
        setVideos(videoData);
        setPlaylists(playlistData);
      }
    } catch (error) {
      console.error('Failed to search:', error);
    } finally {
      setLoading(false);
    }
  };

  // Interleave videos and playlists: 3 videos, 1 playlist pattern
  const createMixedContent = () => {
    if (mode === 'playlists') {
      // Show only playlists
      return playlists.map(playlist => ({ type: 'playlist', data: playlist }));
    }

    // Mixed mode: 3 videos, 1 playlist
    const mixed = [];
    let videoIndex = 0;
    let playlistIndex = 0;

    while (videoIndex < videos.length || playlistIndex < playlists.length) {
      // Add 3 videos
      for (let i = 0; i < 3 && videoIndex < videos.length; i++) {
        mixed.push({ type: 'video', data: videos[videoIndex++] });
      }
      
      // Add 1 playlist
      if (playlistIndex < playlists.length) {
        mixed.push({ type: 'playlist', data: playlists[playlistIndex++] });
      }
    }

    return mixed;
  };

  const mixedContent = createMixedContent();

  return (
    <div className="search-page">
      <div className="page-header">
        <h1>Educational {mode === 'playlists' ? 'playlists' : 'content'} for "{query}"</h1>
      </div>
      
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="content-grid">
          {mixedContent.map((item, index) => (
            item.type === 'video' ? (
              <VideoCard key={`video-${item.data.videoId}-${index}`} video={item.data} />
            ) : (
              <PlaylistCard key={`playlist-${item.data.playlistId}-${index}`} playlist={item.data} />
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
