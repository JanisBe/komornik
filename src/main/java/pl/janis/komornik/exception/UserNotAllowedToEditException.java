package pl.janis.komornik.exception;

import org.springframework.security.access.AccessDeniedException;

public class UserNotAllowedToEditException extends AccessDeniedException {
    public UserNotAllowedToEditException(String s) {
        super(s);
    }

    public UserNotAllowedToEditException() {
        super("Użytkownik nie może edytować tego");

    }
}
