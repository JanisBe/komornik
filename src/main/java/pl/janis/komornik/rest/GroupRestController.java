package pl.janis.komornik.rest;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import pl.janis.komornik.dto.GroupDto;
import pl.janis.komornik.entities.User;
import pl.janis.komornik.exception.UserNotAllowedToEditException;
import pl.janis.komornik.mapper.GroupMapper;
import pl.janis.komornik.service.GroupService;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4401")
@RequestMapping("/group")
public class GroupRestController {
    private final GroupService groupService;
    private final GroupMapper groupMapper;

    public GroupRestController(GroupService groupService, GroupMapper groupMapper) {
        this.groupService = groupService;
        this.groupMapper = groupMapper;
    }

    @GetMapping("/findAllGroupsForCurrentUser/")
    public List<GroupDto> findAllGroupsForUser(Principal principal) {
        User currentUser = (User) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
        return groupService.findAllGroupsForUser(currentUser.getId());
    }

    @GetMapping("/findById/{groupId}")
    public GroupDto findAll(@PathVariable int groupId, Principal principal) {
        User currentUser = (User) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
        GroupDto dto = groupMapper.toDto(groupService.findById(groupId));
        if (dto.users().stream().anyMatch(u -> u.id().equals(currentUser.getId()))) {
            return dto;
        } else throw new UserNotAllowedToEditException("Nie możesz edytować tej grupy");
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
