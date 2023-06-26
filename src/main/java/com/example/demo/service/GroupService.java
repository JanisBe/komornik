package com.example.demo.service;

import com.example.demo.dto.GroupDto;
import com.example.demo.entities.Group;
import com.example.demo.entities.User;
import com.example.demo.mapper.GroupMapper;
import com.example.demo.repository.GroupRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupService {
    private final GroupRepository groupRepository;
    private final GroupMapper groupMapper;
    private final UserRepository userRepository;

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
    public GroupDto save(GroupDto dto) {
        final Group group = groupMapper.toEntity(dto);
        List<User> sentUsers = group.getUsers();
        sanitizeUserIds(sentUsers);
        userRepository.saveAll(sentUsers);
        final Group savedGroup = groupRepository.save(group);
        return groupMapper.toDto(savedGroup);
    }

    private void sanitizeUserIds(List<User> sentUsers) {
        for (int i = 0; i < sentUsers.size(); i++) {
            final User user = sentUsers.get(i);
            if (user.getId() != null) {
                User userInDB = userRepository.findByMail(user.getMail());
                if (userInDB == null || !user.getId().equals(userInDB.getId())) {
                    user.setId(null);
                } else {
                    sentUsers.set(i, userInDB);
                }
            }
        }
    }

    public String getDefaultCurrencyForGroup(int id) {
        return groupRepository.findDefaultCurrencyById(id);
    }

    public List<GroupDto> findAllGroupsForUser(int userId) {
        return groupRepository.findAllGroupsForUser(userId).stream().map(groupMapper::toDto).toList();
    }
}
