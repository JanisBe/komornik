package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.ToString.Exclude;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@EqualsAndHashCode
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

	@Column(name = "date", nullable = false)
	private Instant date;

	@Column(name = "note")
	private String note;

}
