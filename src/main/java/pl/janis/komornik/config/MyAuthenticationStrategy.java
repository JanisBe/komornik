package pl.janis.komornik.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.session.SessionAuthenticationException;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestHandler;
import org.springframework.security.web.csrf.DeferredCsrfToken;
import pl.janis.komornik.filter.MyCsrfTokenRequestHandler;

public class MyAuthenticationStrategy implements
        SessionAuthenticationStrategy {

    private final CsrfTokenRepository tokenRepository;
    public CsrfTokenRequestHandler requestHandler = new MyCsrfTokenRequestHandler();

    public MyAuthenticationStrategy(CsrfTokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    @Override
    public void onAuthentication(Authentication authentication, HttpServletRequest request,
                                 HttpServletResponse response) throws SessionAuthenticationException {
        boolean containsToken = this.tokenRepository.loadToken(request) != null;
        if (containsToken) {
            DeferredCsrfToken deferredCsrfToken = this.tokenRepository.loadDeferredToken(request,
                    response);
            this.requestHandler.handle(request, response, deferredCsrfToken::get);
        }
    }
}
