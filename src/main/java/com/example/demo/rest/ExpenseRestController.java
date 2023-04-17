package com.example.demo.rest;

import com.example.demo.entities.Expense;
import com.example.demo.service.ExpenseService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/expense")
public class ExpenseRestController {
    private final ExpenseService expenseService;

    public ExpenseRestController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }


    @GetMapping("/find/{id}")
    public List<Expense> findAllByUser(@PathVariable int id){
        return expenseService.findAllByUserId(id);
    }

    @PostMapping("/save")
    public Expense save(Expense expense){
        return expenseService.saveExpense(expense);
    }
}
