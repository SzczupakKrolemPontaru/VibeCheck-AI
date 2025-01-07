package com.example.vibecheckai.youtube.model.response;

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

