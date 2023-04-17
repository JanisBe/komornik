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

	public User editUser(User user) {
		User existingUser = userRepository.findById(user.getId()).get();
		existingUser.setMail(user.getMail());
		existingUser.setName(user.getName());
		existingUser.setAvatar(user.getAvatar());
		return userRepository.save(user);
	}

	public List<User> findAllUsers(){
		return userRepository.findAll();
	}

	public User addUser(User user){
		return userRepository.save(user);
	}

	public void deleteUser(int id){
		userRepository.deleteById(id);
	}

	public Optional<User> findById(int id){
		return userRepository.findById(id);
	}
}
