package pl.janis.komornik.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.janis.komornik.entities.Category;
import pl.janis.komornik.exception.ElementDoesNotExistException;
import pl.janis.komornik.repository.CategoryRepository;

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

    public Category findById(int id) {
        return categoryRepository.findById(id).orElseThrow(() -> new ElementDoesNotExistException("No results"));
    }
}
