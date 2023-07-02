package pl.janis.komornik.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
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

    @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "expense_id")
    @JsonIgnore
    private Expense expense;

    @Column(name = "amount", nullable = false)
    private BigDecimal amount;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "from_user_id", referencedColumnName = "id")
    private User userFrom;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "to_user_id", referencedColumnName = "id")
    private User userTo;
}
