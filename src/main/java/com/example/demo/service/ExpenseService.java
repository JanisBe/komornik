package com.example.demo.service;

import com.example.demo.entities.Expense;
import com.example.demo.repository.ExpenseRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class ExpenseService {
	private ExpenseRepository expenseRepository;
	private UserService userService;

	public ExpenseService(ExpenseRepository expenseRepository, UserService userService) {
		this.expenseRepository = expenseRepository;
		this.userService = userService;
	}

	public Optional<Expense> findById(int id){
		return expenseRepository.findById(id);
	}

	public List<Expense> findAllByUserId(int userId){
		return expenseRepository.findAllByUser(userService.findById(userId).get());
	}

	public Expense saveExpense(Expense expense){
		return expenseRepository.save(expense);
	}


}
