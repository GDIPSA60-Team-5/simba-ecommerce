package sg.nus.iss.spring.backend.interfacemethods;

import jakarta.servlet.http.HttpSession;
import sg.nus.iss.spring.backend.dto.LoginRequest;
import sg.nus.iss.spring.backend.enums.Role;
import sg.nus.iss.spring.backend.model.User;

public interface AuthService {
    void register(User newUser);
    void login(LoginRequest loginRequest, Role role, HttpSession session);
    void logout(HttpSession session);
    User getAuthenticatedUser(HttpSession session);
}
