package com.edtube.backend.service;

import com.edtube.backend.dto.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.Duration;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class YouTubeService {
    
    @Value("${youtube.api.key}")
    private String apiKey;
    
    @Value("${youtube.api.base-url}")
    private String baseUrl;
    
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    public SearchResponseDTO searchEducationalContent(String query, String pageToken) {
        try {
            // Search for videos (70% of results)
            List<VideoDTO> videos = searchVideos(query, pageToken, 7);
            
            // Search for playlists (30% of results)
            List<PlaylistDTO> playlists = searchPlaylists(query, pageToken, 3);
            
            return new SearchResponseDTO(videos, playlists, pageToken, (long) (videos.size() + playlists.size()));
            
        } catch (Exception e) {
            e.printStackTrace();
            return new SearchResponseDTO(new ArrayList<>(), new ArrayList<>(), null, 0L);
        }
    }
    
    private List<VideoDTO> searchVideos(String query, String pageToken, int maxResults) {
        try {
            String url = UriComponentsBuilder.fromHttpUrl(baseUrl + "/search")
                    .queryParam("part", "snippet")
                    .queryParam("q", query + " education tutorial learn")
                    .queryParam("type", "video")
                    .queryParam("maxResults", maxResults)
                    .queryParam("order", "relevance")
                    .queryParam("videoDuration", "medium")
                    .queryParam("key", apiKey)
                    .queryParam("pageToken", pageToken != null ? pageToken : "")
                    .toUriString();
            
            String response = restTemplate.getForObject(url, String.class);
            JsonNode root = objectMapper.readTree(response);
            
            List<VideoDTO> videos = new ArrayList<>();
            JsonNode items = root.path("items");
            
            for (JsonNode item : items) {
                VideoDTO video = new VideoDTO();
                JsonNode snippet = item.path("snippet");
                JsonNode id = item.path("id");
                
                video.setVideoId(id.path("videoId").asText());
                video.setTitle(snippet.path("title").asText());
                video.setDescription(snippet.path("description").asText());
                video.setChannelTitle(snippet.path("channelTitle").asText());
                video.setChannelId(snippet.path("channelId").asText());
                video.setPublishedAt(snippet.path("publishedAt").asText());
                
                JsonNode thumbnails = snippet.path("thumbnails");
                video.setThumbnailUrl(thumbnails.path("medium").path("url").asText());
                
                video.setVideoUrl("https://www.youtube.com/watch?v=" + video.getVideoId());
                
                videos.add(video);
            }
            
            return videos;
            
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }
    
    private List<PlaylistDTO> searchPlaylists(String query, String pageToken, int maxResults) {
        try {
            String url = UriComponentsBuilder.fromHttpUrl(baseUrl + "/search")
                    .queryParam("part", "snippet")
                    .queryParam("q", query + " education tutorial learn playlist")
                    .queryParam("type", "playlist")
                    .queryParam("maxResults", maxResults)
                    .queryParam("order", "relevance")
                    .queryParam("key", apiKey)
                    .queryParam("pageToken", pageToken != null ? pageToken : "")
                    .toUriString();
            
            String response = restTemplate.getForObject(url, String.class);
            JsonNode root = objectMapper.readTree(response);
            
            List<PlaylistDTO> playlists = new ArrayList<>();
            JsonNode items = root.path("items");
            
            for (JsonNode item : items) {
                PlaylistDTO playlist = new PlaylistDTO();
                JsonNode snippet = item.path("snippet");
                JsonNode id = item.path("id");
                
                playlist.setPlaylistId(id.path("playlistId").asText());
                playlist.setTitle(snippet.path("title").asText());
                playlist.setDescription(snippet.path("description").asText());
                playlist.setChannelTitle(snippet.path("channelTitle").asText());
                playlist.setChannelId(snippet.path("channelId").asText());
                playlist.setPublishedAt(snippet.path("publishedAt").asText());
                
                JsonNode thumbnails = snippet.path("thumbnails");
                playlist.setThumbnailUrl(thumbnails.path("medium").path("url").asText());
                
                playlists.add(playlist);
            }
            
            return playlists;
            
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }
    
    public VideoDTO getVideoDetails(String videoId) {
        try {
            String url = UriComponentsBuilder.fromHttpUrl(baseUrl + "/videos")
                    .queryParam("part", "snippet,contentDetails,statistics")
                    .queryParam("id", videoId)
                    .queryParam("key", apiKey)
                    .toUriString();
            
            String response = restTemplate.getForObject(url, String.class);
            JsonNode root = objectMapper.readTree(response);
            
            JsonNode item = root.path("items").get(0);
            if (item == null) return null;
            
            VideoDTO video = new VideoDTO();
            JsonNode snippet = item.path("snippet");
            JsonNode contentDetails = item.path("contentDetails");
            JsonNode statistics = item.path("statistics");
            
            video.setVideoId(videoId);
            video.setTitle(snippet.path("title").asText());
            video.setDescription(snippet.path("description").asText());
            video.setChannelTitle(snippet.path("channelTitle").asText());
            video.setChannelId(snippet.path("channelId").asText());
            video.setPublishedAt(snippet.path("publishedAt").asText());
            video.setDuration(contentDetails.path("duration").asText());
            video.setViewCount(statistics.path("viewCount").asLong());
            
            JsonNode thumbnails = snippet.path("thumbnails");
            video.setThumbnailUrl(thumbnails.path("high").path("url").asText());
            
            video.setVideoUrl("https://www.youtube.com/watch?v=" + videoId);
            
            return video;
            
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    public List<VideoDTO> getPlaylistVideos(String playlistId) {
        try {
            String url = UriComponentsBuilder.fromHttpUrl(baseUrl + "/playlistItems")
                    .queryParam("part", "snippet")
                    .queryParam("playlistId", playlistId)
                    .queryParam("maxResults", 20)
                    .queryParam("key", apiKey)
                    .toUriString();
            
            String response = restTemplate.getForObject(url, String.class);
            JsonNode root = objectMapper.readTree(response);
            
            List<VideoDTO> videos = new ArrayList<>();
            JsonNode items = root.path("items");
            
            for (JsonNode item : items) {
                VideoDTO video = new VideoDTO();
                JsonNode snippet = item.path("snippet");
                JsonNode resourceId = snippet.path("resourceId");
                
                video.setVideoId(resourceId.path("videoId").asText());
                video.setTitle(snippet.path("title").asText());
                video.setDescription(snippet.path("description").asText());
                video.setChannelTitle(snippet.path("channelTitle").asText());
                video.setChannelId(snippet.path("channelId").asText());
                video.setPublishedAt(snippet.path("publishedAt").asText());
                
                JsonNode thumbnails = snippet.path("thumbnails");
                video.setThumbnailUrl(thumbnails.path("medium").path("url").asText());
                
                video.setVideoUrl("https://www.youtube.com/watch?v=" + video.getVideoId());
                
                videos.add(video);
            }
            
            return videos;
            
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }
}

