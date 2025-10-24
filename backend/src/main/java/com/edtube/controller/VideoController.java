package com.edtube.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.edtube.model.PlaylistItem;
import com.edtube.model.VideoItem;
import com.edtube.service.YoutubeService;

@RestController
@RequestMapping("/api/videos")
public class VideoController {
    
    @Autowired
    private YoutubeService youtubeService;
    
    @GetMapping("/search")
    public ResponseEntity<List<VideoItem>> searchVideos(
            @RequestParam String query,
            @RequestParam(defaultValue = "20") int maxResults) {
        try {
            List<VideoItem> videos = youtubeService.searchVideos(query, maxResults);
            return ResponseEntity.ok(videos);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/playlists/search")
    public ResponseEntity<List<PlaylistItem>> searchPlaylists(
            @RequestParam String query,
            @RequestParam(defaultValue = "20") int maxResults) {
        try {
            List<PlaylistItem> playlists = youtubeService.searchPlaylists(query, maxResults);
            return ResponseEntity.ok(playlists);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/trending")
    public ResponseEntity<List<VideoItem>> getTrendingVideos(
            @RequestParam(defaultValue = "20") int maxResults) {
        try {
            List<VideoItem> videos = youtubeService.getTrendingVideos(maxResults);
            return ResponseEntity.ok(videos);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/{videoId}")
    public ResponseEntity<VideoItem> getVideoById(@PathVariable String videoId) {
        try {
            VideoItem video = youtubeService.getVideoById(videoId);
            if (video != null) {
                return ResponseEntity.ok(video);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/playlists/{playlistId}")
    public ResponseEntity<PlaylistItem> getPlaylistById(@PathVariable String playlistId) {
        try {
            PlaylistItem playlist = youtubeService.getPlaylistById(playlistId);
            if (playlist != null) {
                return ResponseEntity.ok(playlist);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/playlists/{playlistId}/videos")
    public ResponseEntity<List<VideoItem>> getPlaylistVideos(
            @PathVariable String playlistId,
            @RequestParam(defaultValue = "50") int maxResults) {
        try {
            List<VideoItem> videos = youtubeService.getPlaylistVideos(playlistId, maxResults);
            return ResponseEntity.ok(videos);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
