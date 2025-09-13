package com.edtube.backend.service;

import com.edtube.backend.dto.VideoDTO;
import com.edtube.backend.entity.User;
import com.edtube.backend.entity.WatchHistory;
import com.edtube.backend.repository.WatchHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WatchHistoryService {
    
    @Autowired
    private WatchHistoryRepository watchHistoryRepository;
    
    public void addToWatchHistory(User user, VideoDTO video, Integer watchTimeSeconds, boolean isPlaylist, String playlistId) {
        // Check if already exists
        if (watchHistoryRepository.existsByUserGoogleIdAndVideoId(user.getGoogleId(), video.getVideoId())) {
            return; // Don't add duplicates
        }
        
        WatchHistory history = new WatchHistory();
        history.setUser(user);
        history.setVideoId(video.getVideoId());
        history.setVideoTitle(video.getTitle());
        history.setVideoThumbnail(video.getThumbnailUrl());
        history.setChannelTitle(video.getChannelTitle());
        history.setDuration(video.getDuration());
        history.setWatchTimeSeconds(watchTimeSeconds);
        history.setIsPlaylist(isPlaylist);
        history.setPlaylistId(playlistId);
        history.setWatchedAt(LocalDateTime.now());
        
        watchHistoryRepository.save(history);
    }
    
    public List<VideoDTO> getWatchHistory(String googleId, int limit) {
        List<WatchHistory> history = watchHistoryRepository.findRecentWatchHistory(googleId)
                .stream()
                .limit(limit)
                .collect(Collectors.toList());
        
        return history.stream().map(this::convertToVideoDTO).collect(Collectors.toList());
    }
    
    public List<VideoDTO> getRecentVideos(String googleId, int limit) {
        List<WatchHistory> history = watchHistoryRepository
                .findByUserGoogleIdAndIsPlaylistOrderByWatchedAtDesc(googleId, false)
                .stream()
                .limit(limit)
                .collect(Collectors.toList());
        
        return history.stream().map(this::convertToVideoDTO).collect(Collectors.toList());
    }
    
    public List<VideoDTO> getRecentPlaylists(String googleId, int limit) {
        List<WatchHistory> history = watchHistoryRepository
                .findByUserGoogleIdAndIsPlaylistOrderByWatchedAtDesc(googleId, true)
                .stream()
                .limit(limit)
                .collect(Collectors.toList());
        
        return history.stream().map(this::convertToVideoDTO).collect(Collectors.toList());
    }
    
    private VideoDTO convertToVideoDTO(WatchHistory history) {
        VideoDTO video = new VideoDTO();
        video.setVideoId(history.getVideoId());
        video.setTitle(history.getVideoTitle());
        video.setThumbnailUrl(history.getVideoThumbnail());
        video.setChannelTitle(history.getChannelTitle());
        video.setDuration(history.getDuration());
        video.setVideoUrl("https://www.youtube.com/watch?v=" + history.getVideoId());
        return video;
    }
}
