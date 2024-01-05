package pl.janis.komornik.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "users", schema = "komornik")
public class User implements UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private Integer id;

	@Column(name = "name")
	private String name;

	@Column(name = "mail")
	private String mail;

	@Column(name = "password")
	private String password;

	@Column(name = "avatar")
	private String avatar;

	@Column(name = "verificationToken")
	private String verificationToken;

	@Column(name = "isVerified")
	private boolean isVerified;

	@ManyToMany(mappedBy = "users")
	@JsonIgnore
	@ToString.Exclude
	private List<Group> groups;

	@OneToMany(mappedBy = "userFrom", cascade = CascadeType.ALL)
	@JsonIgnore
	@ToString.Exclude
	private List<Debt> debtFrom;

	@OneToMany(mappedBy = "userTo", cascade = CascadeType.ALL)
	@JsonIgnore
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
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}


}
