package pl.janis.komornik.rest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import pl.janis.komornik.dto.UserDto;
import pl.janis.komornik.entities.User;
import pl.janis.komornik.exception.UserAlreadyExistsException;
import pl.janis.komornik.exception.UserNotAllowedToEditException;
import pl.janis.komornik.service.UserService;

import java.security.Principal;
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
        return userService.addUser(user);

    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id) {
        userService.deleteUser(id);
    }

    @PatchMapping("/edit")
    public ResponseEntity<User> editUser(@RequestBody User user, Principal principal) {
        User currentUser = (User) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
        if (!user.getId().equals(currentUser.getId())) {
            throw new UserNotAllowedToEditException("Nie możesz edytować tego użytkownika");
        }
        return new ResponseEntity<>(userService.editUser(user), HttpStatus.OK);
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
