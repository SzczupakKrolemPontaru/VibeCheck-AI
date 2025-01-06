package com.example.vibecheckai.youtube.model;

public class YouTubeVideoCommentThreadDTO {
    private String kind;
    private String etag;
    private String id;
    private YouTubeVideoSnippetDTO snippet;
    private YouTubeVideoRepliesDTO replies;

    public String getKind() {
        return kind;
    }

    public String getEtag() {
        return etag;
    }

    public String getId() {
        return id;
    }

    public YouTubeVideoSnippetDTO getSnippet() {
        return snippet;
    }

    public YouTubeVideoRepliesDTO getReplies() {
        return replies;
    }
}