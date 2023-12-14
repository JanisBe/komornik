package pl.janis.komornik.dto;

import pl.janis.komornik.entities.Category;

import java.io.Serializable;

/**
 * A DTO for the {@link Category} entity
 */
public record CategoryDto(Integer id, String name, String categoryIconName) implements Serializable {

}
