package pl.janis.komornik.rest;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.web.bind.annotation.*;
import pl.janis.komornik.dto.ExpenseDto;
import pl.janis.komornik.dto.UserDto;
import pl.janis.komornik.service.ExpenseService;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

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
    public Map<Pair<UserDto, UserDto>, BigDecimal> calculateSettlements(@PathVariable int groupId) {
        return expenseService.calculateSettlesForGroup(groupId);
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
