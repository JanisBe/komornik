package com.example.demo.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.LinkedHashSet;
import java.util.Set;
import lombok.Data;

@Data
@Entity
@Table(name = "groups", schema = "test")
public class Group {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private Integer id;

	@Column(name = "group_name", nullable = false)
	private String groupName;

	@Column(name = "group_desc")
	private String groupDesc;

	@OneToMany(mappedBy = "group", cascade = CascadeType.REMOVE)
	private Set<Expense> expenses = new LinkedHashSet<>();

}