package pl.janis.komornik.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.janis.komornik.dto.CategoryDto;
import pl.janis.komornik.entities.Category;
import pl.janis.komornik.mapper.CategoryMapper;
import pl.janis.komornik.service.CategoryService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4401")
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryRestController {
    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;

    @GetMapping("/findAll")
    public List<CategoryDto> findAll() {
        return categoryService.findAllCategories().stream().map(categoryMapper::toDto).toList();
    }

    @GetMapping("/findByName/{name}")
    public List<CategoryDto> findByName(@PathVariable String name) {
        return categoryService.findByName(name).stream().map(categoryMapper::toDto).toList();
    }

    @GetMapping("/findById/{id}")
    public CategoryDto findById(@PathVariable int id) {
        return categoryMapper.toDto(categoryService.findById(id));
    }

    @PostMapping("/save")
    public CategoryDto save(@RequestBody Category category) {
        return categoryMapper.toDto(categoryService.createCategory(category));
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCategory(@PathVariable int id) {
        categoryService.deleteCategory(id);
    }
}

