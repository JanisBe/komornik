package pl.janis.komornik.errorhandler;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import pl.janis.komornik.exception.ElementDoesNotExistException;
import pl.janis.komornik.exception.UserAlreadyExistsException;
import pl.janis.komornik.exception.UserNotAllowedToEditException;
import pl.janis.komornik.exception.UserNotInGroupException;

import static org.springframework.http.HttpStatus.*;

@ControllerAdvice
public class CustomControllerAdvice {


    @ExceptionHandler(UserAlreadyExistsException.class)
    @ResponseStatus(BAD_REQUEST)
    public ResponseEntity<ErrorResponse> handleUserAlreadyExistsException(Exception e) {
        return new ResponseEntity<>(new ErrorResponse(FORBIDDEN, e.getMessage()), FORBIDDEN);
    }

    @ExceptionHandler(ElementDoesNotExistException.class)
    @ResponseStatus(BAD_REQUEST)
    public ResponseEntity<ErrorResponse> handleElementDoesNotExistException(Exception e) {
        return new ResponseEntity<>(new ErrorResponse(FORBIDDEN, e.getMessage()), FORBIDDEN);
    }

    @ExceptionHandler(UserNotInGroupException.class)
    @ResponseStatus(BAD_REQUEST)
    public ResponseEntity<ErrorResponse> handleUserNotInGroupException(Exception e) {
        return new ResponseEntity<>(new ErrorResponse(FORBIDDEN, e.getMessage()), FORBIDDEN);
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(BAD_REQUEST)
    public ResponseEntity<ErrorResponse> handleBadCredentialsException(Exception e) {
        return new ResponseEntity<>(new ErrorResponse(FORBIDDEN, e.getMessage()), FORBIDDEN);
    }

    @ExceptionHandler(UserNotAllowedToEditException.class)
    @ResponseStatus(BAD_REQUEST)
    public ResponseEntity<ErrorResponse> handleUserNotAllowedToEditException(Exception e) {
        return new ResponseEntity<>(new ErrorResponse(FORBIDDEN, e.getMessage()), FORBIDDEN);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    @ResponseStatus(BAD_REQUEST)
    public ResponseEntity<ErrorResponse> handleUsernameNotFoundException(Exception e) {
        return new ResponseEntity<>(new ErrorResponse(FORBIDDEN, e.getMessage()), FORBIDDEN);
    }

    @ExceptionHandler(ResponseStatusException.class)
    @ResponseStatus(BAD_REQUEST)
    public ResponseEntity<ErrorResponse> handleResponseStatusException(Exception e) {
        return new ResponseEntity<>(new ErrorResponse(NOT_FOUND, e.getMessage()), NOT_FOUND);
    }

    @ExceptionHandler(value = NoHandlerFoundException.class)
    @ResponseStatus(BAD_REQUEST)
    public Object handleStaticResourceNotFound(final NoHandlerFoundException ex, HttpServletRequest req, RedirectAttributes redirectAttributes) {
        if (req.getRequestURI().startsWith("/api"))
            return this.getApiResourceNotFoundBody(ex, req);
        else {
            redirectAttributes.addFlashAttribute("errorMessage", "My Custom error message");
            return "redirect:/index.html";
        }
    }

    private ResponseEntity<String> getApiResourceNotFoundBody(Exception ex, HttpServletRequest req) {
        return new ResponseEntity<>("Not Found !!", NOT_FOUND);
    }

//    @ExceptionHandler(Exception.class) // exception handled
//    public ResponseEntity<ErrorResponse> handleExceptions(Exception e) {
//        // ... potential custom logic
//
//        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR; // 500
//
//        // converting the stack trace to String
//        StringWriter stringWriter = new StringWriter();
//        PrintWriter printWriter = new PrintWriter(stringWriter);
//        e.printStackTrace(printWriter);
//        String stackTrace = stringWriter.toString();
//
//        return new ResponseEntity<>(new ErrorResponse(status, e.getMessage(), stackTrace), status);
//    }
}
