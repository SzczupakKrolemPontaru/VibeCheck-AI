package com.example.vibecheckai;

import com.example.vibecheckai.youtube.exceptions.InvalidYouTubeLinkException;
import com.example.vibecheckai.youtube.exceptions.YouTubeApiException;
import com.example.vibecheckai.youtube.exceptions.SentimentAnalysisException;
import com.example.vibecheckai.youtube.exceptions.EmotionAnalysisException;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidYouTubeLinkException.class)
    public ResponseEntity<String> handleInvalidYouTubeLinkException(InvalidYouTubeLinkException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(YouTubeApiException.class)
    public ResponseEntity<String> handleYouTubeApiException(YouTubeApiException e) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(e.getMessage());
    }

    @ExceptionHandler({SentimentAnalysisException.class, EmotionAnalysisException.class})
    public ResponseEntity<String> handleAnalysisExceptions(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }

    @ExceptionHandler(JsonProcessingException.class)
    public ResponseEntity<String> handleJsonProcessingException(JsonProcessingException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
}