package pl.janis.komornik.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import pl.janis.komornik.config.JwtUtil;
import pl.janis.komornik.dto.AuthenticationRequestDto;
import pl.janis.komornik.dto.UserDto;
import pl.janis.komornik.entities.User;
import pl.janis.komornik.mapper.UserMapper;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4401")
public class AuthenticationRestController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;

    @PostMapping("/authenticate")
    public ResponseEntity<UserDto> authenticate(@RequestBody AuthenticationRequestDto request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password()));

        final UserDetails user = userDetailsService.loadUserByUsername(request.username());
        if (user != null) {
            UserDto userDto = userMapper.toDto((User) user);
            return new ResponseEntity<>(userDto.withToken(jwtUtil.generateToken(user)), HttpStatus.OK);
        }

        return null;
    }
}
