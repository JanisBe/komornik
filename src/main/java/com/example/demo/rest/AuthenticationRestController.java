package com.example.demo.rest;

import com.example.demo.config.JwtUtil;
import com.example.demo.dto.AuthenticationRequestDto;
import com.example.demo.dto.UserDto;
import com.example.demo.entities.User;
import com.example.demo.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
    public UserDto authenticate(@RequestBody AuthenticationRequestDto request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password()));
        try {
            final UserDetails user = userDetailsService.loadUserByUsername(request.username());
            if (user != null) {
                UserDto userDto = userMapper.toDto((User) user);
                return userDto.withToken(jwtUtil.generateToken(user));
            }
        } catch (UsernameNotFoundException ex) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Nie ma takiego użytkownika", ex);
        }
        return null;
    }
}
