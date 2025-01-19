package com.example.vibecheckai.authorization;

import com.example.vibecheckai.authorization.dto.UserAuthorizeDTO;
import com.example.vibecheckai.authorization.dto.UserRegisterDTO;
import com.example.vibecheckai.authorization.model.User;
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
    private AuthorizationService authorizationService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody UserRegisterDTO userRegisterDTO) {
        User user = authorizationService.registerUser(userRegisterDTO);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<User> authorizeUser(@RequestBody UserAuthorizeDTO userAuthorizeDTO) {
        User user = authorizationService.authorizeUser(userAuthorizeDTO);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(401).build();
    }
}
