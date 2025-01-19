package com.example.vibecheckai.youtube.dto;

import com.example.vibecheckai.enums.EmotionsEnum;
import com.example.vibecheckai.enums.SentimentEnum;

import java.util.Map;

public record YouTubeAnalysisResponseDTO(
    YouTubeAnalysisVideoStatistics videoStatisticsInfo,
    YouTubeAnalysisChannelInfoDTO channelInfo,
    Map<EmotionsEnum, Integer> emotions,
    Map<SentimentEnum, Integer> sentiments,
    Float toxicity
) {

}


