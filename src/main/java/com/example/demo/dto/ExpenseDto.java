package com.example.demo.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.example.demo.entities.Expense} entity
 */
public record ExpenseDto(Integer id,
						 CategoryDto category,
						 String currency,
						 Float amount,
						 String description) implements Serializable {

}
