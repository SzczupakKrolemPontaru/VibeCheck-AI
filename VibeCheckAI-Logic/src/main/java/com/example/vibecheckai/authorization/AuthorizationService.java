package com.example.vibecheckai.authorization;

import com.example.vibecheckai.authorization.dto.UserAuthorizeDTO;
import com.example.vibecheckai.authorization.dto.UserRegisterDTO;
import com.example.vibecheckai.authorization.model.User;
import com.example.vibecheckai.authorization.model.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService {

    @Autowired
    private final UserService userService;

    @Autowired
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthorizationService(UserService userService, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(UserRegisterDTO userRegisterDTO) {
        User user = new User(userRegisterDTO.email(), passwordEncoder.encode(userRegisterDTO.password()));
        return userService.saveUser(user);
    }

    public User authorizeUser(UserAuthorizeDTO userAuthorizeDTO) {
        User user = userService.getUserByEmail(userAuthorizeDTO.getEmail());
        if (user != null && passwordEncoder.matches(userAuthorizeDTO.getPassword(), user.getPassword())) {
            return user;
        }
        return null;
    }
}
