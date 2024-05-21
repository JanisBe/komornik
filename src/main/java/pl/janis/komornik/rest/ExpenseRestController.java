package pl.janis.komornik.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import pl.janis.komornik.dto.DebtDto;
import pl.janis.komornik.dto.ExpenseDto;
import pl.janis.komornik.entities.User;
import pl.janis.komornik.service.ExpenseService;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4401")
@RequestMapping("/api/expense")
@RequiredArgsConstructor
public class ExpenseRestController {
    private final ExpenseService expenseService;

    @GetMapping("/findAllByGroup/{groupId}")
    public List<ExpenseDto> findAllByGroup(@PathVariable int groupId, Principal principal) {
        User currentUser = (User) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
        return expenseService.findAllByGroup(groupId, currentUser.getId());
    }

    @GetMapping("/findAllByUser/")
    public List<ExpenseDto> findAllByUser(Principal principal) {
        User currentUser = (User) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
        return expenseService.findAllByUserId(currentUser.getId());
    }

    @GetMapping("/findById/{id}")
    public ExpenseDto findById(@PathVariable int id) {
        return expenseService.findById(id);
    }

    @GetMapping("/calculateSettlements/{groupId}")
    public Map<String, List<DebtDto>> calculateSettlements(@PathVariable int groupId) {
        return expenseService.calculateSettlesForGroup(groupId);
    }

    @GetMapping("/findAll")
    public List<ExpenseDto> findAll() {
        return expenseService.findAll();
    }

    @PostMapping("/save")
    public ExpenseDto save(@RequestBody ExpenseDto expense, Principal principal) {
        User currentUser = (User) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
        return expenseService.saveExpense(expense, currentUser);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteExpense(@PathVariable int id) {
        expenseService.deleteExpense(id);
    }


}
