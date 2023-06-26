package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "expenses", schema = "test")
@NamedNativeQuery(name = "findBalanceForGroup",
        query = "select d.to_user_id as userId, sum(d.amount) as balance from expenses e " +
                "join debts d on e.id = d.expense_id " +
                "where e.group_id = :groupId " +
                "group by d.to_user_id order by balance", resultSetMapping = "debtMapper")
@SqlResultSetMapping(name = "debtMapper",
        classes = {@ConstructorResult(targetClass = UserBalance.class,
                columns = {@ColumnResult(name = "userId"),
                        @ColumnResult(name = "balance")})
        })
public class Expense {
//    select debt.userTo.id as userId, sum(debt.amount) as balance from Expense e inner join e.debt debt " +
//            " where e.group.id = :groupId group by debt.userTo.id

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "currency", nullable = false)
    private String currency;

    @Column(name = "description", nullable = false)
    private String description;

    @OneToMany(mappedBy = "expense", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Debt> debt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "group_id", nullable = false)
    @JsonIgnore
    private Group group;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date", nullable = false, columnDefinition = "TIMESTAMP")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime date;

    @Column(name = "note")
    private String note;
}
