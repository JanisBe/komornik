package pl.janis.komornik.exception;

import org.springframework.security.access.AccessDeniedException;

public class UserNotInGroupException extends AccessDeniedException {
    public UserNotInGroupException(String s) {
        super(s);
    }

    public UserNotInGroupException() {
        super("Użytkownik nie ma dostępu do tej grupy");

    }
}
