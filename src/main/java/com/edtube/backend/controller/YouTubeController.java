package com.edtube.backend.controller;

import com.edtube.backend.service.YouTubeService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/youtube")
public class YouTubeController {

    private final YouTubeService youTubeService;

    public YouTubeController(YouTubeService youTubeService) {
        this.youTubeService = youTubeService;
    }

    @GetMapping("/playlists")
    public String searchPlaylists(@RequestParam String q) {
        return youTubeService.searchPlaylists(q);
    }

    @GetMapping("/videos")
    public String getPlaylistVideos(@RequestParam String playlistId) {
        return youTubeService.getPlaylistVideos(playlistId);
    }
}
