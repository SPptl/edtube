import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchVideos = async (query, maxResults = 20) => {
  try {
    const response = await api.get('/videos/search', {
      params: { query, maxResults },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching videos:', error);
    throw error;
  }
};

export const searchPlaylists = async (query, maxResults = 20) => {
  try {
    const response = await api.get('/videos/playlists/search', {
      params: { query, maxResults },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching playlists:', error);
    throw error;
  }
};

export const getTrendingVideos = async (maxResults = 20) => {
  try {
    const response = await api.get('/videos/trending', {
      params: { maxResults },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching trending videos:', error);
    throw error;
  }
};

export const getVideoById = async (videoId) => {
  try {
    const response = await api.get(`/videos/${videoId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching video:', error);
    throw error;
  }
};

export const getPlaylistById = async (playlistId) => {
  try {
    const response = await api.get(`/videos/playlists/${playlistId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching playlist:', error);
    throw error;
  }
};

export const getPlaylistVideos = async (playlistId, maxResults = 50) => {
  try {
    const response = await api.get(`/videos/playlists/${playlistId}/videos`, {
      params: { maxResults },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching playlist videos:', error);
    throw error;
  }
};

export default api;
