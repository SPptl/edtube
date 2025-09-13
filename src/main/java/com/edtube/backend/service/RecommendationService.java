package com.edtube.backend.service;

import com.edtube.backend.dto.VideoDTO;
import com.edtube.backend.entity.User;
import com.edtube.backend.repository.WatchHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecommendationService {
    
    @Autowired
    private WatchHistoryRepository watchHistoryRepository;
    
    @Autowired
    private YouTubeService youTubeService;
    
    public List<VideoDTO> getRecommendations(String googleId, int limit) {
        try {
            // Get watched channels
            List<String> watchedChannels = watchHistoryRepository.findWatchedChannels(googleId);
            
            if (watchedChannels.isEmpty()) {
                // If no history, return popular educational content
                return youTubeService.searchEducationalContent("programming tutorial", null).getVideos()
                        .stream()
                        .limit(limit)
                        .collect(Collectors.toList());
            }
            
            // Get recommendations based on most watched channel
            String topChannel = watchedChannels.get(0);
            return youTubeService.searchEducationalContent(topChannel + " tutorial", null).getVideos()
                    .stream()
                    .limit(limit)
                    .collect(Collectors.toList());
                    
        } catch (Exception e) {
            e.printStackTrace();
            return youTubeService.searchEducationalContent("programming tutorial", null).getVideos()
                    .stream()
                    .limit(limit)
                    .collect(Collectors.toList());
        }
    }
}
