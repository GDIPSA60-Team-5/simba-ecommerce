package sg.nus.iss.spring.backend.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sg.nus.iss.spring.backend.dto.LoginRequest;
import sg.nus.iss.spring.backend.exception.auth.InvalidCredentialsException;
import sg.nus.iss.spring.backend.interfacemethods.AuthService;
import sg.nus.iss.spring.backend.model.Role;
import sg.nus.iss.spring.backend.service.AuthServiceImpl;

@RestController
@RequestMapping("/api/admin/auth")
public class AdminAuthController {
    private final Role DEFAULT_ROLE = Role.ADMIN;
    private final AuthService authService;

    public AdminAuthController(AuthServiceImpl authService) {
        this.authService = authService;
    }

    /**
     * Handles admin login and save admin to session.
     * The reason for duplication is for security using route.
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
}
