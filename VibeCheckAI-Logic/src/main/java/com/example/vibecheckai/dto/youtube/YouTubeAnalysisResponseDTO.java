package com.example.vibecheckai.dto.youtube;

import com.example.vibecheckai.shared.enums.EmotionsEnum;
import com.example.vibecheckai.shared.enums.SentimentEnum;

import java.util.Map;

public record YouTubeAnalysisResponseDTO(
    YouTubeAnalysisVideoStatisticsProjection videoStatisticsInfo,
    YouTubeAnalysisChannelInfoProjection channelInfo,
    Map<EmotionsEnum, Integer> emotions,
    Map<SentimentEnum, Integer> sentiments,
    Float toxicity
) {

}


