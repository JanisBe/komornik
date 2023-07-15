package pl.janis.komornik.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.janis.komornik.dto.ExpenseDto;
import pl.janis.komornik.dto.UserDto;
import pl.janis.komornik.entities.Expense;
import pl.janis.komornik.entities.UserBalance;
import pl.janis.komornik.mapper.ExpenseMapper;
import pl.janis.komornik.repository.ExpenseRepository;

import java.math.BigDecimal;
import java.util.*;

import static java.math.BigDecimal.ZERO;
import static java.util.Comparator.reverseOrder;

@Service
@Log4j2
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final ExpenseMapper expenseMapper;

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

    private static void simplifyDebts(Map<Pair<Integer, Integer>, BigDecimal> settlement, List<UserBalance> debtors, List<UserBalance> creditors) {
        ListIterator<UserBalance> iterDebtors = debtors.listIterator();
        while (iterDebtors.hasNext()) {
            UserBalance debtor = iterDebtors.next();
            ListIterator<UserBalance> iterCreditors = creditors.listIterator();
            while (iterCreditors.hasNext()) {
                UserBalance creditor = iterCreditors.next();
                if (creditor.getBalance().abs().equals(debtor.getBalance().abs())) {
                    settlement.put(Pair.of(creditor.getUserId(), debtor.getUserId()), debtor.getBalance().abs());
                    iterCreditors.remove();
                    iterDebtors.remove();
                }
            }

        }
    }

    public Map<Pair<UserDto, UserDto>, BigDecimal> calculateSettlesForGroup(int groupId) {
        List<UserBalance> debtBalanceForUserAndGroup = expenseRepository.findBalanceForGroup(groupId);
        Map<Pair<Integer, Integer>, BigDecimal> settlement = new HashMap<>();
        List<UserBalance> debtors = new ArrayList<>(debtBalanceForUserAndGroup.stream().filter(user -> user.getBalance().compareTo(ZERO) > 0).sorted().toList());
        List<UserBalance> creditors = new ArrayList<>(debtBalanceForUserAndGroup.stream().filter(user -> user.getBalance().compareTo(ZERO) < 0).sorted(reverseOrder()).toList());
        simplifyDebts(settlement, debtors, creditors);
        ListIterator<UserBalance> iterCreditors = creditors.listIterator();
        while (iterCreditors.hasNext()) {
            UserBalance creditor = iterCreditors.next();
            BigDecimal debt = creditor.getBalance();
            ListIterator<UserBalance> iterDebtors = debtors.listIterator();
            while (iterDebtors.hasNext()) {
                UserBalance debtor = iterDebtors.next();
                switch (debtor.getBalance().compareTo(debt.abs())) {
                    case 1 -> {
                        settlement.put(Pair.of(creditor.getUserId(), debtor.getUserId()), debt);
                        debt = debt.add(debtor.getBalance());
                        debtor.setBalance(debt);
                        iterCreditors.remove();
                    }
                    case 0 -> {
                        settlement.put(Pair.of(creditor.getUserId(), debtor.getUserId()), debt);
                        iterCreditors.remove();
                        iterDebtors.remove();
                    }
                    case -1 -> {
                        settlement.put(Pair.of(creditor.getUserId(), debtor.getUserId()), debtor.getBalance().abs());
                        debt = debt.add(debtor.getBalance());
                        iterDebtors.remove();
                    }
                }
            }
        }

        return expenseMapper.mapToDto(settlement);
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
