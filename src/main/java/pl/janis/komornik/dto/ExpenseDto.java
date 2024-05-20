package pl.janis.komornik.dto;

import pl.janis.komornik.entities.Expense;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * A DTO for the {@link Expense} entity
 */
public record ExpenseDto(Integer id,
                         int categoryId,
                         String currency,
                         String description,
                         BigDecimal amount,
                         int groupId,
                         LocalDateTime date,
                         List<DebtDto> debt,
                         String note) implements Serializable {

}
