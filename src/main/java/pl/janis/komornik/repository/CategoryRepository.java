package pl.janis.komornik.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.janis.komornik.entities.Category;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

	List<Category> findAllByName(String name);
}