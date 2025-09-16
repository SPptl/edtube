package com.edtube.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlaylistDTO {
    private String playlistId;
    private String title;
    private String description;
    private String thumbnailUrl;
    private String channelTitle;
    private String channelId;
    private String publishedAt;
    private Long videoCount;
    private List<VideoDTO> videos;
}
