package com.example.vibecheckai.youtube.model;

public class YouTubeVideoSnippetDTO {
    private String channelId;
    private String videoId;
    private YouTubeVideoTopLevelCommentDTO topLevelComment;
    private int totalReplyCount;

    public String getChannelId() {
        return channelId;
    }

    public String getVideoId() {
        return videoId;
    }

    public YouTubeVideoTopLevelCommentDTO getTopLevelComment() {
        return topLevelComment;
    }

    public int getTotalReplyCount() {
        return totalReplyCount;
    }
}
