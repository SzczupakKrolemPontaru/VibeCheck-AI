package com.example.vibecheckai.service;


import com.example.vibecheckai.dto.youtube.YouTubeAnalysisChannelInfoProjection;
import com.example.vibecheckai.dto.youtube.YouTubeAnalysisVideoStatisticsProjection;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.util.UriUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;


@Configuration
@EnableAsync
public class YouTubeApiService {

    @Value("${youtube.api.key}")
    private String apiKey;

    private int allComments = 0;

    @Bean
    public RestTemplate restTemplate() {
        CloseableHttpClient client = HttpClients.custom()
                .build();
        return new RestTemplate(new HttpComponentsClientHttpRequestFactory(client));
    }

    @Async
    public CompletableFuture<List<String>> getPaginatedComments(String videoId, String pageToken) {
        Map<String, Object> response = fetchComments(videoId, pageToken);
        List<String> pageComments = new ArrayList<>();
        processComments(response, pageComments);
        this.allComments += pageComments.size();
        System.out.println("Comments fetched: " + this.allComments);
        return CompletableFuture.completedFuture(pageComments);
    }

    @Async
    public CompletableFuture<String> getNextPageToken(String videoId, String pageToken) {
        Map<String, Object> response = fetchComments(videoId, pageToken);
        String nextPageToken = getNextPageToken(response);
        return CompletableFuture.completedFuture(nextPageToken);
    }

    private Map<String, Object> fetchComments(String videoId, String pageToken) {
        RestTemplate restTemplate = restTemplate();
        String url = buildCommentsUrl(videoId, pageToken);
        return restTemplate.getForObject(url, Map.class);
    }

    @Cacheable("videoDetails")
    public YouTubeAnalysisVideoStatisticsProjection getVideoDetails(String videoId) {
        RestTemplate restTemplate = restTemplate();
        String url = buildVideoDetailsUrl(videoId);
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        return parseVideoDetails(response);
    }

    @Cacheable("channelDetails")
    public YouTubeAnalysisChannelInfoProjection getChannelDetails(String channelId) {
        RestTemplate restTemplate = restTemplate();
        String url = buildChannelDetailsUrl(channelId);
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        return parseChannelDetails(response);
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

    private YouTubeAnalysisVideoStatisticsProjection parseVideoDetails(Map<String, Object> response) {
        if (response == null || !response.containsKey("items")) {
            return null;
        }

        Map<String, Object> videoItem = ((List<Map<String, Object>>) response.get("items")).get(0);
        Map<String, Object> snippet = (Map<String, Object>) videoItem.get("snippet");
        Map<String, Object> statistics = (Map<String, Object>) videoItem.get("statistics");

        String title = (String) snippet.get("title");
        String videoId = (String) videoItem.get("id");
        String publishedAt = (String) snippet.get("publishedAt");
        String channelId = (String) snippet.get("channelId");
        Map<String, Object> thumbnails = (Map<String, Object>) snippet.get("thumbnails");
        Map<String, Object> highThumbnail = (Map<String, Object>) thumbnails.get("high");
        String thumbnailUrl = (String) highThumbnail.get("url");
        int viewCount = Integer.parseInt((String) statistics.get("viewCount"));
        int likeCount = Integer.parseInt((String) statistics.get("likeCount"));
        int commentCount = Integer.parseInt((String) statistics.get("commentCount"));

        return new YouTubeAnalysisVideoStatisticsProjection(title, publishedAt, channelId, videoId, thumbnailUrl, viewCount, likeCount, commentCount);
    }

    private YouTubeAnalysisChannelInfoProjection parseChannelDetails(Map<String, Object> response) {
        if (response == null || !response.containsKey("items")) {
            return null;
        }

        Map<String, Object> channelItem = ((List<Map<String, Object>>) response.get("items")).get(0);
        Map<String, Object> snippet = (Map<String, Object>) channelItem.get("snippet");
        Map<String, Object> statistics = (Map<String, Object>) channelItem.get("statistics");

        String title = (String) snippet.get("title");
        String description = (String) snippet.get("description");
        String customUrl = (String) snippet.get("customUrl");
        String publishedAt = (String) snippet.get("publishedAt");
        int viewCount = Integer.parseInt((String) statistics.get("viewCount"));
        int subscriberCount = Integer.parseInt((String) statistics.get("subscriberCount"));
        int videoCount = Integer.parseInt((String) statistics.get("videoCount"));

        return new YouTubeAnalysisChannelInfoProjection(title, description, customUrl, publishedAt, viewCount, subscriberCount, videoCount);
    }

    private String buildCommentsUrl(String videoId, String pageToken) {
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl("https://www.googleapis.com/youtube/v3/commentThreads")
                .queryParam("part", "snippet,replies")
                .queryParam("videoId", videoId)
                .queryParam("key", apiKey)
                .queryParam("textFormat", "plainText")
                .queryParam("maxResults", 150);

        if (pageToken != null) {
            builder.queryParam("pageToken", UriUtils.encode(pageToken, "UTF-8"));
        }

        return builder.toUriString();
    }

    private String buildVideoDetailsUrl(String videoId) {
        return UriComponentsBuilder.fromHttpUrl("https://www.googleapis.com/youtube/v3/videos")
                .queryParam("part", "snippet,statistics")
                .queryParam("id", videoId)
                .queryParam("key", apiKey)
                .toUriString();
    }

    private String buildChannelDetailsUrl(String channelId) {
        return UriComponentsBuilder.fromHttpUrl("https://www.googleapis.com/youtube/v3/channels")
                .queryParam("part", "snippet,statistics")
                .queryParam("id", channelId)
                .queryParam("key", apiKey)
                .toUriString();
    }

    private String removeTrailingEquals(String token) {
        if (token == null) {
            return null;
        }
        return token.replaceAll("=+$", "");
    }
}
