package com.example.vibecheckai;
import com.example.vibecheckai.youtube.YouTubeVideoAnalysis;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.util.Map;

@RestController
@RequestMapping("/api/sentiment")
public class SentimentController {

    private final YouTubeVideoAnalysis youTubeVideoAnalysis;
    private final String pythonServiceUrl = "http://localhost:5172/analyze";
    private final String sentimentAnalysisEndpoint = "/sentimentAnalysis";
    public SentimentController(YouTubeVideoAnalysis youTubeVideoAnalysis) {
        this.youTubeVideoAnalysis = youTubeVideoAnalysis;
    }

    @PostMapping("/analyzeComments")
    public ResponseEntity<String> analyzeComments(@RequestBody String videoLink) throws JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> commentsWithIds = youTubeVideoAnalysis.getVideoComments(videoLink);

        String requestJson = "{\"comments\": " + new ObjectMapper().writeValueAsString(commentsWithIds) + "}";

        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<String> entity = new HttpEntity<>(requestJson, headers);
        ResponseEntity<String> sentimentAnalysis = restTemplate.postForEntity(pythonServiceUrl + sentimentAnalysisEndpoint,
                entity, String.class);
        return ResponseEntity.ok(sentimentAnalysis.getBody());
    }
}

