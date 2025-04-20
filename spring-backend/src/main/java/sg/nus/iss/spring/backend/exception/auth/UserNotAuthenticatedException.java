package sg.nus.iss.spring.backend.exception.auth;
/* Written By Phyo Nyi Nyi Paing */

public class UserNotAuthenticatedException extends RuntimeException{
    public UserNotAuthenticatedException(String message) {
        super(message);
    }
}
