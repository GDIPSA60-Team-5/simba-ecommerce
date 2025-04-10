package sg.nus.iss.spring.backend.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sg.nus.iss.spring.backend.exception.auth.InvalidCredentialsException;
import sg.nus.iss.spring.backend.exception.auth.UserAlreadyExistsException;
import sg.nus.iss.spring.backend.interfacemethods.AuthService;
import sg.nus.iss.spring.backend.model.Role;
import sg.nus.iss.spring.backend.model.User;
import sg.nus.iss.spring.backend.service.AuthServiceImpl;

/* Written by Phyo Nyi Nyi Paing */
@RestController
@RequestMapping("/api/auth/user")
public class AuthController {

    private final Role DEFAULT_ROLE = Role.USER;
    private final AuthService authService;

    public AuthController(AuthServiceImpl authService) {
        this.authService = authService;
    }

    /**
     * Handles new user registration.
     *
     * @param user The user details to register.
     * @return ResponseEntity with status created or expectation failed status.
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
     *
     * @param username The user's username.
     * @param password The user's password.
     * @param session  The current HTTP session.
     * @return ResponseEntity with a success or unauthorized status.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestParam String username, @RequestParam String password, HttpSession session) {
        try {
            authService.authenticate(username, password, DEFAULT_ROLE, session);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (InvalidCredentialsException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(e.getMessage());
        }
    }

    /**
     * Handles user logout of the session.
     *
     * @param session The current HTTP session.
     * @return ResponseEntity with a success status.
     */
    @PostMapping("/logout")
    public ResponseEntity<HttpStatus> logout(HttpSession session) {
        authService.logout(session);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
