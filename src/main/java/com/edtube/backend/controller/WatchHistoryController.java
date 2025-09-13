package com.edtube.backend.controller;

import com.edtube.backend.dto.VideoDTO;
import com.edtube.backend.entity.User;
import com.edtube.backend.service.UserService;
import com.edtube.backend.service.WatchHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/history")
@CrossOrigin(origins = "http://localhost:3000")
public class WatchHistoryController {

    @Autowired
    private WatchHistoryService watchHistoryService;

    @Autowired
    private UserService userService;

    @GetMapping("/recent")
    public Map<String, Object> getRecentHistory(
            Authentication authentication,
            @RequestParam(defaultValue = "10") int limit) {
        
        Map<String, Object> response = new HashMap<>();
        
        if (authentication != null && authentication.isAuthenticated()) {
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            String googleId = oauth2User.getAttribute("sub");
            
            User user = userService.findByGoogleId(googleId).orElse(null);
            if (user != null) {
                List<VideoDTO> recentVideos = watchHistoryService.getRecentVideos(googleId, limit);
                List<VideoDTO> recentPlaylists = watchHistoryService.getRecentPlaylists(googleId, limit);
                
                response.put("success", true);
                response.put("videos", recentVideos);
                response.put("playlists", recentPlaylists);
            } else {
                response.put("success", false);
                response.put("message", "User not found");
            }
        } else {
            response.put("success", false);
            response.put("message", "Not authenticated");
        }
        
        return response;
    }

    @PostMapping("/add")
    public Map<String, Object> addToHistory(
            Authentication authentication,
            @RequestBody Map<String, Object> request) {
        
        Map<String, Object> response = new HashMap<>();
        
        if (authentication != null && authentication.isAuthenticated()) {
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            String googleId = oauth2User.getAttribute("sub");
            
            User user = userService.findByGoogleId(googleId).orElse(null);
            if (user != null) {
                try {
                    String videoId = (String) request.get("videoId");
                    String title = (String) request.get("title");
                    String thumbnail = (String) request.get("thumbnail");
                    String channelTitle = (String) request.get("channelTitle");
                    String duration = (String) request.get("duration");
                    Integer watchTime = (Integer) request.get("watchTime");
                    Boolean isPlaylist = (Boolean) request.get("isPlaylist");
                    String playlistId = (String) request.get("playlistId");
                    
                    VideoDTO video = new VideoDTO();
                    video.setVideoId(videoId);
                    video.setTitle(title);
                    video.setThumbnailUrl(thumbnail);
                    video.setChannelTitle(channelTitle);
                    video.setDuration(duration);
                    
                    watchHistoryService.addToWatchHistory(
                        user, video, watchTime, 
                        isPlaylist != null ? isPlaylist : false, 
                        playlistId
                    );
                    
                    response.put("success", true);
                    response.put("message", "Added to watch history");
                } catch (Exception e) {
                    response.put("success", false);
                    response.put("message", "Error adding to history: " + e.getMessage());
                }
            } else {
                response.put("success", false);
                response.put("message", "User not found");
            }
        } else {
            response.put("success", false);
            response.put("message", "Not authenticated");
        }
        
        return response;
    }
}
