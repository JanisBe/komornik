package com.example.demo.repository;

import com.example.demo.entities.Category;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

	List<Category> findAllByName(String name);
}