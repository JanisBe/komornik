package com.example.demo.dto;

import java.io.Serializable;
import java.time.Instant;

/**
 * A DTO for the {@link com.example.demo.entities.Expense} entity
 */
public record ExpenseDto(Integer id,
						 int categoryId,
						 String currency,
						 Float amount,
						 String description,
						 int split,
						 int userId,
						 int groupId,
						 Instant date,
						 String note,
						 int fromUserId) implements Serializable {

}
