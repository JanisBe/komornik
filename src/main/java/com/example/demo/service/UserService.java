package com.example.demo.service;

import com.example.demo.entities.User;
import com.example.demo.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	private final UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public List<User> findAllUsers(){
		return userRepository.findAll();
	}

	public User addUser(User user){
		return userRepository.save(user);
	}

	public void deleteUser(User user){
		userRepository.delete(user);
	}

	public Optional<User> findById(int id){
		return userRepository.findById(id);
	}
}
