package com.example.demo.service;

import com.example.demo.entities.Expense;
import com.example.demo.repository.ExpenseRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ExpenseService {
	private ExpenseRepository expenseRepository;
	private UserService userService;

	public Optional<Expense> findById(int id){
		return expenseRepository.findById(id);
	}

	public List<Expense> findAllByUserId(int userId){
		return expenseRepository.findAllByUser(userService.findById(userId).get());
	}

	@Transactional
	public Expense saveExpense(Expense expense){
		return expenseRepository.save(expense);
	}


}
