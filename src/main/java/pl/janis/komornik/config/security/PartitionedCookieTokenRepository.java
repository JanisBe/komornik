package pl.janis.komornik.config.security;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseCookie;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.DefaultCsrfToken;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;
import org.springframework.web.util.WebUtils;

import java.util.UUID;
import java.util.function.Consumer;

import static org.apache.tomcat.util.descriptor.web.Constants.COOKIE_PARTITIONED_ATTR;
import static org.apache.tomcat.util.descriptor.web.Constants.COOKIE_SAME_SITE_ATTR;

public class PartitionedCookieTokenRepository implements CsrfTokenRepository {
    static final String DEFAULT_CSRF_COOKIE_NAME = "XSRF-TOKEN";

    static final String DEFAULT_CSRF_PARAMETER_NAME = "_csrf";

    static final String DEFAULT_CSRF_HEADER_NAME = "X-XSRF-TOKEN";

    private static final String CSRF_TOKEN_REMOVED_ATTRIBUTE_NAME = CookieCsrfTokenRepository.class.getName()
            .concat(".REMOVED");

    private final String parameterName = DEFAULT_CSRF_PARAMETER_NAME;

    private final String headerName = DEFAULT_CSRF_HEADER_NAME;

    private String cookieName = DEFAULT_CSRF_COOKIE_NAME;

    private String cookiePath;

    private String cookieDomain;

    private Boolean secure;

    private Consumer<ResponseCookie.ResponseCookieBuilder> cookieCustomizer = (builder) -> {
    };

    /**
     * Add a {@link Consumer} for a {@code ResponseCookieBuilder} that will be invoked for
     * each cookie being built, just before the call to {@code build()}.
     *
     * @param cookieCustomizer consumer for a cookie builder
     * @since 6.1
     */
    public void setCookieCustomizer(Consumer<ResponseCookie.ResponseCookieBuilder> cookieCustomizer) {
        Assert.notNull(cookieCustomizer, "cookieCustomizer must not be null");
        this.cookieCustomizer = cookieCustomizer;
    }

    @Override
    public CsrfToken generateToken(HttpServletRequest request) {
        return new DefaultCsrfToken(this.headerName, this.parameterName, createNewToken());
    }

    @Override
    public void saveToken(CsrfToken token, HttpServletRequest request, HttpServletResponse response) {
        String tokenValue = (token != null) ? token.getToken() : "";

        int cookieMaxAge = -1;
        boolean cookieHttpOnly = true;
        ResponseCookie.ResponseCookieBuilder cookieBuilder = ResponseCookie.from(this.cookieName, tokenValue)
                .secure((this.secure != null) ? this.secure : request.isSecure())
                .path(StringUtils.hasLength(this.cookiePath) ? this.cookiePath : this.getRequestContext(request))
                .maxAge((token != null) ? cookieMaxAge : 0)
                .httpOnly(cookieHttpOnly)
                .domain(this.cookieDomain);

        this.cookieCustomizer.accept(cookieBuilder);

        Cookie cookie = mapToCookie(cookieBuilder.build());
        cookie.setAttribute(COOKIE_PARTITIONED_ATTR, "true");
        cookie.setAttribute(COOKIE_SAME_SITE_ATTR, "None");
        response.addCookie(cookie);

        // Set request attribute to signal that response has blank cookie value,
        // which allows loadToken to return null when token has been removed
        if (!StringUtils.hasLength(tokenValue)) {
            request.setAttribute(CSRF_TOKEN_REMOVED_ATTRIBUTE_NAME, Boolean.TRUE);
        } else {
            request.removeAttribute(CSRF_TOKEN_REMOVED_ATTRIBUTE_NAME);
        }
    }

    @Override
    public CsrfToken loadToken(HttpServletRequest request) {
        // Return null when token has been removed during the current request
        // which allows loadDeferredToken to re-generate the token
        if (Boolean.TRUE.equals(request.getAttribute(CSRF_TOKEN_REMOVED_ATTRIBUTE_NAME))) {
            return null;
        }
        Cookie cookie = WebUtils.getCookie(request, this.cookieName);
        if (cookie == null) {
            return null;
        }
        String token = cookie.getValue();
        if (!StringUtils.hasLength(token)) {
            return null;
        }
        return new DefaultCsrfToken(this.headerName, this.parameterName, token);
    }

    /**
     * Sets the name of the cookie that the expected CSRF token is saved to and read from.
     *
     * @param cookieName the name of the cookie that the expected CSRF token is saved to
     *                   and read from
     */
    public void setCookieName(String cookieName) {
        Assert.notNull(cookieName, "cookieName cannot be null");
        this.cookieName = cookieName;
    }


    private String getRequestContext(HttpServletRequest request) {
        String contextPath = request.getContextPath();
        return (!contextPath.isEmpty()) ? contextPath : "/";
    }

    /**
     * Factory method to conveniently create an instance that creates cookies where
     * {@link Cookie#isHttpOnly()} is set to false.
     *
     * @return an instance of CookieCsrfTokenRepository that creates cookies where
     * {@link Cookie#isHttpOnly()} is set to false.
     */

    private String createNewToken() {
        return UUID.randomUUID().toString();
    }

    private Cookie mapToCookie(ResponseCookie responseCookie) {
        Cookie cookie = new Cookie(responseCookie.getName(), responseCookie.getValue());
        cookie.setSecure(responseCookie.isSecure());
        cookie.setPath(responseCookie.getPath());
        cookie.setMaxAge((int) responseCookie.getMaxAge().getSeconds());
        cookie.setHttpOnly(responseCookie.isHttpOnly());
        if (StringUtils.hasLength(responseCookie.getDomain())) {
            cookie.setDomain(responseCookie.getDomain());
        }
        if (StringUtils.hasText(responseCookie.getSameSite())) {
            cookie.setAttribute("SameSite", responseCookie.getSameSite());
        }
        return cookie;
    }
}
