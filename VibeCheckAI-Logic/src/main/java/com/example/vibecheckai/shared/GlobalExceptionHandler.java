package com.example.vibecheckai.shared;

import com.example.vibecheckai.shared.exceptions.EmailAlreadyExistsException;
import com.example.vibecheckai.shared.exceptions.InvalidYouTubeLinkException;
import com.example.vibecheckai.shared.exceptions.YouTubeApiException;
import com.example.vibecheckai.shared.exceptions.SentimentAnalysisException;
import com.example.vibecheckai.shared.exceptions.EmotionAnalysisException;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidYouTubeLinkException.class)
    public ResponseEntity<ApiResponse<String>> handleInvalidYouTubeLinkException(InvalidYouTubeLinkException e) {
        ApiResponse<String> response = new ApiResponse<>(false, null, e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(YouTubeApiException.class)
    public ResponseEntity<ApiResponse<String>> handleYouTubeApiException(YouTubeApiException e) {
        ApiResponse<String> response = new ApiResponse<>(false, null, e.getMessage());
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(response);
    }

    @ExceptionHandler({SentimentAnalysisException.class, EmotionAnalysisException.class})
    public ResponseEntity<ApiResponse<String>> handleAnalysisExceptions(RuntimeException e) {
        ApiResponse<String> response = new ApiResponse<>(false, null, e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @ExceptionHandler(JsonProcessingException.class)
    public ResponseEntity<ApiResponse<String>> handleJsonProcessingException(JsonProcessingException e) {
        ApiResponse<String> response = new ApiResponse<>(false, null, e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ApiResponse<String>> handleEmailAlreadyExistsException(EmailAlreadyExistsException e) {
        ApiResponse<String> response = new ApiResponse<>(false, null, e.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }
}