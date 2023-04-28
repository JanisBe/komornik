package com.example.demo.service;

import com.example.demo.dto.GroupDto;
import com.example.demo.entities.Group;
import com.example.demo.mapper.GroupMapper;
import com.example.demo.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupService {
    private final GroupRepository groupRepository;
    private final GroupMapper groupMapper;

    public List<GroupDto> findAllGroups() {
        return groupRepository.findAll().stream().map(groupMapper::toDto).toList();
    }

    public Group findById(int id) {
        return groupRepository.findById(id).orElseThrow();
    }

    @Transactional
    public void deleteGroup(int group) {
        groupRepository.deleteById(group);
    }

    @Transactional
    public Group save(Group group) {
        return groupRepository.save(group);
    }
}
