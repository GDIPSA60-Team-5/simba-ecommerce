package sg.nus.iss.spring.backend.interfacemethods;

import jakarta.servlet.http.HttpSession;
import sg.nus.iss.spring.backend.model.Role;
import sg.nus.iss.spring.backend.model.User;

public interface AuthService {
    void authenticate(String username, String password, Role role, HttpSession session);
    void register(User newUser);
    void logout(HttpSession session);
}
