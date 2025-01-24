package com.example.vibecheckai.dto.youtube;

public record YouTubeAnalysisVideoStatisticsProjection(
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

