package com.example.demo.service;

import com.example.demo.entities.Group;
import com.example.demo.repository.GroupRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class GroupService {
	private GroupRepository groupRepository;

	public List<Group> findAllGroups(){
		return groupRepository.findAll();
	}

	public Optional<Group> findById(int id){
		return groupRepository.findById(id);
	}

	@Transactional
	public void deleteGroup(Group group){
		groupRepository.delete(group);
	}

	@Transactional
	public Group save(Group group){
		return groupRepository.save(group);
	}
}
