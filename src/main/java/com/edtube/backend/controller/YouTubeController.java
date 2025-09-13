package com.edtube.backend.controller;

import com.edtube.backend.dto.SearchResponseDTO;
import com.edtube.backend.dto.VideoDTO;
import com.edtube.backend.service.YouTubeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/youtube")
@CrossOrigin(origins = "http://localhost:3000")
public class YouTubeController {

    @Autowired
    private YouTubeService youTubeService;

    @GetMapping("/search")
    public SearchResponseDTO searchEducationalContent(
            @RequestParam String query,
            @RequestParam(required = false) String pageToken) {
        return youTubeService.searchEducationalContent(query, pageToken);
    }

    @GetMapping("/video/{videoId}")
    public VideoDTO getVideoDetails(@PathVariable String videoId) {
        return youTubeService.getVideoDetails(videoId);
    }

    @GetMapping("/playlist/{playlistId}/videos")
    public List<VideoDTO> getPlaylistVideos(@PathVariable String playlistId) {
        return youTubeService.getPlaylistVideos(playlistId);
    }
}
