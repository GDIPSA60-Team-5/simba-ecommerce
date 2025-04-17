package sg.nus.iss.spring.backend.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sg.nus.iss.spring.backend.dto.LoginRequest;
import sg.nus.iss.spring.backend.exception.auth.InvalidCredentialsException;
import sg.nus.iss.spring.backend.exception.auth.UserAlreadyExistsException;
import sg.nus.iss.spring.backend.interfacemethods.AuthService;
import sg.nus.iss.spring.backend.model.Role;
import sg.nus.iss.spring.backend.model.User;
import sg.nus.iss.spring.backend.service.AuthServiceImpl;

/* Written by Phyo Nyi Nyi Paing */
@RestController
@RequestMapping("/api/auth/user")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
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
    public ResponseEntity<HttpStatus> register(@RequestBody User user) {
        try {
            user.setRole(DEFAULT_ROLE);
            authService.register(user);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (UserAlreadyExistsException e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
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
    public ResponseEntity<User> getAuthenticatedUser(HttpSession session) {
        User user = authService.getAuthenticatedUser(session);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return ResponseEntity.ok(user);
    }
}
