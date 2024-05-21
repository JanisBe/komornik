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

    List<Expense> findAllByGroup_IdOrderByDateDesc(int groupId);

    @Query(name = "findBalanceForGroup", nativeQuery = true)
    List<UserBalance> findBalanceForGroup(int groupId, String currency);

    List<Expense> findAllByOrderByDate();

    @Query("select distinct currency from Expense where group.id = :groupId and (settled is false or settled is null) group by currency")
    List<String> findCurrenciesForGroup(int groupId);
}
