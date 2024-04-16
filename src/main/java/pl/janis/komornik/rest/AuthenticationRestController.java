package pl.janis.komornik.rest;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
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

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4401")
public class AuthenticationRestController {


    private final UserService userDetailsService;
    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/api/auth/authenticate")
    public ResponseEntity<UserDto> authenticate(@RequestBody AuthenticationRequestDto request
            , HttpServletResponse response) {

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
            ResponseCookie cookie = ResponseCookie.from("accessToken", token)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(TimeUnit.DAYS.toMillis(10))
                    .build();
            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
            return new ResponseEntity<>(userDto, HttpStatus.OK);
        }

        return null;
    }

    @GetMapping("/api/csrf")
    public CsrfToken csrfToken(CsrfToken csrfToken) {
        return csrfToken;
    }

    @GetMapping("/api/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        response.addHeader(HttpHeaders.SET_COOKIE, "accessToken=; Max-Age=0; HttpOnly");
        response.addHeader(HttpHeaders.SET_COOKIE, "XSRF-TOKEN=; Max-Age=0; HttpOnly");
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
