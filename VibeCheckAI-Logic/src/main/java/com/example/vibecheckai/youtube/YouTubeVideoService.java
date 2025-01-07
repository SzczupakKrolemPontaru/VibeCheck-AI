package com.example.vibecheckai.youtube;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class YouTubeVideoService {

    @Autowired
    private final YouTubeApiService youTubeApiService;

    public YouTubeVideoService(YouTubeApiService youTubeApiService) {
        this.youTubeApiService = youTubeApiService;
    }


    private String extractVideoId(String videoLink) {
        if (videoLink == null || !videoLink.contains("v=")) {
            throw new IllegalArgumentException("Invalid YouTube video link");
        }
        return videoLink.split("v=")[1].split("&")[0];
    }

}