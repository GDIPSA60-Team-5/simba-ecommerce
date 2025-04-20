package sg.nus.iss.spring.backend.Interceptor;

import java.io.IOException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import sg.nus.iss.spring.backend.exception.auth.UserNotAuthenticatedException;
import sg.nus.iss.spring.backend.model.User;
import sg.nus.iss.spring.backend.util.SessionUtils;

// Written by Zhang Rui
@Component
public class SecurityInterceptor implements HandlerInterceptor {
    private static final Logger LOGGER =
            LoggerFactory.getLogger(SecurityInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler)
            throws IOException {
        LOGGER.info("Intercepting: " + request.getRequestURI());
        HttpSession session = request.getSession();
        try {

            User user = SessionUtils.getUserFromSession(session);
        } catch (UserNotAuthenticatedException e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"message\": \"You must be logged in to view this page.\"}");
            return false;
        }

        return true;
    }
}
