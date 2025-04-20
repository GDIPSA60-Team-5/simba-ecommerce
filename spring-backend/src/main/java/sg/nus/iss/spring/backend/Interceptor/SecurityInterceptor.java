package sg.nus.iss.spring.backend.Interceptor;

import java.io.IOException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import sg.nus.iss.spring.backend.model.User;

@Component
public class SecurityInterceptor implements HandlerInterceptor{
    private static final Logger LOGGER =
            LoggerFactory.getLogger(SecurityInterceptor.class);
    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler)
            throws IOException {
        LOGGER.info("Intercepting: " + request.getRequestURI());
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("authenticated_user");
        if (user == null) {
// No username, meaning not logged in yet
// Redirect to login page
            response.sendRedirect("/api/auth/login");
            return false;
        }
// Have logged-in, forward to Controller
        return true;
    }
}
