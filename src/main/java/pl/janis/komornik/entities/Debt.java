package pl.janis.komornik.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.math.BigDecimal;
import java.util.Objects;

@Getter
@Setter
@ToString(callSuper = true)
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "debts", schema = "komornik")
public class Debt extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.MERGE)
    @JoinColumn(name = "expense_id")
    @JsonBackReference
    @ToString.Exclude
    private Expense expense;

    @Column(name = "amount", nullable = false)
    private BigDecimal amount;

    @Column(name = "currency", nullable = false)
    private String currency;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "from_user_id")
    private User userFrom;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "to_user_id")
    private User userTo;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Debt debt = (Debt) o;
        return getId() != null && Objects.equals(getId(), debt.getId());
    }

    @Override
    public final int hashCode() {
        return getClass().hashCode();
    }
}
