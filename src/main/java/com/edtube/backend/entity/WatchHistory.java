package com.edtube.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "watch_history")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WatchHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "google_id")
    private User user;
    
    @Column(name = "video_id", nullable = false)
    private String videoId;
    
    @Column(name = "video_title", nullable = false)
    private String videoTitle;
    
    @Column(name = "video_thumbnail")
    private String videoThumbnail;
    
    @Column(name = "channel_title")
    private String channelTitle;
    
    @Column(name = "duration")
    private String duration;
    
    @Column(name = "watch_time_seconds")
    private Integer watchTimeSeconds;
    
    @Column(name = "is_playlist")
    private Boolean isPlaylist = false;
    
    @Column(name = "playlist_id")
    private String playlistId;
    
    @Column(name = "watched_at")
    private LocalDateTime watchedAt;
    
    @PrePersist
    protected void onCreate() {
        watchedAt = LocalDateTime.now();
    }
}
