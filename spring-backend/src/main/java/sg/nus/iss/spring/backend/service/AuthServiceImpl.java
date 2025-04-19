package sg.nus.iss.spring.backend.service;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;
import sg.nus.iss.spring.backend.dto.LoginRequest;
import sg.nus.iss.spring.backend.exception.auth.InvalidCredentialsException;
import sg.nus.iss.spring.backend.exception.auth.UserAlreadyExistsException;
import sg.nus.iss.spring.backend.interfacemethods.AuthService;
import sg.nus.iss.spring.backend.enums.Role;
import sg.nus.iss.spring.backend.model.User;
import sg.nus.iss.spring.backend.repository.UserRepository;

@Service
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;

    public AuthServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Registers a new user if the username does not already exist.
     *
     * @param newUser the user object to register
     * @throws UserAlreadyExistsException if the username or email is already taken
     */
    @Override
    public void register(User newUser) {
        if (userRepository.existsByUsername(newUser.getUsername()))
            throw new UserAlreadyExistsException("Username taken");

        if (userRepository.existsByEmail(newUser.getEmail()))
            throw new UserAlreadyExistsException("Email Taken");
        userRepository.save(newUser);
    }

    /**
     * Authenticates a user based on username, password, and role, then stores the user in session.
     *
     * @param loginRequest the DTO containing username and password
     * @param role     the required role for authentication (e.g. user, admin)
     * @param session  the HTTP session to store the authenticated user
     * @throws InvalidCredentialsException if username does not exist or password is incorrect
     */
    @Override
    public void login(LoginRequest loginRequest, Role role, HttpSession session) {
        User user = userRepository.findByUsernameAndRole(loginRequest.getUsername(), role);

        if (user == null) throw new InvalidCredentialsException("Invalid login credentials");
        if (!user.getPassword().equals(loginRequest.getPassword())) throw new InvalidCredentialsException("Invalid login credentials");

        session.setAttribute("authenticated_user", user);
    }

    /**
     * Logs out the user by invalidating the HTTP session.
     *
     * @param session the session to invalidate
     */
    @Override
    public void logout(HttpSession session) {
        session.invalidate();
    }

    /**
     * Get current authenticated user from session
     */
    @Override
    public User getAuthenticatedUser(HttpSession session) {
        User user = (User) session.getAttribute("authenticated_user");
        return user;
    }
}
