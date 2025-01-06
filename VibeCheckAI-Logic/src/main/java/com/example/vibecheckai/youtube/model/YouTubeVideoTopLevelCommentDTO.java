package com.example.vibecheckai.youtube.model;

public class YouTubeVideoTopLevelCommentDTO {
    private String kind;
    private String etag;
    private String id;
    private YouTubeVideoCommentSnippetDTO snippet;

    public String getKind() {
        return kind;
    }

    public String getEtag() {
        return etag;
    }

    public String getId() {
        return id;
    }

    public YouTubeVideoCommentSnippetDTO getSnippet() {
        return snippet;
    }
}
