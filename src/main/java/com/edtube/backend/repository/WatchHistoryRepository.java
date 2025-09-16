package com.edtube.backend.repository;

import com.edtube.backend.entity.WatchHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface WatchHistoryRepository extends JpaRepository<WatchHistory, Long> {
    
    List<WatchHistory> findByUserGoogleIdOrderByWatchedAtDesc(String googleId);
    
    List<WatchHistory> findByUserGoogleIdAndIsPlaylistOrderByWatchedAtDesc(String googleId, Boolean isPlaylist);
    
    @Query("SELECT wh FROM WatchHistory wh WHERE wh.user.googleId = :googleId ORDER BY wh.watchedAt DESC")
    List<WatchHistory> findRecentWatchHistory(@Param("googleId") String googleId);
    
    @Query("SELECT DISTINCT wh.channelTitle FROM WatchHistory wh WHERE wh.user.googleId = :googleId")
    List<String> findWatchedChannels(@Param("googleId") String googleId);
    
    boolean existsByUserGoogleIdAndVideoId(String googleId, String videoId);
}
