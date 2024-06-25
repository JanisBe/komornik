package pl.janis.komornik.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
@ToString(callSuper = true)
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users", schema = "komornik")
@EntityListeners(AuditingEntityListener.class)
public class User extends BaseEntity implements UserDetails {

    @Column(name = "username", nullable = false)
    private String name;

    @Column(name = "mail", nullable = false)
    private String mail;

    @Column(name = "password")
    private String password;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "verification_token")
    private String verificationToken;

    @Column(name = "is_verified")
    private Boolean isVerified;

    @ManyToMany(mappedBy = "users")
    @JsonManagedReference
    @ToString.Exclude
    private List<Group> groups;

    @OneToMany(mappedBy = "userFrom", cascade = CascadeType.ALL)
    @JsonManagedReference
    @ToString.Exclude
    private List<Debt> debtFrom;

    @OneToMany(mappedBy = "userTo", cascade = CascadeType.ALL)
    @JsonManagedReference
    @ToString.Exclude
    private List<Debt> debtTo;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return getName();
    }

    @Override
    public boolean isEnabled() {
        return this.isVerified;
    }
}
