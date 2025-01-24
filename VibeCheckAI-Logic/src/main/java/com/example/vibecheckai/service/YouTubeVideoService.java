package com.example.vibecheckai.service;

import com.example.vibecheckai.dto.youtube.YouTubeAnalysisChannelInfoProjection;
import com.example.vibecheckai.dto.youtube.YouTubeAnalysisResponseDTO;
import com.example.vibecheckai.dto.youtube.YouTubeAnalysisVideoStatisticsProjection;
import com.example.vibecheckai.shared.enums.EmotionComparator;
import com.example.vibecheckai.shared.enums.EmotionsEnum;
import com.example.vibecheckai.shared.enums.SentimentComparator;
import com.example.vibecheckai.shared.enums.SentimentEnum;
import com.example.vibecheckai.shared.exceptions.EmotionAnalysisException;
import com.example.vibecheckai.shared.exceptions.InvalidYouTubeLinkException;
import com.example.vibecheckai.shared.exceptions.SentimentAnalysisException;
import com.example.vibecheckai.shared.exceptions.YouTubeApiException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class YouTubeVideoService {
    @Autowired
    private final YouTubeApiService youTubeApiService;
    @Value("${python.service.url}")
    private String pythonServiceUrl;

    @Value("${sentiment.analysis.endpoint}")
    private String sentimentAnalysisEndpoint;

    @Value("${emotions.analysis.endpoint}")
    private String emotionsAnalysisEndpoint;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HttpHeaders headers;

    public YouTubeVideoService(YouTubeApiService youTubeApiService) {
        this.youTubeApiService = youTubeApiService;
        this.headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
    }

    public YouTubeAnalysisResponseDTO analyzeVideo(String videoLink) {
        String videoId = extractVideoId(videoLink);

        Map<SentimentEnum, Integer> aggregatedSentiments = initializeEnumMap(SentimentEnum.class, new SentimentComparator());
        Map<EmotionsEnum, Integer> aggregatedEmotions = initializeEnumMap(EmotionsEnum.class, new EmotionComparator());

        RestTemplate restTemplate = new RestTemplate();
        String nextPageToken = null;
        List<String> commentBuffer = new ArrayList<>();

        try {
            do {
                List<String> comments = youTubeApiService.getPaginatedComments(videoId, nextPageToken).join();
                commentBuffer.addAll(comments);

                if (commentBuffer.size() >= 500 || nextPageToken == null) {
                    processCommentsBatch(commentBuffer, restTemplate, aggregatedSentiments, aggregatedEmotions);
                    commentBuffer.clear();
                }

                nextPageToken = youTubeApiService.getNextPageToken(videoId, nextPageToken).join();
            } while (nextPageToken != null);

            if (!commentBuffer.isEmpty()) {
                processCommentsBatch(commentBuffer, restTemplate, aggregatedSentiments, aggregatedEmotions);
            }
        } catch (Exception e) {
            throw new YouTubeApiException("Error while fetching comments or next page token", e);
        }

        YouTubeAnalysisVideoStatisticsProjection videoStatistics;
        YouTubeAnalysisChannelInfoProjection channelInfo;
        try {
            videoStatistics = youTubeApiService.getVideoDetails(videoId);
            channelInfo = youTubeApiService.getChannelDetails(videoStatistics.channelId());
        } catch (Exception e) {
            throw new YouTubeApiException("Error while fetching video or channel details", e);
        }

        return new YouTubeAnalysisResponseDTO(
                videoStatistics,
                channelInfo,
                aggregatedEmotions,
                aggregatedSentiments,
                null
        );
    }

    private void processCommentsBatch(List<String> commentBuffer,
                                      RestTemplate restTemplate,
                                      Map<SentimentEnum, Integer> aggregatedSentiments,
                                      Map<EmotionsEnum, Integer> aggregatedEmotions) throws JsonProcessingException {
        String requestJson = createRequestJson(commentBuffer);
        HttpEntity<String> entity = new HttpEntity<>(requestJson, headers);

        try {
            ResponseEntity<String> sentimentAnalysisResponse = restTemplate.postForEntity(pythonServiceUrl + sentimentAnalysisEndpoint, entity, String.class);
            Map<SentimentEnum, Integer> sentiments = parseAnalysisResponse(sentimentAnalysisResponse.getBody(), SentimentEnum.class);
            aggregateSentimentResults(aggregatedSentiments, sentiments);

            ResponseEntity<String> emotionAnalysisResponse = restTemplate.postForEntity(pythonServiceUrl + emotionsAnalysisEndpoint, entity, String.class);
            Map<EmotionsEnum, Integer> emotions = parseAnalysisResponse(emotionAnalysisResponse.getBody(), EmotionsEnum.class);
            aggregateEmotionResults(aggregatedEmotions, emotions);
        } catch (JsonProcessingException e) {
            throw new SentimentAnalysisException("Error processing sentiment analysis response", e);
        } catch (Exception e) {
            throw new EmotionAnalysisException("Error processing emotion analysis response", e);
        }
    }

    private <T extends Enum<T>> Map<T, Integer> initializeEnumMap(Class<T> enumClass, Comparator<T> comparator) {
        Map<T, Integer> map = new TreeMap<>(comparator);
        for (T constant : enumClass.getEnumConstants()) {
            map.put(constant, 0);
        }
        return map;
    }

    private void aggregateSentimentResults(Map<SentimentEnum, Integer> aggregated, Map<SentimentEnum, Integer> toAdd) {
        toAdd.forEach((key, value) -> aggregated.merge(key, value, Integer::sum));
    }

    private void aggregateEmotionResults(Map<EmotionsEnum, Integer> aggregated, Map<EmotionsEnum, Integer> toAdd) {
        toAdd.forEach((key, value) -> aggregated.merge(key, value, Integer::sum));
    }

    private String createRequestJson(List<String> youTubeVideoComments) throws JsonProcessingException {
        return "{\"comments\": " + objectMapper.writeValueAsString(youTubeVideoComments) + "}";
    }

    private <T extends Enum<T>> Map<T, Integer> parseAnalysisResponse(String responseBody, Class<T> enumClass) throws JsonProcessingException {
        Map<String, Integer> rawResponse = objectMapper.readValue(responseBody, new TypeReference<Map<String, Integer>>() {});

        Map<T, Integer> result = new HashMap<>();
        for (Map.Entry<String, Integer> entry : rawResponse.entrySet()) {
            try {
                T enumValue = Enum.valueOf(enumClass, entry.getKey());
                result.put(enumValue, entry.getValue());
            } catch (IllegalArgumentException e) {
                System.out.println("Nieznana wartość enum: " + entry.getKey());
            }
        }

        return result;
    }

    private String extractVideoId(String videoLink) {
        if (videoLink == null || !videoLink.contains("v=")) {
            throw new InvalidYouTubeLinkException("Invalid YouTube video link");
        }
        return videoLink.split("v=")[1].split("&")[0];
    }
}