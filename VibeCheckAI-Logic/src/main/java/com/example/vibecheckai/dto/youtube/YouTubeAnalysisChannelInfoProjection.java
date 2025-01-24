package com.example.vibecheckai.dto.youtube;

public record YouTubeAnalysisChannelInfoProjection(
    String title,
    String description,
    String customUrl,
    String publishedAt,
    int viewCount,
    int subscriberCount,
    int videoCount
) {

}

