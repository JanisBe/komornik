package com.example.demo.service;

import com.example.demo.dto.ExpenseDto;
import com.example.demo.entities.Expense;
import com.example.demo.mapper.ExpenseMapper;
import com.example.demo.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserService userService;
    private final ExpenseMapper expenseMapper;

    public List<Expense> findAllByUserId(int userId) {
        return expenseRepository.findAllByUser(userService.findById(userId));
    }

    public Optional<Expense> findById(int id) {
        return expenseRepository.findById(id);
    }

    @Transactional
    public Expense saveExpense(ExpenseDto expenseDto) {
        Expense expense = expenseMapper.toEntity(expenseDto);
        if (expenseDto.split() == 100) {
            expense.setUser(userService.findById(expenseDto.userId()));
            log.info(expense);
            expenseRepository.save(expense);
        } else {
            try {
                float newAmount = expenseDto.amount() * expenseDto.split() / 100;
                expense.setAmount(BigDecimal.valueOf(newAmount));
                expense.setUser(userService.findById(expenseDto.userId()));

                Expense expense1 = (Expense) expense.clone();
                float otherAmount = expenseDto.amount() - newAmount;
                expense1.setAmount(BigDecimal.valueOf(otherAmount));
                expense1.setUser(userService.findById(expenseDto.fromUserId()));
                log.info(expense);
                log.info(expense1);
                expenseRepository.saveAll(List.of(expense, expense1));
            } catch (CloneNotSupportedException e) {
                throw new RuntimeException(e);
            }
        }
        return expense;
    }

    @Transactional
    public void deleteExpense(int id) {
        expenseRepository.deleteById(id);
    }
}
