package com.example.demo.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.ToString.Exclude;
import org.hibernate.Hibernate;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "expenses", schema = "test")
public class Expense {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.REMOVE)
	@JoinColumn(name = "category_id", nullable = false)
	@Exclude
	private Category category;

	@Column(name = "currency", nullable = false)
	private String currency;

	@Column(name = "amount", nullable = false)
	private BigDecimal amount;

	@Column(name = "description", nullable = false)
	private String description;

	@ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.REMOVE)
	@JoinColumn(name = "user_id", nullable = false)
	@Exclude
	private User user;

	@ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.REMOVE)
	@JoinColumn(name = "group_id", nullable = false)
	@Exclude
	private Group group;

	@Column(name = "date", nullable = false)
	private Instant date;

	@Column(name = "note")
	private String note;

	@Override
	public int hashCode() {
		return getClass().hashCode();
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || Hibernate.getClass(this) != Hibernate.getClass(
			o)) {
			return false;
		}
		Expense expense = (Expense) o;
		return getId() != null && Objects.equals(getId(), expense.getId());
	}
}