package pl.janis.komornik.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.janis.komornik.dto.ExpenseDto;
import pl.janis.komornik.entities.Expense;
import pl.janis.komornik.service.ExpenseService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4401")
@RequestMapping("/expense")
@RequiredArgsConstructor
public class ExpenseRestController {
    private final ExpenseService expenseService;

    @GetMapping("/findAllByGroup/{groupId}")
    public List<ExpenseDto> findAllByGroup(@PathVariable int groupId) {
        return expenseService.findAllByGroup(groupId);
    }

    @GetMapping("/findAllByUser/{id}")
    public List<ExpenseDto> findAllByUser(@PathVariable int id) {
        return expenseService.findAllByUserId(id);
    }

    @GetMapping("/findById/{id}")
    public ExpenseDto findById(@PathVariable int id) {
        return expenseService.findById(id);
    }

    @GetMapping("/calculateSettlements/{groupId}")
    public List<Expense> calculateSettlements(@PathVariable int groupId) {
        expenseService.calculateSettlesForGroup(groupId);
        return null;
    }

    @GetMapping("/findAll")
    public List<ExpenseDto> findAll() {
        return expenseService.findAll();
    }

    @PostMapping("/save")
    public ExpenseDto save(@RequestBody ExpenseDto expense) {
        return expenseService.saveExpense(expense);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteExpense(@PathVariable int id) {
        expenseService.deleteExpense(id);
    }


}
