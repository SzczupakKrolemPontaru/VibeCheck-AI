package com.example.vibecheckai.youtube;

import com.example.vibecheckai.youtube.model.response.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analysis")
public class YouTubeVideoController {

    @Autowired
    private final YouTubeApiService youTubeApiService;
    private final String pythonServiceUrl = "http://localhost:5172";
    private final String sentimentAnalysisEndpoint = "/sentimentAnalysis/";
    private final String emotionsAnalysisEndpoint = "/emotionAnalysis/";

    public YouTubeVideoController(YouTubeApiService youTubeApiService) {
        this.youTubeApiService = youTubeApiService;
    }

    @CrossOrigin(origins = "http://localhost:5173/")
    @GetMapping("/videoAnalysis")
    public ResponseEntity<YouTubeAnalysisResponseDTO> getYouTubeVideoAnalysis(@RequestParam String videoLink) throws JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<SentimentEnum, Integer> aggregatedSentiments = initializeSentimentMap();
        Map<EmotionsEnum, Integer> aggregatedEmotions = initializeEmotionMap();

        RestTemplate restTemplate = new RestTemplate();
        String nextPageToken = null;
        List<String> commentBuffer = new ArrayList<>();
        String videoId = extractVideoId(videoLink);

        do {
            List<String> comments = youTubeApiService.getPaginatedComments(videoId, nextPageToken);
            commentBuffer.addAll(comments);

            if (commentBuffer.size() >= 500 || nextPageToken == null) {
                String requestJson = createRequestJson(commentBuffer);
                HttpEntity<String> entity = new HttpEntity<>(requestJson, headers);

                ResponseEntity<String> sentimentAnalysisResponse = restTemplate.postForEntity(pythonServiceUrl + sentimentAnalysisEndpoint, entity, String.class);
                Map<SentimentEnum, Integer> sentiments = parseSentimentAnalysisResponse(sentimentAnalysisResponse.getBody());
                aggregateSentimentAnalysisResults(aggregatedSentiments, sentiments);

                ResponseEntity<String> emotionAnalysisResponse = restTemplate.postForEntity(pythonServiceUrl + emotionsAnalysisEndpoint, entity, String.class);
                Map<EmotionsEnum, Integer> emotions = parseEmotionAnalysisResponse(emotionAnalysisResponse.getBody());
                aggregateEmotionAnalysisResults(aggregatedEmotions, emotions);

                commentBuffer.clear();
            }

            nextPageToken = youTubeApiService.getNextPageToken(videoId, nextPageToken);
        } while (nextPageToken != null);

        if (!commentBuffer.isEmpty()) {
            String requestJson = createRequestJson(commentBuffer);
            HttpEntity<String> entity = new HttpEntity<>(requestJson, headers);

            ResponseEntity<String> sentimentAnalysisResponse = restTemplate.postForEntity(pythonServiceUrl + sentimentAnalysisEndpoint, entity, String.class);
            Map<SentimentEnum, Integer> sentiments = parseSentimentAnalysisResponse(sentimentAnalysisResponse.getBody());
            aggregateSentimentAnalysisResults(aggregatedSentiments, sentiments);

            ResponseEntity<String> emotionAnalysisResponse = restTemplate.postForEntity(pythonServiceUrl + emotionsAnalysisEndpoint, entity, String.class);
            Map<EmotionsEnum, Integer> emotions = parseEmotionAnalysisResponse(emotionAnalysisResponse.getBody());
            aggregateEmotionAnalysisResults(aggregatedEmotions, emotions);

            commentBuffer.clear();
        }

        YouTubeAnalysisVideoStatistics videoStatistics = youTubeApiService.getVideoDetails(videoId);
        YouTubeAnalysisChannelInfoDTO channelInfo = youTubeApiService.getChannelDetails(videoStatistics.channelId());

        YouTubeAnalysisResponseDTO youTubeAnalysisResponse = new YouTubeAnalysisResponseDTO(
                videoStatistics,
                channelInfo,
                aggregatedEmotions,
                aggregatedSentiments,
                null
        );

        return ResponseEntity.ok(youTubeAnalysisResponse);
    }

    private Map<SentimentEnum, Integer> initializeSentimentMap() {
        Map<SentimentEnum, Integer> map = new HashMap<>();
        for (SentimentEnum sentiment : SentimentEnum.values()) {
            map.put(sentiment, 0);
        }
        return map;
    }

    private Map<EmotionsEnum, Integer> initializeEmotionMap() {
        Map<EmotionsEnum, Integer> map = new HashMap<>();
        for (EmotionsEnum emotion : EmotionsEnum.values()) {
            map.put(emotion, 0);
        }
        return map;
    }

    private void aggregateSentimentAnalysisResults(Map<SentimentEnum, Integer> aggregated, Map<SentimentEnum, Integer> toAdd) {
        for (Map.Entry<SentimentEnum, Integer> entry : toAdd.entrySet()) {
            aggregated.put(entry.getKey(), aggregated.get(entry.getKey()) + entry.getValue());
        }
    }

    private void aggregateEmotionAnalysisResults(Map<EmotionsEnum, Integer> aggregated, Map<EmotionsEnum, Integer> toAdd) {
        for (Map.Entry<EmotionsEnum, Integer> entry : toAdd.entrySet()) {
            aggregated.put(entry.getKey(), aggregated.get(entry.getKey()) + entry.getValue());
        }
    }

    private String createRequestJson(List<String> youTubeVideoComments) throws JsonProcessingException {
        return "{\"comments\": " + new ObjectMapper().writeValueAsString(youTubeVideoComments) + "}";
    }

    private Map<SentimentEnum, Integer> parseSentimentAnalysisResponse(String responseBody) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(responseBody, new TypeReference<Map<SentimentEnum, Integer>>() {});
    }

    private Map<EmotionsEnum, Integer> parseEmotionAnalysisResponse(String responseBody) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(responseBody, new TypeReference<Map<EmotionsEnum, Integer>>() {});
    }

    private String extractVideoId(String videoLink) {
        if (videoLink == null || !videoLink.contains("v=")) {
            throw new IllegalArgumentException("Invalid YouTube video link");
        }
        return videoLink.split("v=")[1].split("&")[0];
    }
}
