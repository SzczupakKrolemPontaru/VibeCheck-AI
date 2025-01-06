package com.example.vibecheckai.youtube;

import com.example.vibecheckai.youtube.model.YouTubeVideoCommentDTO;
import com.example.vibecheckai.youtube.model.YouTubeVideoCommentResponseDTO;
import com.example.vibecheckai.youtube.model.YouTubeVideoCommentThreadDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class YouTubeVideoAnalysis {

    @Value("${youtube.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public YouTubeVideoAnalysis() {
        this.restTemplate = new RestTemplate();
    }

    private String extractVideoId(String videoLink) {
        if (videoLink == null || !videoLink.contains("v=")) {
            throw new IllegalArgumentException("Invalid YouTube video link");
        }
        return videoLink.split("v=")[1].split("&")[0];
    }

    public Map<String, String> getVideoComments(String videoLink) {
        String videoId = extractVideoId(videoLink);
        YouTubeVideoCommentResponseDTO response = fetchCommentsFromYouTube(videoId);
        return getAllCommentsWithIds(response);
    }

    private YouTubeVideoCommentResponseDTO fetchCommentsFromYouTube(String videoId) {
        String url = buildYouTubeApiUrl(videoId);
        return restTemplate.getForObject(url, YouTubeVideoCommentResponseDTO.class);
    }

    private String buildYouTubeApiUrl(String videoId) {
        return UriComponentsBuilder.fromHttpUrl("https://www.googleapis.com/youtube/v3/commentThreads")
                .queryParam("part", "snippet,replies")
                .queryParam("videoId", videoId)
                .queryParam("key", apiKey)
                .queryParam("textFormat", "plainText")
                .toUriString();
    }

    private Map<String, String> getAllCommentsWithIds(YouTubeVideoCommentResponseDTO youtubeResponse) {
        Map<String, String> allComments = new HashMap<String, String>();

        for (YouTubeVideoCommentThreadDTO commentThread : youtubeResponse.getItems()) {
            String topLevelCommentText = commentThread.getSnippet().getTopLevelComment().getSnippet().getTextOriginal();
            String topLevelCommentId = commentThread.getSnippet().getTopLevelComment().getId();
            allComments.put(topLevelCommentId, topLevelCommentText);

            if (commentThread.getReplies() != null && commentThread.getReplies().getComments() != null) {
                for (YouTubeVideoCommentDTO reply : commentThread.getReplies().getComments()) {
                    String replyText = reply.getSnippet().getTextOriginal();
                    String id = reply.getId();
                    allComments.put(id, replyText);
                }
            }
        }

        return allComments;
    }
}