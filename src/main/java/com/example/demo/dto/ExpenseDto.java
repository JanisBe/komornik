package com.example.demo.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * A DTO for the {@link com.example.demo.entities.Expense} entity
 */
public record ExpenseDto(Integer id,
						 int categoryId,
						 String currency,
						 String description,
						 int groupId,
						 LocalDateTime date,
						 List<DebtDto> debt,
						 String note) implements Serializable {

}
