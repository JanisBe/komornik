package pl.janis.komornik.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClientException;
import pl.janis.komornik.dto.DebtDto;
import pl.janis.komornik.dto.ExpenseDto;
import pl.janis.komornik.entities.Expense;
import pl.janis.komornik.entities.User;
import pl.janis.komornik.entities.UserBalance;
import pl.janis.komornik.exception.ElementDoesNotExistException;
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
    private final UserService userService;
    private final GroupService groupService;
    private final NBPExchangeService nbpExchangeService;

    public ExpenseDto findById(int id) {
        return expenseMapper.toDto(expenseRepository.findById(id).orElseThrow(() -> new ElementDoesNotExistException("No results")));
    }

    public List<ExpenseDto> findAllByUserId(int userId) {
        return expenseRepository.findAllByUserIdOrderByDate(userId).stream().map(expenseMapper::toDto).toList();
    }

    public List<ExpenseDto> findAll() {
        return expenseRepository.findAllByOrderByDate().stream().map(expenseMapper::toDto).toList();
    }

    public List<ExpenseDto> findAllByGroup(int groupId, int userId) {
        groupService.checkIfUserBelongsToGroup(userId, groupId);
        return expenseRepository.findAllByGroup_IdOrderByDateDesc(groupId).stream().map(expenseMapper::toDto).toList();
    }

    public Map<String, List<DebtDto>> calculateSettlesForGroup(int groupId) {
        Map<String, List<DebtDto>> settlements = new HashMap<>();
        List<String> currencies = expenseRepository.findCurrenciesForGroup(groupId);
        currencies.forEach(currency -> {
            List<DebtDto> debtDtos = calculateSettlementForGroupPerCurrency(groupId, currency);
            settlements.put(currency, debtDtos);
        });
        return settlements;
    }

    private List<DebtDto> calculateSettlementForGroupPerCurrency(int groupId, String currency) {
        List<UserBalance> debtBalanceForUserAndGroup = expenseRepository.findBalanceForGroup(groupId, currency);
        List<DebtDto> settlement = new ArrayList<>();
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
                        settlement.add(new DebtDto(null, userService.getUserDtoByUserId(creditor.getUserId()), userService.getUserDtoByUserId(debtor.getUserId()), debtor.getBalance().abs(), debtor.getCurrency()));
                        debt = debt.add(debtor.getBalance());
                        debtor.setBalance(debt);
                        iterCreditors.remove();
                    }
                    case 0 -> {
                        settlement.add(new DebtDto(null, userService.getUserDtoByUserId(creditor.getUserId()), userService.getUserDtoByUserId(debtor.getUserId()), debt.abs(), debtor.getCurrency()));
                        iterCreditors.remove();
                        iterDebtors.remove();
                    }
                    case -1 -> {
                        settlement.add(new DebtDto(null, userService.getUserDtoByUserId(creditor.getUserId()), userService.getUserDtoByUserId(debtor.getUserId()), debtor.getBalance().abs(), debtor.getCurrency()));
                        debt = debt.add(debtor.getBalance());
                        iterDebtors.remove();
                    }
                }
            }
        }

        return settlement;
    }

    private void simplifyDebts(List<DebtDto> settlement, List<UserBalance> debtors, List<UserBalance> creditors) {
        ListIterator<UserBalance> iterDebtors = debtors.listIterator();
        while (iterDebtors.hasNext()) {
            UserBalance debtor = iterDebtors.next();
            ListIterator<UserBalance> iterCreditors = creditors.listIterator();
            while (iterCreditors.hasNext()) {
                UserBalance creditor = iterCreditors.next();
                if (creditor.getBalance().abs().equals(debtor.getBalance().abs())) {
                    settlement.add(new DebtDto(null, userService.getUserDtoByUserId(creditor.getUserId()), userService.getUserDtoByUserId(debtor.getUserId()), debtor.getBalance().abs(), debtor.getCurrency()));
                    iterCreditors.remove();
                    iterDebtors.remove();
                }
            }

        }
    }

    @Transactional
    public void deleteExpense(int id) {
        expenseRepository.deleteById(id);
    }

    @Transactional
    public ExpenseDto saveExpense(ExpenseDto expenseDto, User currentUser) {
        groupService.checkIfUserBelongsToGroup(currentUser.getId(), expenseDto.groupId());
        final Expense expense = expenseMapper.toEntity(expenseDto);
        ExpenseDto dto;
        if (expense.getId() != null) {
            dto = expenseRepository.findById(expense.getId()).map(storedExpense -> {
                storedExpense = expenseMapper.toEntity(expense);
                return expenseMapper.toDto(expenseRepository.save(storedExpense));

            }).get();
        } else {
            dto = expenseMapper.toDto(expenseRepository.save(expense));
        }
        return dto;
    }

    public List<DebtDto> recalculateForeignCurrency(List<DebtDto> debts) throws RestClientException {
        return nbpExchangeService.getExchangeRate(debts);
    }
}
