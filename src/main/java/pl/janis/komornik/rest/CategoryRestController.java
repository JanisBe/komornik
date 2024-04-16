package pl.janis.komornik.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.janis.komornik.dto.CategoryDto;
import pl.janis.komornik.mapper.CategoryMapper;
import pl.janis.komornik.service.CategoryService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4401")
@RequestMapping("/api/category")
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
    public CategoryDto save(@RequestBody CategoryDto category) {
        return categoryMapper.toDto(categoryService.createCategory(categoryMapper.toEntity(category)));
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCategory(@PathVariable int id) {
        categoryService.deleteCategory(id);
    }

    @PatchMapping("/edit/{id}")
    public CategoryDto edit(@RequestBody CategoryDto category) {
        return categoryMapper.toDto(categoryService.createCategory(categoryMapper.toEntity(category)));
    }
}

