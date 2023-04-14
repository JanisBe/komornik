package com.example.demo.rest;

import com.example.demo.entities.Group;
import com.example.demo.entities.User;
import com.example.demo.service.GroupService;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/group")
public class GroupRestController {
    private GroupService groupService;

    public GroupRestController(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping("/findAll")
    public List<Group> findAll(){
        return groupService.findAllGroups();
    }

    @PostMapping("/save")
    public Group save(Group group){
        return groupService.save(group);
    }

    @DeleteMapping("/delete")
    public void delete(Group group){
        groupService.deleteGroup(group);
    }
}
