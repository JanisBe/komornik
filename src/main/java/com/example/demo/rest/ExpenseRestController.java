package com.example.demo.rest;

import com.example.demo.entities.Expense;
import com.example.demo.service.ExpenseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4401")
@RequestMapping("/expense")
public class ExpenseRestController {
    private final ExpenseService expenseService;

    public ExpenseRestController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }


    @GetMapping("/find/{id}")
    public List<Expense> findAllByUser(@PathVariable int id) {
        return expenseService.findAllByUserId(id);
    }

    @PostMapping("/save")
    public Expense save(@RequestBody Expense expense) {
        return expenseService.saveExpense(expense);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteExpense(@PathVariable int id) {
        expenseService.deleteExpense(id);
    }
}
