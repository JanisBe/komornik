package pl.janis.komornik.rest;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import pl.janis.komornik.config.JwtUtil;
import pl.janis.komornik.dto.AuthenticationRequestDto;
import pl.janis.komornik.dto.UserDto;
import pl.janis.komornik.entities.User;
import pl.janis.komornik.mapper.UserMapper;

import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4401")
public class AuthenticationRestController {


    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;

    @PostMapping("/authenticate")
    public ResponseEntity<UserDto> authenticate(@RequestBody AuthenticationRequestDto request
            , HttpServletResponse response) {

        final UserDetails user = userDetailsService.loadUserByUsername(request.username());
        if (user != null && user.isEnabled()) {
            String token = jwtUtil.generateToken(user);
            UserDto userDto = userMapper.toDto((User) user);
            ResponseCookie cookie = ResponseCookie.from("accessToken", token)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(TimeUnit.DAYS.toMillis(365))
                    .build();
            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
            return new ResponseEntity<>(userDto, HttpStatus.OK);
        }

        return null;
    }
}
