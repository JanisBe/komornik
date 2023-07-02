package pl.janis.komornik.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@EqualsAndHashCode
@Table(name = "groups", schema = "test")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "default_Currency")
    private String defaultCurrency;

    @OneToMany(mappedBy = "group")
    private List<Expense> expenses;

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(name = "user_x_group",
            inverseJoinColumns = {@JoinColumn(name = "user_id")},
            joinColumns = {@JoinColumn(name = "group_id")})
    private List<User> users = new ArrayList<>();

}
