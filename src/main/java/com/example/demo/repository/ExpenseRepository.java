package com.example.demo.repository;

import com.example.demo.entities.Expense;
import com.example.demo.entities.Group;
import com.example.demo.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
    @Query("select u from User u")
	List<Expense> findAllByUser(User user);

    List<Expense> findAllByGroup(Group group);
}
