package com.edtube.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.edtube.model.PlaylistItem;
import com.edtube.model.VideoItem;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.Playlist;
import com.google.api.services.youtube.model.PlaylistListResponse;
import com.google.api.services.youtube.model.SearchListResponse;
import com.google.api.services.youtube.model.SearchResult;
import com.google.api.services.youtube.model.Video;
import com.google.api.services.youtube.model.VideoListResponse;

@Service
public class YoutubeService {
    
    @Value("${youtube.api.key}")
    private String apiKey;
    
    private YouTube getYouTubeService() throws Exception {
        return new YouTube.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                GsonFactory.getDefaultInstance(),
                null)
                .setApplicationName("EdTube")
                .build();
    }
    
    public List<VideoItem> searchVideos(String query, int maxResults) throws Exception {
        YouTube youtube = getYouTubeService();
        
        YouTube.Search.List search = youtube.search().list(Arrays.asList("id", "snippet"));
        search.setKey(apiKey);
        search.setQ(query);
        search.setType(Arrays.asList("video"));
        search.setVideoCategoryId("27"); // Education category
        search.setMaxResults((long) maxResults);
        search.setFields("items(id/videoId,snippet/title,snippet/description,snippet/channelTitle,snippet/thumbnails/medium/url,snippet/publishedAt)");
        
        SearchListResponse searchResponse = search.execute();
        List<SearchResult> searchResults = searchResponse.getItems();
        
        if (searchResults == null || searchResults.isEmpty()) {
            return new ArrayList<>();
        }
        
        List<String> videoIds = searchResults.stream()
                .map(result -> result.getId().getVideoId())
                .collect(Collectors.toList());
        
        return getVideoDetails(videoIds);
    }
    
    public List<VideoItem> getTrendingVideos(int maxResults) throws Exception {
        YouTube youtube = getYouTubeService();
        
        // Use search with education category and sort by relevance to get popular educational videos
        YouTube.Search.List search = youtube.search().list(Arrays.asList("id", "snippet"));
        search.setKey(apiKey);
        search.setType(Arrays.asList("video"));
        search.setVideoCategoryId("27"); // Education category
        search.setOrder("viewCount"); // Most viewed
        search.setMaxResults((long) maxResults);
        search.setFields("items(id/videoId,snippet/title,snippet/description,snippet/channelTitle,snippet/thumbnails/medium/url,snippet/publishedAt)");
        
        SearchListResponse searchResponse = search.execute();
        List<SearchResult> searchResults = searchResponse.getItems();
        
        if (searchResults == null || searchResults.isEmpty()) {
            return new ArrayList<>();
        }
        
        List<String> videoIds = searchResults.stream()
                .map(result -> result.getId().getVideoId())
                .collect(Collectors.toList());
        
        return getVideoDetails(videoIds);
    }
    
    public VideoItem getVideoById(String videoId) throws Exception {
        YouTube youtube = getYouTubeService();
        
        YouTube.Videos.List request = youtube.videos().list(Arrays.asList("id", "snippet", "statistics", "contentDetails"));
        request.setKey(apiKey);
        request.setId(Arrays.asList(videoId));
        
        VideoListResponse response = request.execute();
        List<Video> videos = response.getItems();
        
        if (videos.isEmpty()) {
            return null;
        }
        
        return convertToVideoItem(videos.get(0));
    }
    
    private List<VideoItem> getVideoDetails(List<String> videoIds) throws Exception {
        if (videoIds == null || videoIds.isEmpty()) {
            return new ArrayList<>();
        }
        
        YouTube youtube = getYouTubeService();
        
        YouTube.Videos.List request = youtube.videos().list(Arrays.asList("id", "snippet", "statistics", "contentDetails"));
        request.setKey(apiKey);
        request.setId(videoIds);
        
        VideoListResponse response = request.execute();
        List<Video> videos = response.getItems();
        
        if (videos == null) {
            return new ArrayList<>();
        }
        
        return videos.stream()
                .map(this::convertToVideoItem)
                .collect(Collectors.toList());
    }
    
    private VideoItem convertToVideoItem(Video video) {
        VideoItem item = new VideoItem();
        item.setVideoId(video.getId());
        item.setTitle(video.getSnippet().getTitle());
        item.setDescription(video.getSnippet().getDescription());
        item.setChannelTitle(video.getSnippet().getChannelTitle());
        item.setThumbnailUrl(video.getSnippet().getThumbnails().getMedium().getUrl());
        item.setPublishedAt(video.getSnippet().getPublishedAt().toString());
        
        if (video.getStatistics() != null) {
            item.setViewCount(video.getStatistics().getViewCount() != null ? 
                    video.getStatistics().getViewCount().toString() : "0");
            item.setLikeCount(video.getStatistics().getLikeCount() != null ? 
                    video.getStatistics().getLikeCount().toString() : "0");
        }
        
        if (video.getContentDetails() != null) {
            item.setDuration(video.getContentDetails().getDuration());
        }
        
        return item;
    }
    
    public List<PlaylistItem> searchPlaylists(String query, int maxResults) throws Exception {
        YouTube youtube = getYouTubeService();
        
        YouTube.Search.List search = youtube.search().list(Arrays.asList("id", "snippet"));
        search.setKey(apiKey);
        search.setQ(query);
        search.setType(Arrays.asList("playlist"));
        search.setMaxResults((long) maxResults);
        search.setFields("items(id/playlistId,snippet/title,snippet/description,snippet/channelTitle,snippet/thumbnails/medium/url,snippet/publishedAt)");
        
        SearchListResponse searchResponse = search.execute();
        List<SearchResult> searchResults = searchResponse.getItems();
        
        if (searchResults == null || searchResults.isEmpty()) {
            return new ArrayList<>();
        }
        
        List<String> playlistIds = searchResults.stream()
                .map(result -> result.getId().getPlaylistId())
                .collect(Collectors.toList());
        
        return getPlaylistDetails(playlistIds);
    }
    
    private List<PlaylistItem> getPlaylistDetails(List<String> playlistIds) throws Exception {
        if (playlistIds == null || playlistIds.isEmpty()) {
            return new ArrayList<>();
        }
        
        YouTube youtube = getYouTubeService();
        
        YouTube.Playlists.List request = youtube.playlists().list(Arrays.asList("id", "snippet", "contentDetails"));
        request.setKey(apiKey);
        request.setId(playlistIds);
        
        PlaylistListResponse response = request.execute();
        List<Playlist> playlists = response.getItems();
        
        if (playlists == null) {
            return new ArrayList<>();
        }
        
        return playlists.stream()
                .map(this::convertToPlaylistItem)
                .collect(Collectors.toList());
    }
    
    private PlaylistItem convertToPlaylistItem(Playlist playlist) {
        PlaylistItem item = new PlaylistItem();
        item.setPlaylistId(playlist.getId());
        item.setTitle(playlist.getSnippet().getTitle());
        item.setDescription(playlist.getSnippet().getDescription());
        item.setChannelTitle(playlist.getSnippet().getChannelTitle());
        item.setThumbnailUrl(playlist.getSnippet().getThumbnails().getMedium().getUrl());
        item.setPublishedAt(playlist.getSnippet().getPublishedAt().toString());
        
        if (playlist.getContentDetails() != null && playlist.getContentDetails().getItemCount() != null) {
            item.setVideoCount(playlist.getContentDetails().getItemCount().toString());
        } else {
            item.setVideoCount("0");
        }
        
        return item;
    }
    
    public List<VideoItem> getPlaylistVideos(String playlistId, int maxResults) throws Exception {
        YouTube youtube = getYouTubeService();
        
        YouTube.PlaylistItems.List request = youtube.playlistItems().list(Arrays.asList("snippet", "contentDetails"));
        request.setKey(apiKey);
        request.setPlaylistId(playlistId);
        request.setMaxResults((long) maxResults);
        
        com.google.api.services.youtube.model.PlaylistItemListResponse response = request.execute();
        List<com.google.api.services.youtube.model.PlaylistItem> playlistItems = response.getItems();
        
        if (playlistItems == null || playlistItems.isEmpty()) {
            return new ArrayList<>();
        }
        
        List<String> videoIds = playlistItems.stream()
                .map(item -> item.getContentDetails().getVideoId())
                .collect(Collectors.toList());
        
        return getVideoDetails(videoIds);
    }
    
    public PlaylistItem getPlaylistById(String playlistId) throws Exception {
        YouTube youtube = getYouTubeService();
        
        YouTube.Playlists.List request = youtube.playlists().list(Arrays.asList("id", "snippet", "contentDetails"));
        request.setKey(apiKey);
        request.setId(Arrays.asList(playlistId));
        
        PlaylistListResponse response = request.execute();
        List<Playlist> playlists = response.getItems();
        
        if (playlists == null || playlists.isEmpty()) {
            return null;
        }
        
        return convertToPlaylistItem(playlists.get(0));
    }
}
