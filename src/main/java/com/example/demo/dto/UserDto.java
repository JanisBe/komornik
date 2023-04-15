package com.example.demo.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.example.demo.entities.User} entity
 */
public class UserDto implements Serializable {

	private final Integer id;
	private final String name;
	private final String mail;
	private final String password;
	private final String avatar;

	public UserDto(Integer id, String name, String mail, String password, String avatar) {
		this.id = id;
		this.name = name;
		this.mail = mail;
		this.password = password;
		this.avatar = avatar;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		UserDto entity = (UserDto) o;
		return Objects.equals(this.id, entity.id) &&
			Objects.equals(this.name, entity.name) &&
			Objects.equals(this.mail, entity.mail) &&
			Objects.equals(this.password, entity.password) &&
			Objects.equals(this.avatar, entity.avatar);
	}

	public String getAvatar() {
		return avatar;
	}

	public Integer getId() {
		return id;
	}

	public String getMail() {
		return mail;
	}

	public String getName() {
		return name;
	}

	public String getPassword() {
		return password;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name, mail, password, avatar);
	}

	@Override
	public String toString() {
		return getClass().getSimpleName() + "(" +
			"id = " + id + ", " +
			"name = " + name + ", " +
			"mail = " + mail + ", " +
			"password = " + password + ", " +
			"avatar = " + avatar + ")";
	}
}