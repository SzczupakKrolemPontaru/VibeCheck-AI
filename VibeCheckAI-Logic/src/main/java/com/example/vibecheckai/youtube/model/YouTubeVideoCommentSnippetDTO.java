package com.example.vibecheckai.youtube.model;

public class YouTubeVideoCommentSnippetDTO {
    private String videoId;
    private String textOriginal;
    private String authorDisplayName;
    private String authorProfileImageUrl;
    private int likeCount;
    private String publishedAt;

    public String getVideoId() {
        return videoId;
    }

    public String getTextOriginal() {
        return textOriginal;
    }

    public String getAuthorDisplayName() {
        return authorDisplayName;
    }

    public String getAuthorProfileImageUrl() {
        return authorProfileImageUrl;
    }

    public int getLikeCount() {
        return likeCount;
    }

    public String getPublishedAt() {
        return publishedAt;
    }
}
