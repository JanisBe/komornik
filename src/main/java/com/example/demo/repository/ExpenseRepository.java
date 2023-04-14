package com.example.demo.repository;

import com.example.demo.entities.Expense;
import com.example.demo.entities.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {

	List<Expense> findAllByUser(User user);

}