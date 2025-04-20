package sg.nus.iss.spring.backend.controller;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import sg.nus.iss.spring.backend.dto.LoginRequest;
import sg.nus.iss.spring.backend.dto.UserSessionDTO;
import sg.nus.iss.spring.backend.exception.auth.InvalidCredentialsException;
import sg.nus.iss.spring.backend.exception.auth.UserAlreadyExistsException;
import sg.nus.iss.spring.backend.exception.auth.UserNotAuthenticatedException;
import sg.nus.iss.spring.backend.interfacemethods.AuthService;
import sg.nus.iss.spring.backend.enums.Role;
import sg.nus.iss.spring.backend.model.User;
import sg.nus.iss.spring.backend.service.AuthServiceImpl;

import java.util.stream.Collectors;

/* Written by Phyo Nyi Nyi Paing */
@RestController
@RequestMapping("/api/auth/")
public class AuthController {

    private final Role DEFAULT_ROLE = Role.USER;
    private final AuthService authService;

    public AuthController(AuthServiceImpl authService) {
        this.authService = authService;
    }

    /**
     * Handles new user registration.
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user, BindingResult result) {
        if (result.hasErrors()) {
            String errorMessage = result.getAllErrors()
                    .stream()
                    .map(error -> error.getDefaultMessage())
                    .collect(Collectors.joining(", "));
            return ResponseEntity.badRequest().body(errorMessage);
        }
        try {
            user.setRole(DEFAULT_ROLE);
            authService.register(user);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (UserAlreadyExistsException e) {

            // At the moment, this will be either "Username taken" or "Email Taken"
            String errorMessage = e.getMessage();
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(errorMessage);
        }
    }

    /**
     * Handles user login and save user to session.
     */
    @PostMapping("/login")
    public ResponseEntity<String> login(
            @RequestBody LoginRequest loginRequest, HttpSession session) {

        try {
            authService.login(loginRequest, DEFAULT_ROLE, session);
            return ResponseEntity.ok("Login Successful");
        } catch (InvalidCredentialsException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(e.getMessage());
        }
    }

    /**
     * Handles user logout of the session.
     */
    @PostMapping("/logout")
    public ResponseEntity<HttpStatus> logout(HttpSession session) {
        authService.logout(session);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Get authenticated user from session
     */
    @GetMapping("/me")
    public ResponseEntity<UserSessionDTO> getAuthenticatedUser(HttpSession session) {
        try {
            UserSessionDTO userDTO = authService.getAuthenticatedUser(session);
            return ResponseEntity.ok(userDTO);
        } catch (UserNotAuthenticatedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
}
