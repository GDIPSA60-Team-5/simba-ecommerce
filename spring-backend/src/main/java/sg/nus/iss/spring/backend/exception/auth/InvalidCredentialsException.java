package sg.nus.iss.spring.backend.exception.auth;

/* Written By Phyo Nyi Nyi Paing */
public class InvalidCredentialsException extends RuntimeException{
    public InvalidCredentialsException(String message) {
        super(message);
    }
}
