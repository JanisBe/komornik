package com.example.demo.dto;

import java.io.Serializable;
import java.util.List;

/**
 * A DTO for the {@link com.example.demo.entities.Group} entity
 */
public record GroupDto(Integer id,
                       String name,
                       String description,
                       String defaultCurrency,
                       List<UserDto> users) implements Serializable {
}
