package com.example.demo.rest;

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

    @GetMapping("/findAll")
    public List<Group> findAll(){
        return groupService.findAllGroups();
    }

    @PostMapping("/save")
    public Group save(@RequestBody Group group) {
        return groupService.save(group);
    }

    @DeleteMapping("/delete")
    public void delete(int id) {
        groupService.deleteGroup(id);
    }
}
