package com.example.demo.service;

import com.example.demo.entities.User;
import com.example.demo.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;


	@Transactional
	public User addUser(User user){
		return userRepository.save(user);
	}

	public List<User> findAllUsers(){
		return userRepository.findAll();
	}

	@Transactional
	public void deleteUser(int id){
		userRepository.deleteById(id);
	}

	@Transactional
	public User editUser(User user) {
		User existingUser = userRepository.findById(user.getId()).get();
		existingUser.setMail(user.getMail());
		existingUser.setName(user.getName());
		existingUser.setAvatar(user.getAvatar());
		return userRepository.save(user);
	}

	public Optional<User> findById(int id){
		return userRepository.findById(id);
	}
}
