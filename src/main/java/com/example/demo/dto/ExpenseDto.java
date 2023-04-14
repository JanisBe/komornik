package com.example.demo.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.example.demo.entities.Expense} entity
 */
public class ExpenseDto implements Serializable {

	private final Integer id;
	private final CategoryDto category;
	private final String currency;
	private final Float amount;
	private final String description;

	public ExpenseDto(Integer id, CategoryDto category, String currency, Float amount,
		String description) {
		this.id = id;
		this.category = category;
		this.currency = currency;
		this.amount = amount;
		this.description = description;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		ExpenseDto entity = (ExpenseDto) o;
		return Objects.equals(this.id, entity.id) &&
			Objects.equals(this.category, entity.category) &&
			Objects.equals(this.currency, entity.currency) &&
			Objects.equals(this.amount, entity.amount) &&
			Objects.equals(this.description, entity.description);
	}

	public Float getAmount() {
		return amount;
	}

	public CategoryDto getCategory() {
		return category;
	}

	public String getCurrency() {
		return currency;
	}

	public String getDescription() {
		return description;
	}

	public Integer getId() {
		return id;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, category, currency, amount, description);
	}

	@Override
	public String toString() {
		return getClass().getSimpleName() + "(" +
			"id = " + id + ", " +
			"category = " + category + ", " +
			"currency = " + currency + ", " +
			"amount = " + amount + ", " +
			"description = " + description + ")";
	}
}