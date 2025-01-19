package com.example.vibecheckai.youtube.dto;

public record YouTubeAnalysisVideoStatistics(
    String title,
    String publishedAt,
    String channelId,
    String videoId,
    String thumbnailUrl,
    int viewCount,
    int likeCount,
    int commentCount
) {

}

