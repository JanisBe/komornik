package pl.janis.komornik.dto;

import pl.janis.komornik.entities.Group;

import java.io.Serializable;
import java.util.List;

/**
 * A DTO for the {@link Group} entity
 */
public record GroupDto(Integer id,
                       String name,
                       String description,
                       String defaultCurrency,
                       List<UserDto> users) implements Serializable {
}
