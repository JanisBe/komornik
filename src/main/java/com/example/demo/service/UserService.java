package com.example.demo.service;

import com.example.demo.dto.UserDto;
import com.example.demo.entities.User;
import com.example.demo.mapper.UserMapper;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;


    @Transactional
    public User addUser(User user) {
        return userRepository.save(user);
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

    public Optional<User> findById(int id) {
        return userRepository.findById(id);
    }

    public List<User> findCommonUsers(int userId) {
        return userRepository.findCommonUsers(userId);
    }
}
