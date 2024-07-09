package pl.janis.komornik.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString(callSuper = true)
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "groups", schema = "komornik")
@EntityListeners(AuditingEntityListener.class)
public class Group extends BaseEntity {

    @Column(name = "group_name", nullable = false)
    private String groupName;

    @Column(name = "description")
    private String description;

    @Column(name = "default_Currency")
    private String defaultCurrency;

    @Column(name = "group_icon_name")
    private String groupIconName;

    @Column(name = "is_public")
    private boolean isPublic;

    @OneToMany(mappedBy = "group")
    @JsonManagedReference
    @ToString.Exclude
    private List<Expense> expenses;

    @ManyToMany(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinTable(name = "user_x_group",
            inverseJoinColumns = {@JoinColumn(name = "user_id")},
            joinColumns = {@JoinColumn(name = "group_id")})
    @ToString.Exclude
    private List<User> users = new ArrayList<>();

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Group group = (Group) o;
        return getId() != null && Objects.equals(getId(), group.getId());
    }

    @Override
    public final int hashCode() {
        return getClass().hashCode();
    }
}
