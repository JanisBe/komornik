package com.example.demo.rest;

import com.example.demo.config.JwtUtil;
import com.example.demo.dto.AuthenticationRequestDto;
import com.example.demo.dto.UserDto;
import com.example.demo.entities.User;
import com.example.demo.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationRestController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;

    @PostMapping("/authenticate")
    public UserDto authenticate(@RequestBody AuthenticationRequestDto request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        final UserDetails user = userDetailsService.loadUserByUsername(request.email());
        if (user != null) {
            UserDto userDto = userMapper.toDto((User) user);
            return userDto.withToken(jwtUtil.generateToken(user));
        }
        return null;
    }
}
