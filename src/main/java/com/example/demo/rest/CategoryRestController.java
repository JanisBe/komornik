package com.example.demo.rest;

import com.example.demo.entities.Category;
import com.example.demo.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4401")
@RequestMapping("/category")
public class CategoryRestController {

    private final CategoryService categoryService;

    public CategoryRestController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/findAll")
    public List<Category> findAll() {
        return categoryService.findAllCategories();
    }

    @GetMapping("/findByName/{name}")
    public List<Category> findByName(@PathVariable String name) {
        return categoryService.findByName(name);
    }

    @GetMapping("/findById/{id}")
    public Category findById(@PathVariable int id) {
        return categoryService.findById(id);
    }

    @PostMapping("/save")
    public Category save(@RequestBody Category category) {
        return categoryService.createCategory(category);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCategory(@PathVariable int id) {
        categoryService.deleteCategory(id);
    }
}

