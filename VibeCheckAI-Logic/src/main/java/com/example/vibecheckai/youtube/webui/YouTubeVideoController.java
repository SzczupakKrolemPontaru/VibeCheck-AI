package com.example.vibecheckai.youtube.webui;

import com.example.vibecheckai.youtube.dto.YouTubeAnalysisResponseDTO;
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
    public ResponseEntity<YouTubeAnalysisResponseDTO> getYouTubeVideoAnalysis(@RequestParam String videoLink) {
        YouTubeAnalysisResponseDTO response = youTubeVideoService.analyzeVideo(videoLink);
        return ResponseEntity.ok(response);
    }
}