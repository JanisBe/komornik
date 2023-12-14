package pl.janis.komornik.dto;

import pl.janis.komornik.entities.Group;

import java.io.Serializable;
import java.util.List;

/**
 * A DTO for the {@link Group} entity
 */
public record GroupDto(Integer id,
                       String groupName,
                       String description,
                       String defaultCurrency,
                       String groupIconName,
                       List<UserDto> users) implements Serializable {
}
