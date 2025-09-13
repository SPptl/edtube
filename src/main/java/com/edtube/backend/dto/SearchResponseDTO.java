package com.edtube.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchResponseDTO {
    private List<VideoDTO> videos;
    private List<PlaylistDTO> playlists;
    private String nextPageToken;
    private Long totalResults;
}
