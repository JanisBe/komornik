package pl.janis.komornik.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.janis.komornik.entities.Expense;
import pl.janis.komornik.entities.UserBalance;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
    @Query("select u from User u")
    List<Expense> findAllByUserIdOrderByDate(@Param("userId") int userId);

    List<Expense> findAllByGroup_IdOrderByDate(int groupId);

    @Query(name = "findBalanceForGroup", nativeQuery = true)
    List<UserBalance> findBalanceForGroup(int groupId);

    List<Expense> findAllByOrderByDate();
}
