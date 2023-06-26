package com.example.demo.repository;

import com.example.demo.entities.Expense;
import com.example.demo.entities.UserBalance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
    @Query("select u from User u")
    List<Expense> findAllByUserId(int userId);

    List<Expense> findAllByGroup_Id(int groupId);

    @Query(name = "findBalanceForGroup", nativeQuery = true)
    List<UserBalance> findBalanceForGroup(int groupId);
}
