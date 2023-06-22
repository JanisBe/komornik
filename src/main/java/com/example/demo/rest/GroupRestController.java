package com.example.demo.rest;

import com.example.demo.dto.GroupDto;
import com.example.demo.entities.Group;
import com.example.demo.service.GroupService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4401")
@RequestMapping("/group")
public class GroupRestController {
    private final GroupService groupService;

    public GroupRestController(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping("/findAllGroupsForUser/{userId}")
    public List<GroupDto> findAllGroupsForUser(@PathVariable int userId) {
        return groupService.findAllGroupsForUser(userId);
    }

    @GetMapping("/findById/{id}")
    public Group findAll(@PathVariable int id) {
        return groupService.findById(id);
    }

    @GetMapping("/getDefaultCurrencyForGroup/{id}")
    public String getDefaultCurrencyForGroup(@PathVariable int id) {
        return groupService.getDefaultCurrencyForGroup(id);
    }

    @PostMapping("/save")
    public GroupDto save(@RequestBody GroupDto group) {
        return groupService.save(group);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id) {
        groupService.deleteGroup(id);
    }
}
