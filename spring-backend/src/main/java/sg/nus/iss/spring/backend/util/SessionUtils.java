package sg.nus.iss.spring.backend.util;

import sg.nus.iss.spring.backend.exception.auth.UserNotAuthenticatedException;
import sg.nus.iss.spring.backend.model.User;

import jakarta.servlet.http.HttpSession;

/* Written By Phyo Nyo Nyi Paing */
public class SessionUtils {

    public static User getUserFromSession(HttpSession session) {
        User user = (User) session.getAttribute("authenticated_user");
        if (user == null)
            throw new UserNotAuthenticatedException("User is not authenticated");
        return user;
    }
}
