package com.example.demo.rest;

import com.example.demo.dto.UserDto;
import com.example.demo.entities.User;
import com.example.demo.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4401")
@RequestMapping("/user")
public class UserRestController {
    private final UserService userService;

    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/findAll")
    public List<UserDto> findAll() {
        return userService.findAllUsers();
    }

    @PostMapping("/save")
    public User save(@RequestBody User user) {
        return userService.addUser(user);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id){
        userService.deleteUser(id);
    }

    @PatchMapping("/edit")
    public User editUser(@RequestBody User user) {
        return userService.editUser(user);
    }
}
