package pl.janis.komornik.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.proxy.HibernateProxy;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "expenses", schema = "komornik")
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
    @ToString.Exclude
    private List<Debt> debt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "group_id", nullable = false)
    @JsonIgnore
    @ToString.Exclude
    private Group group;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date", nullable = false, columnDefinition = "TIMESTAMP")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime date;

    @Column(name = "note")
    private String note;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Expense expense = (Expense) o;
        return getId() != null && Objects.equals(getId(), expense.getId());
    }

    @Override
    public final int hashCode() {
        return getClass().hashCode();
    }
}