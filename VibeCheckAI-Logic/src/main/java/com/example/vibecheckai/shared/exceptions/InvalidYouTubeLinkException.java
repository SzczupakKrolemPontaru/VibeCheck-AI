package com.example.vibecheckai.shared.exceptions;

public class InvalidYouTubeLinkException extends YouTubeException {
    public InvalidYouTubeLinkException(String message) {
        super(message);
    }
}