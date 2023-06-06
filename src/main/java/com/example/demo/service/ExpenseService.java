package com.example.demo.service;

import com.example.demo.dto.ExpenseDto;
import com.example.demo.entities.Expense;
import com.example.demo.mapper.ExpenseMapper;
import com.example.demo.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserService userService;
    private final GroupService groupService;
    private final ExpenseMapper expenseMapper;

    public List<Expense> findAllByUserId(int userId) {
        return expenseRepository.findAllByUser(userService.findById(userId));
    }

    public Optional<Expense> findById(int id) {
        return expenseRepository.findById(id);
    }

    public List<Expense> findAllByGroup(int groupId) {
        return expenseRepository.findAllByGroup(groupService.findById(groupId));
    }

    public List<Expense> findAll() {
        return expenseRepository.findAll();
    }

    @Transactional
    public ExpenseDto saveExpense(ExpenseDto expenseDto) {
        Expense expense = expenseMapper.toEntity(expenseDto);
        return expenseMapper.toDto(expenseRepository.save(expense));
    }

    @Transactional
    public void deleteExpense(int id) {
        expenseRepository.deleteById(id);
    }
}
