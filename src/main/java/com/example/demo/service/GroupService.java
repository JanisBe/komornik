package com.example.demo.service;

import com.example.demo.entities.Group;
import com.example.demo.entities.User;
import com.example.demo.repository.GroupRepository;
import com.example.demo.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class GroupService {
	private GroupRepository groupRepository;

	public GroupService(GroupRepository groupRepository) {
		this.groupRepository = groupRepository;
	}

	public List<Group> findAllGroups(){
		return groupRepository.findAll();
	}

	public Optional<Group> findById(int id){
		return groupRepository.findById(id);
	}

	public void deleteGroup(Group group){
		groupRepository.delete(group);
	}

	public Group save(Group group){
		return groupRepository.save(group);
	}
}
