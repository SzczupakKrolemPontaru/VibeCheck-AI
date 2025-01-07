package com.example.vibecheckai.youtube;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.util.UriUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class YouTubeApiService {

    @Value("${youtube.api.key}")
    private String apiKey;

    public List<String> getPaginatedComments(String videoId, String pageToken) {
        Map<String, Object> response = fetchComments(videoId, pageToken);
        List<String> pageComments = new ArrayList<>();
        processComments(response, pageComments);
        return pageComments;
    }

    public String getNextPageToken(String videoId, String pageToken) {
        Map<String, Object> response = fetchComments(videoId, pageToken);
        return getNextPageToken(response);
    }

    private Map<String, Object> fetchComments(String videoId, String pageToken) {
        RestTemplate restTemplate = new RestTemplate();
        String url = buildCommentsUrl(videoId, pageToken);
        return restTemplate.getForObject(url, Map.class);
    }

    private void processComments(Map<String, Object> response, List<String> allComments) {
        if (response != null && response.containsKey("items")) {
            List<Map<String, Object>> items = (List<Map<String, Object>>) response.get("items");
            for (Map<String, Object> item : items) {
                extractCommentFromItem(item, allComments);
                extractRepliesFromItem(item, allComments);
            }
        }
    }

    private void extractCommentFromItem(Map<String, Object> item, List<String> allComments) {
        Map<String, Object> snippet = (Map<String, Object>) item.get("snippet");
        if (snippet != null) {
            Map<String, Object> topLevelComment = (Map<String, Object>) snippet.get("topLevelComment");
            if (topLevelComment != null) {
                Map<String, Object> topLevelCommentSnippet = (Map<String, Object>) topLevelComment.get("snippet");
                if (topLevelCommentSnippet != null) {
                    String comment = (String) topLevelCommentSnippet.get("textOriginal");
                    if (comment != null) {
                        allComments.add(comment);
                    }
                }
            }
        }
    }

    private void extractRepliesFromItem(Map<String, Object> item, List<String> allComments) {
        if (item.containsKey("replies")) {
            List<Map<String, Object>> replies = (List<Map<String, Object>>) ((Map<String, Object>) item.get("replies")).get("comments");
            for (Map<String, Object> reply : replies) {
                Map<String, Object> replySnippet = (Map<String, Object>) reply.get("snippet");
                if (replySnippet != null) {
                    String replyText = (String) replySnippet.get("textOriginal");
                    if (replyText != null) {
                        allComments.add(replyText);
                    }
                }
            }
        }
    }

    private String getNextPageToken(Map<String, Object> response) {
        return removeTrailingEquals((String) response.get("nextPageToken"));
    }

    private String buildCommentsUrl(String videoId, String pageToken) {
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl("https://www.googleapis.com/youtube/v3/commentThreads")
                .queryParam("part", "snippet,replies")
                .queryParam("videoId", videoId)
                .queryParam("key", apiKey)
                .queryParam("textFormat", "plainText")
                .queryParam("maxResults", 100);

        if (pageToken != null) {
            builder.queryParam("pageToken", UriUtils.encode(pageToken, "UTF-8"));
        }

        return builder.toUriString();
    }

    private String removeTrailingEquals(String token) {
        if (token == null) {
            return null;
        }
        return token.replaceAll("=+$", "");
    }
}
