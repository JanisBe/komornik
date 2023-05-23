package com.example.demo.rest;

import com.example.demo.dto.UserDto;
import com.example.demo.entities.User;
import com.example.demo.exception.UserAlreadyExistsException;
import com.example.demo.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
    public User save(@RequestBody User user) throws UserAlreadyExistsException {
        try {
            return userService.addUser(user);
        } catch (UserAlreadyExistsException exception) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Użytkownik " + user.getName() + " " + user.getMail() + "już jest", exception);
        }
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id) {
        userService.deleteUser(id);
    }

    @PatchMapping("/edit")
    public User editUser(@RequestBody User user) {
        return userService.editUser(user);
    }

    @GetMapping("/findCommonUsers/{userId}")
    public List<User> findCommonUser(@PathVariable int userId) {
        return userService.findCommonUsers(userId);
    }

    @GetMapping("/findUsersInGroup/{groupId}")
    public List<User> findUsersInGroup(@PathVariable int groupId) {
        return userService.findUsersInGroup(groupId);
    }
}
