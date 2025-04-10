package sg.nus.iss.spring.backend.interfacemethods;

import jakarta.servlet.http.HttpSession;
import sg.nus.iss.spring.backend.model.Role;
import sg.nus.iss.spring.backend.model.User;

public interface AuthService {
public void authenticate(String username, String password, Role role, HttpSession session);
    public void register(User newUser);
    public void logout(HttpSession session);
}
