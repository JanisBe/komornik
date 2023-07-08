package pl.janis.komornik.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.janis.komornik.dto.ExpenseDto;
import pl.janis.komornik.entities.Expense;
import pl.janis.komornik.entities.UserBalance;
import pl.janis.komornik.mapper.ExpenseMapper;
import pl.janis.komornik.repository.ExpenseRepository;

import java.math.BigDecimal;
import java.util.*;

import static java.math.BigDecimal.ZERO;

@Service
@Log4j2
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final GroupService groupService;
    private final ExpenseMapper expenseMapper;

    static <K, V extends Comparable<? super V>> SortedSet<Map.Entry<K, V>> sortByValues(Map<K, V> map) {
        SortedSet<Map.Entry<K, V>> sortedEntries = new TreeSet<>(
                (e1, e2) -> {
                    int res = e1.getValue().compareTo(e2.getValue());
                    return res != 0 ? res : 1;
                }
        );
        sortedEntries.addAll(map.entrySet());
        return sortedEntries;
    }

    public ExpenseDto findById(int id) {
        return expenseMapper.toDto(expenseRepository.findById(id).orElseThrow());
    }

    public List<ExpenseDto> findAllByUserId(int userId) {
        return expenseRepository.findAllByUserIdOrderByDate(userId).stream().map(expenseMapper::toDto).toList();
    }

    public List<ExpenseDto> findAll() {
        return expenseRepository.findAllByOrderByDate().stream().map(expenseMapper::toDto).toList();
    }

    public List<ExpenseDto> findAllByGroup(int groupId) {
        return expenseRepository.findAllByGroup_IdOrderByDate(groupId).stream().map(expenseMapper::toDto).toList();
    }

    public Map<ImmutablePair<Integer, Integer>, BigDecimal> calculateSettlesForGroup(int groupId) {
//        SortedMap<Integer, BigDecimal> userToBalanceMap = new TreeMap<>();
        List<BigDecimal> balances = new ArrayList<>();
        List<Integer> userIds = new ArrayList<>();

        List<UserBalance> debtBalanceForUserAndGroup = expenseRepository.findBalanceForGroup(groupId);
        debtBalanceForUserAndGroup.forEach(entry -> {
            balances.add(entry.balance());
            userIds.add(entry.userId());
        });
        HashSet<String> processedUsers = new HashSet<>();
        Map<ImmutablePair<Integer, Integer>, BigDecimal> settlement = new HashMap<>();
//        for (Map.Entry<Integer, BigDecimal> whoAndBalance : sortByValues(userToBalanceMap)) {
//            for (Map.Entry<Integer, BigDecimal> e : userToBalanceMap.entrySet()) {
//                Integer userId = e.getKey();
//                if (userId.equals(whoAndBalance.getKey())
//                        || (whoAndBalance.getValue().compareTo(ZERO) < 0 && e.getValue().compareTo(ZERO) < 0)) {
////                        || !processedUsers.add(userId + "_" + whoAndBalance.getKey())
////                        || !processedUsers.add(whoAndBalance.getKey() + "_" + userId)) {
//                    continue;
//                }
//                BigDecimal amountToSettle = e.getValue();
//                System.out.println("uid " + userId + " entryKey " + whoAndBalance.getKey() + " amountToSettle " + amountToSettle + " entryVal " + whoAndBalance.getValue());
//                settlement.put(ImmutablePair.of(userId, whoAndBalance.getKey()), whoAndBalance.getValue().abs());
//            }
//        }
        List<BigDecimal> debtors = balances.stream().filter(balance -> balance.compareTo(ZERO) > 0).sorted().toList();
        List<BigDecimal> creditors = balances.stream().filter(balance -> balance.compareTo(ZERO) < 0).sorted().toList();
        while (!debtors.isEmpty()) {
            for (int i = 0; i < debtors.size(); i++) {
                BigDecimal debt = debtors.get(i);
                while (debt.compareTo(ZERO) > 0) {
                    for (int j = 0; j < creditors.size(); j++) {
                        settlement.put(ImmutablePair.of(userIds.get(j), userIds.get(i)), debt.abs());
                        debt = debt.add(creditors.get(j));
                    }
                }
            }
            debtors.clear();
        }
        System.out.println(settlement);
        return settlement;
    }

    @Transactional
    public void deleteExpense(int id) {
        expenseRepository.deleteById(id);
    }

    @Transactional
    public ExpenseDto saveExpense(ExpenseDto expenseDto) {
        final Expense expense = expenseMapper.toEntity(expenseDto);
        return expenseMapper.toDto(expenseRepository.save(expense));
    }
}