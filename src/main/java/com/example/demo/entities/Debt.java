package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;

@Getter
@ToString
@RequiredArgsConstructor
@Entity
@EqualsAndHashCode
@Table(name = "debts", schema = "test")
public class Debt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "expense_id")
    @JsonIgnore
    private Expense expense;

    @Column(name = "amount", nullable = false)
    private BigDecimal amount;

    @OneToOne(fetch = FetchType.EAGER, optional = false, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "from_user_id", nullable = false, referencedColumnName = "id")
    private User fromUserId;

    @OneToOne(fetch = FetchType.EAGER, optional = false, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "to_user_id", nullable = false, referencedColumnName = "id")
    private User toUserId;

    public void setId(Integer id) {
        this.id = id;
    }

    @JsonIgnore
    public void setExpense(Expense expense) {
        this.expense = expense;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public void setFromUserId(User fromUserId) {
        this.fromUserId = fromUserId;
    }

    public void setToUserId(User toUserId) {
        this.toUserId = toUserId;
    }
}
