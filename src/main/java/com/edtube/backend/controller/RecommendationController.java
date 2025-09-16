package com.edtube.backend.controller;

import com.edtube.backend.dto.VideoDTO;
import com.edtube.backend.entity.User;
import com.edtube.backend.service.RecommendationService;
import com.edtube.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin(origins = "http://localhost:3000")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @Autowired
    private UserService userService;

    @GetMapping("/videos")
    public Map<String, Object> getRecommendations(
            Authentication authentication,
            @RequestParam(defaultValue = "10") int limit) {
        
        Map<String, Object> response = new HashMap<>();
        
        if (authentication != null && authentication.isAuthenticated()) {
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            String googleId = oauth2User.getAttribute("sub");
            
            User user = userService.findByGoogleId(googleId).orElse(null);
            if (user != null) {
                List<VideoDTO> recommendations = recommendationService.getRecommendations(googleId, limit);
                
                response.put("success", true);
                response.put("videos", recommendations);
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
