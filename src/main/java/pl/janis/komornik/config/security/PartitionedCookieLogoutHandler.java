package pl.janis.komornik.config.security;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

/**
 * Since Spring doesn't suport cookie Partitioned property, this handler class is needed to delete cookies on the frontend.
 * Condition to delete cookie is to set EXACTLY the same cookie so if BE is sending the one with SameSite and Partitioned
 * properties, the same props needs to be set to delete it. Hence this class.
 */
public final class PartitionedCookieLogoutHandler implements LogoutHandler {
    private final List<Function<HttpServletRequest, Cookie>> cookiesToClear;

    public PartitionedCookieLogoutHandler(String... cookiesToClear) {
        Assert.notNull(cookiesToClear, "List of cookies cannot be null");
        List<Function<HttpServletRequest, Cookie>> cookieList = new ArrayList<>();
        for (String cookieName : cookiesToClear) {
            cookieList.add((request) -> {
                Cookie cookie = new Cookie(cookieName, null);
                cookie.setMaxAge(0);
                cookie.setPath("/");
                cookie.setSecure(true);
                cookie.setAttribute("Partitioned", "true");
                cookie.setAttribute("SameSite", "None");
                cookie.setHttpOnly(true);
                return cookie;
            });
        }
        this.cookiesToClear = cookieList;
    }


    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        this.cookiesToClear.forEach((f) -> response.addCookie(f.apply(request)));
    }
}