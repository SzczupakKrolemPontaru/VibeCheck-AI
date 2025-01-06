package com.example.vibecheckai.youtube.model;

import java.util.List;

public class YouTubeVideoCommentResponseDTO {
    private String kind;
    private String etag;
    private String nextPageToken;
    private List<YouTubeVideoCommentThreadDTO> items;

    public String getKind() {
        return kind;
    }

    public String getEtag() {
        return etag;
    }

    public String getNextPageToken() {
        return nextPageToken;
    }

    public List<YouTubeVideoCommentThreadDTO> getItems() {
        return items;
    }
}