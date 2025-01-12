package com.example.vibecheckai.youtube;

import com.example.vibecheckai.youtube.model.response.EmotionsEnum;
import com.example.vibecheckai.youtube.model.response.SentimentEnum;
import com.example.vibecheckai.youtube.model.response.YouTubeAnalysisResponseDTO;
import com.example.vibecheckai.youtube.model.response.YouTubeAnalysisVideoStatistics;
import com.example.vibecheckai.youtube.model.response.YouTubeAnalysisChannelInfoDTO;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
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
    private final String sentimentAnalysisEndpoint = "/sentimentAnalysis";
    private final String emotionsAnalysisEndpoint = "/emotionAnalysis";

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HttpHeaders headers;

    public YouTubeVideoController(YouTubeApiService youTubeApiService) {
        this.youTubeApiService = youTubeApiService;
        this.headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
    }

    @CrossOrigin(origins = "http://localhost:5173/")
    @GetMapping("/videoAnalysis")
    public ResponseEntity<YouTubeAnalysisResponseDTO> getYouTubeVideoAnalysis(@RequestParam String videoLink) throws JsonProcessingException {
        String videoId = extractVideoId(videoLink);

        Map<SentimentEnum, Integer> aggregatedSentiments = initializeEnumMap(SentimentEnum.class);
        Map<EmotionsEnum, Integer> aggregatedEmotions = initializeEnumMap(EmotionsEnum.class);

        RestTemplate restTemplate = new RestTemplate();
        String nextPageToken = null;
        List<String> commentBuffer = new ArrayList<>();

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

    private void processCommentsBatch(List<String> commentBuffer,
                                      RestTemplate restTemplate,
                                      Map<SentimentEnum, Integer> aggregatedSentiments,
                                      Map<EmotionsEnum, Integer> aggregatedEmotions) throws JsonProcessingException {
        String requestJson = createRequestJson(commentBuffer);
        HttpEntity<String> entity = new HttpEntity<>(requestJson, headers);

        ResponseEntity<String> sentimentAnalysisResponse = restTemplate.postForEntity(pythonServiceUrl + sentimentAnalysisEndpoint, entity, String.class);
        Map<SentimentEnum, Integer> sentiments = parseAnalysisResponse(sentimentAnalysisResponse.getBody(), SentimentEnum.class);
        aggregateSentimentResults(aggregatedSentiments, sentiments);

        ResponseEntity<String> emotionAnalysisResponse = restTemplate.postForEntity(pythonServiceUrl + emotionsAnalysisEndpoint, entity, String.class);
        Map<EmotionsEnum, Integer> emotions = parseAnalysisResponse(emotionAnalysisResponse.getBody(), EmotionsEnum.class);
        aggregateEmotionResults(aggregatedEmotions, emotions);
    }

    private <T extends Enum<T>> Map<T, Integer> initializeEnumMap(Class<T> enumClass) {
        Map<T, Integer> map = new HashMap<>();
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
            throw new IllegalArgumentException("Invalid YouTube video link");
        }
        return videoLink.split("v=")[1].split("&")[0];
    }
}
