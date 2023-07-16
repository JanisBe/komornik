package pl.janis.komornik.exception;

import java.util.NoSuchElementException;

public class ElementDoesNotExistException extends NoSuchElementException {
    public ElementDoesNotExistException(String s) {
        super(s);
    }
}
