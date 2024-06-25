package pl.janis.komornik.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Set;

@Getter
@Setter
@ToString(callSuper = true)
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "categories", schema = "komornik")
public class Category extends BaseEntity {

    @Column(name = "category_name", nullable = false)
    private String categoryName;

    @Column(name = "category_icon_name")
    private String categoryIconName;

    @OneToMany(mappedBy = "category")
    @JsonManagedReference
    @ToString.Exclude
    private Set<Expense> expenses = new LinkedHashSet<>();

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Category category = (Category) o;
        return getId() != null && Objects.equals(getId(), category.getId());
    }

    @Override
    public final int hashCode() {
        return getClass().hashCode();
    }
}
