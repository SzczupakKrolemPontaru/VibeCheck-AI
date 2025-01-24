package com.example.vibecheckai.controller;

import com.example.vibecheckai.service.AuthorizationService;
import com.example.vibecheckai.dto.authorization.AuthorizeUserDTO;
import com.example.vibecheckai.dto.authorization.RegisterNewUserDTO;
import com.example.vibecheckai.model.User;
import com.example.vibecheckai.shared.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthorizationController {

    @Autowired
    private final AuthorizationService authorizationService;

    public AuthorizationController(AuthorizationService authorizationService) {
        this.authorizationService = authorizationService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<User>> registerUser(@RequestBody RegisterNewUserDTO registerNewUserDTO) {
        User user = authorizationService.registerUser(registerNewUserDTO);
        return ResponseEntity.ok(new ApiResponse<>(true, user));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<User>> authorizeUser(@RequestBody AuthorizeUserDTO authorizeUserDTO) {
        User user = authorizationService.authorizeUser(authorizeUserDTO);
        if (user != null) {
            return ResponseEntity.ok(new ApiResponse<>(true, user));
        }
        return ResponseEntity.status(401).body(new ApiResponse<>(false, null,"Invalid username or password"));
    }
}
