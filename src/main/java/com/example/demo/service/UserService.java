package com.example.demo.service;

import com.example.demo.dto.UserDto;
import com.example.demo.entities.User;
import com.example.demo.exception.UserAlreadyExistsException;
import com.example.demo.mapper.UserMapper;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder encoder;

    @Transactional
    public User addUser(User user) throws UserAlreadyExistsException {
        if (userRepository.findByMail(user.getMail()) == null) {
            user.setPassword(encoder.encode(user.getPassword()));
            return userRepository.save(user);
        } else {
            throw new UserAlreadyExistsException("Użytkownik z tym mailem już istnieje");
        }
    }

    public List<UserDto> findAllUsers() {
        return userRepository.findAll().stream().map(userMapper::toDto).toList();
    }

    @Transactional
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    @Transactional
    public User editUser(User user) {
        User existingUser = userRepository.findById(user.getId()).orElseThrow();
        existingUser.setMail(user.getMail());
        existingUser.setName(user.getName());
        existingUser.setAvatar(user.getAvatar());
        return userRepository.save(user);
    }

    public User findById(int id) {
        return userRepository.findById(id).orElseThrow();
    }

    public List<User> findCommonUsers(int userId) {
        return userRepository.findCommonUsers(userId);
    }

    public List<User> findUsersInGroup(int groupId) {
        return userRepository.findUsersInGroups(groupId);
    }

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        User user = userRepository.findByName(name);
        if (user != null) {
            return user;
        } else {
            throw new UsernameNotFoundException("User not exist with name :" + name);
        }
    }
}
