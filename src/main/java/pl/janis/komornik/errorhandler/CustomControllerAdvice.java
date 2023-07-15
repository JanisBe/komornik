package pl.janis.komornik.errorhandler;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import pl.janis.komornik.exception.UserAlreadyExistsException;

import java.io.PrintWriter;
import java.io.StringWriter;

@ControllerAdvice
public class CustomControllerAdvice {


    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleUserAlreadyExistsException(Exception e) {
        HttpStatus status = HttpStatus.FORBIDDEN;

        return new ResponseEntity<>(new ErrorResponse(status, e.getMessage()), status);
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ErrorResponse> handleResponseStatusException(Exception e) {
        HttpStatus status = HttpStatus.NOT_FOUND;

        return new ResponseEntity<>(new ErrorResponse(status, e.getMessage()), status);
    }

    @ExceptionHandler(value = NoHandlerFoundException.class)
    public Object handleStaticResourceNotFound(final NoHandlerFoundException ex, HttpServletRequest req, RedirectAttributes redirectAttributes) {
        if (req.getRequestURI().startsWith("/api"))
            return this.getApiResourceNotFoundBody(ex, req);
        else {
            redirectAttributes.addFlashAttribute("errorMessage", "My Custom error message");
            return "redirect:/index.html";
        }
    }
//    @ExceptionHandler(value = HttpMessageNotWritableException.class)
//    public Object handleHttpMessageNotWritableException(final HttpMessageNotWritableException ex, HttpServletRequest req, RedirectAttributes redirectAttributes) {
//        if (req.getRequestURI().startsWith("/api"))
//            return this.getApiResourceNotFoundBody(ex, req);
//        else {
//            redirectAttributes.addFlashAttribute("errorMessage", "My Custom error message");
//            return "redirect:/index.html";
//        }
//    }

    private ResponseEntity<String> getApiResourceNotFoundBody(Exception ex, HttpServletRequest req) {
        return new ResponseEntity<>("Not Found !!", HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class) // exception handled
    public ResponseEntity<ErrorResponse> handleExceptions(
            Exception e
    ) {
        // ... potential custom logic

        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR; // 500

        // converting the stack trace to String
        StringWriter stringWriter = new StringWriter();
        PrintWriter printWriter = new PrintWriter(stringWriter);
        e.printStackTrace(printWriter);
        String stackTrace = stringWriter.toString();

        return new ResponseEntity<>(
                new ErrorResponse(
                        status,
                        e.getMessage(),
                        stackTrace // specifying the stack trace in case of 500s
                ),
                status
        );
    }
}
