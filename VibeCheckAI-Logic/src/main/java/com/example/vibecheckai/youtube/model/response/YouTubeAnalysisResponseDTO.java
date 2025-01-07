package com.example.vibecheckai.youtube.model.response;

import java.util.Map;

public record YouTubeAnalysisResponseDTO(
    YouTubeAnalysisVideoStatistics videoStatisticsInfo,
    YouTubeAnalysisChannelInfoDTO channelInfo,
    Map<EmotionsEnum, Integer> emotions,
    Map<SentimentEnum, Integer> sentiments,
    Float toxicity
) {

}


