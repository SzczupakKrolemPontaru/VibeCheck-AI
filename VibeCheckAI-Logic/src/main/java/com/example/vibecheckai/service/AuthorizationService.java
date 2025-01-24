package com.example.vibecheckai.service;

import com.example.vibecheckai.dto.authorization.AuthorizeUserDTO;
import com.example.vibecheckai.dto.authorization.RegisterNewUserDTO;
import com.example.vibecheckai.shared.exceptions.EmailAlreadyExistsException;
import com.example.vibecheckai.model.User;
import com.example.vibecheckai.model.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

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

    public User registerUser(RegisterNewUserDTO registerNewUserDTO) {
        if (userService.getUserByEmail(registerNewUserDTO.email()).isPresent()) {
            throw new EmailAlreadyExistsException("Email already exists");
        }
        User user = new User(registerNewUserDTO.email(), passwordEncoder.encode(registerNewUserDTO.password()));
        return userService.saveUser(user);
    }

    public User authorizeUser(AuthorizeUserDTO authorizeUserDTO) {
        Optional<User> user = userService.getUserByEmail(authorizeUserDTO.getEmail());
        if (user.isPresent() && passwordEncoder.matches(authorizeUserDTO.getPassword(), user.get().getPassword())) {
            return user.get();
        }
        return null;
    }
}
