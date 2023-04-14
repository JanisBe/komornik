package com.example.demo.rest;

import com.example.demo.entities.Category;
import com.example.demo.service.CategoryService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/category")
public class CategoryRestController {
    private CategoryService categoryService;

    public CategoryRestController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/findAll")
    public List<Category> findAll(){
        return categoryService.findAllCategories();
    }

    @PostMapping("/save")
    public Category save(Category category){
        return categoryService.createCategory(category);
    }
}
