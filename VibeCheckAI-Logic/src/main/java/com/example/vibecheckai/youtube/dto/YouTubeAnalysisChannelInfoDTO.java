package com.example.vibecheckai.youtube.dto;

public record YouTubeAnalysisChannelInfoDTO (
    String title,
    String description,
    String customUrl,
    String publishedAt,
    int viewCount,
    int subscriberCount,
    int videoCount
) {

}

