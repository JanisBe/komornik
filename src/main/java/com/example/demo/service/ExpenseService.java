package com.example.demo.service;

import com.example.demo.entities.Expense;
import com.example.demo.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserService userService;

    public List<Expense> findAllByUserId(int userId) {
        return expenseRepository.findAllByUser(userService.findById(userId).orElseThrow());
    }

    public Optional<Expense> findById(int id) {
        return expenseRepository.findById(id);
    }

    @Transactional
    public Expense saveExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    @Transactional
    public void deleteExpense(int id) {
        expenseRepository.deleteById(id);
    }
}
