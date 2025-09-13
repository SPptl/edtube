package com.edtube.backend.controller;

import com.edtube.backend.entity.User;
import com.edtube.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public Map<String, Object> getUserProfile(Authentication authentication) {
        Map<String, Object> response = new HashMap<>();
        
        if (authentication != null && authentication.isAuthenticated()) {
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            String googleId = oauth2User.getAttribute("sub");
            
            User user = userService.findByGoogleId(googleId).orElse(null);
            if (user != null) {
                response.put("success", true);
                response.put("user", Map.of(
                    "googleId", user.getGoogleId(),
                    "email", user.getEmail(),
                    "name", user.getName(),
                    "pictureUrl", user.getPictureUrl(),
                    "createdAt", user.getCreatedAt()
                ));
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

    @GetMapping("/check")
    public Map<String, Object> checkAuthentication(Authentication authentication) {
        Map<String, Object> response = new HashMap<>();
        response.put("authenticated", authentication != null && authentication.isAuthenticated());
        return response;
    }
}
