package com.example.demo.service;

import com.example.demo.entities.Category;
import com.example.demo.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Transactional
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public List<Category> findAllCategories() {
        return categoryRepository.findAll();
    }

    public List<Category> findByName(String name) {
        return categoryRepository.findAllByName(name);
    }

    @Transactional
    public void deleteCategory(int id) {
        categoryRepository.deleteById(id);
    }
}
