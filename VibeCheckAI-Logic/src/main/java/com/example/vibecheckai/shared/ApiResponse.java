package com.example.vibecheckai.shared;

public class ApiResponse<T> {

    private boolean success;
    private T payload;
    private String message;

    public ApiResponse(boolean success, T payload, String message) {
        this.success = success;
        this.payload = payload;
        this.message = message;
    }

    public ApiResponse(boolean success, T payload) {
        this.success = success;
        this.payload = payload;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public T getPayload() {
        return payload;
    }

    public void setPayload(T payload) {
        this.payload = payload;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
