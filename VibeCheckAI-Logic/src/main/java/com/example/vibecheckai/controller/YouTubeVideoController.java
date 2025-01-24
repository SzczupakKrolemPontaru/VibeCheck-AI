package com.example.vibecheckai.controller;

import com.example.vibecheckai.dto.youtube.YouTubeAnalysisResponseDTO;
import com.example.vibecheckai.service.YouTubeVideoService;
import com.example.vibecheckai.shared.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/analysis")
public class YouTubeVideoController {
    @Autowired
    private YouTubeVideoService youTubeVideoService;

    @CrossOrigin(origins = "http://localhost:5173/")
    @GetMapping("/videoAnalysis")
    public ResponseEntity<ApiResponse<YouTubeAnalysisResponseDTO>> getYouTubeVideoAnalysis(@RequestParam String videoLink) {
        YouTubeAnalysisResponseDTO response = youTubeVideoService.analyzeVideo(videoLink);
        return ResponseEntity.ok(new ApiResponse<>(true, response, null));
    }
}