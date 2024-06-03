package pl.janis.komornik.rest;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;
import pl.janis.komornik.config.JwtUtil;
import pl.janis.komornik.dto.AuthenticationRequestDto;
import pl.janis.komornik.dto.UserDto;
import pl.janis.komornik.entities.User;
import pl.janis.komornik.mapper.UserMapper;
import pl.janis.komornik.service.UserService;

import java.util.concurrent.TimeUnit;

import static java.lang.Boolean.parseBoolean;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4401")
public class AuthenticationRestController {


    private final UserService userDetailsService;
    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;
    private final AuthenticationManager authenticationManager;

    @Value("${server.ssl.enabled:false}")
    private String isHttpsEnabled;

    @PostMapping("/auth/authenticate")
    public ResponseEntity<UserDto> authenticate(@RequestBody AuthenticationRequestDto request,
                                                HttpServletResponse response) {

        final UserDetails user = userDetailsService.loadUserByUsername(request.username());
        if (user != null && user.isEnabled() && SecurityContextHolder.getContext().getAuthentication() instanceof AnonymousAuthenticationToken) {
            Authentication authentication =
                    authenticationManager
                            .authenticate(new UsernamePasswordAuthenticationToken(
                                    request.username(),
                                    request.password()));
            SecurityContextHolder.getContext().setAuthentication(authentication);


            String token = jwtUtil.generateToken(user);
            UserDto userDto = userMapper.toDto((User) user);
            response.addCookie(createCookie(token));
            return new ResponseEntity<>(userDto, HttpStatus.OK);
        }
        return null;
    }

    @GetMapping("/csrf")
    public CsrfToken csrfToken(CsrfToken csrfToken) {
        return csrfToken;
    }

    @GetMapping("/isHttpsEnabled")
    public Boolean isHttpsEnabled() {
        return parseBoolean(isHttpsEnabled);
    }

    private Cookie createCookie(String token) {
        Cookie cookie = new Cookie("accessToken", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setAttribute("SameSite", "none");
        cookie.setAttribute("Partitioned", "true");
        cookie.setPath("/");
        cookie.setMaxAge((int) TimeUnit.DAYS.toMillis(10));
        return cookie;
    }
}
