package pl.janis.komornik.rest;

import org.springframework.web.bind.annotation.*;
import pl.janis.komornik.dto.GroupDto;
import pl.janis.komornik.mapper.GroupMapper;
import pl.janis.komornik.service.GroupService;

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

    @GetMapping("/findAllGroupsForUser/{userId}")
    public List<GroupDto> findAllGroupsForUser(@PathVariable int userId) {
        return groupService.findAllGroupsForUser(userId);
    }

    @GetMapping("/findById/{id}")
    public GroupDto findAll(@PathVariable int id) {
        return groupMapper.toDto(groupService.findById(id));
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
