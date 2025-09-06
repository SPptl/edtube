package com.edtube.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;

@Service
public class YouTubeService {
    private static final String API_KEY = "AIzaSyBfbj1x-1s6958mU_4jxH3V3EjcseelVXs";
    private static final String BASE_URL = "https://www.googleapis.com/youtube/v3";

    private final RestTemplate restTemplate = new RestTemplate();

    public String searchPlaylists(String query) {
        String url = UriComponentsBuilder.fromHttpUrl(BASE_URL + "/search")
                .queryParam("part", "snippet")
                .queryParam("q", query)
                .queryParam("type", "playlist")
                .queryParam("key", API_KEY)
                .toUriString();

        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response.getBody();
    }

    public String getPlaylistVideos(String playlistId) {
        String url = UriComponentsBuilder.fromHttpUrl(BASE_URL + "/playlistItems")
                .queryParam("part", "snippet")
                .queryParam("playlistId", playlistId)
                .queryParam("maxResults", 10)
                .queryParam("key", API_KEY)
                .toUriString();

        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response.getBody();
    }
}

